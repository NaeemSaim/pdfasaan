'use client';
import { useState, useEffect } from 'react';
import { reorderPdfPages } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, GripVertical, Trash2, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function OrganizerTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<{ id: number, url: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (file) generateThumbnails();
  }, [file]);

  const generateThumbnails = async () => {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'; // Uses your local worker
    const arrayBuffer = await file!.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    const thumbs = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 0.3 }); 
      const canvas = document.createElement('canvas');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
      thumbs.push({ id: i - 1, url: canvas.toDataURL() });
    }
    setPages(thumbs);
  };

  const movePage = (index: number, direction: 'up' | 'down') => {
    const newPages = [...pages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newPages.length) return;
    [newPages[index], newPages[targetIndex]] = [newPages[targetIndex], newPages[index]];
    setPages(newPages);
  };

  const removePage = (index: number) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      const originalBytes = new Uint8Array(await file!.arrayBuffer());
      const newIndices = pages.map(p => p.id);
      const result = await reorderPdfPages(originalBytes, newIndices);
      
      const blob = new Blob([result], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `organized-${file?.name}`;
      link.click();
    } catch (e) {
      alert("Error saving document.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18}/> Back to Dashboard
      </button>

      {!file ? (
        <DropZone onUpload={(files) => setFile(files[0])} />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
            <div>
              <h2 className="text-xl font-bold text-white italic">Organize Pages</h2>
              <p className="text-sm text-zinc-500 font-mono uppercase tracking-tighter">{pages.length} pages in new document</p>
            </div>
            <button 
              onClick={handleSave} 
              disabled={isProcessing || pages.length === 0} 
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
            >
              {isProcessing ? 'Processing...' : 'Export PDF'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {pages.map((page, index) => (
              <div key={`${page.id}-${index}`} className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-2 transition-all hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">
                <img src={page.url} className="w-full h-auto rounded-lg mb-2 shadow-inner bg-white" alt={`Page ${index + 1}`} />
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-black text-zinc-600">PAGE {index + 1}</span>
                  <div className="flex gap-1">
                    <button onClick={() => movePage(index, 'up')} className="p-1 hover:bg-zinc-800 rounded text-zinc-400"><ChevronLeft size={14}/></button>
                    <button onClick={() => movePage(index, 'down')} className="p-1 hover:bg-zinc-800 rounded text-zinc-400"><ChevronRight size={14}/></button>
                    <button onClick={() => removePage(index)} className="p-1 hover:bg-zinc-800 rounded text-red-500/50 hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
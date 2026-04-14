'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, GripVertical, Trash2, Download, RotateCw } from 'lucide-react';
import DropZone from './DropZone';
import { reorderPdfPages } from '@/lib/pdf-engine';

export default function OrganizerTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<{ id: number; url: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const dragItemRef = useRef<number | null>(null);
  const dragOverItemRef = useRef<number | null>(null);

  useEffect(() => {
    if (file) generateThumbnails();
  }, [file]);

  const generateThumbnails = async () => {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

    const arrayBuffer = await file!.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

    const thumbs: { id: number; url: string }[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 0.35 });

      const canvas = document.createElement('canvas');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: canvas.getContext('2d')!,
        viewport
      }).promise;

      thumbs.push({ id: i - 1, url: canvas.toDataURL('image/jpeg', 0.85) });
    }

    setPages(thumbs);
  };

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragItemRef.current = index;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverItemRef.current = index;
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = dragItemRef.current;
    if (dragIndex === null || dragIndex === dropIndex) return;

    const newPages = [...pages];
    const [movedPage] = newPages.splice(dragIndex, 1);
    newPages.splice(dropIndex, 0, movedPage);

    setPages(newPages);
    setDraggedIndex(null);
    dragItemRef.current = null;
    dragOverItemRef.current = null;
  };

  const movePage = (index: number, direction: 'up' | 'down') => {
    const newPages = [...pages];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newPages.length) return;

    [newPages[index], newPages[target]] = [newPages[target], newPages[index]];
    setPages(newPages);
  };

  const removePage = (index: number) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!file || pages.length === 0) return;

    setIsProcessing(true);
    try {
      const originalBytes = new Uint8Array(await file.arrayBuffer());
      const newOrder = pages.map(p => p.id);

      const result = await reorderPdfPages(originalBytes, newOrder);

      const blob = new Blob([result], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `organized-${file.name}`;
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (e) {
      console.error(e);
      alert("Failed to reorganize document.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-zinc-500 hover:text-[#22d3ee] mb-12 transition-all font-mono uppercase tracking-[3px] text-xs"
        >
          <div className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-[#22d3ee]">
            <ArrowLeft size={18} />
          </div>
          BACK TO DASHBOARD
        </button>

        <div className="flex items-center gap-5 mb-12">
          <div className="p-5 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-3xl">
            <GripVertical className="text-[#22d3ee]" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">ORGANIZE PAGES</h1>
            <p className="text-[#22d3ee] text-xl mt-1">Drag. Drop. Dominate the order.</p>
          </div>
        </div>

        {!file ? (
          <DropZone 
            onUpload={(files) => setFile(files[0])} 
            multiple={false}
            label="Drop a PDF to reorganize its pages"
          />
        ) : (
          <div className="space-y-10">
            {/* Header Bar */}
            <div className="glass-panel flex items-center justify-between p-8 rounded-3xl">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">{file.name}</h2>
                <p className="text-zinc-400 font-mono text-sm mt-1">
                  {pages.length} PAGES • DRAG TO REORDER
                </p>
              </div>

              <button
                onClick={handleSave}
                disabled={isProcessing || pages.length === 0}
                className="bg-gradient-to-r from-[#22d3ee] to-cyan-400 hover:from-cyan-300 hover:to-[#22d3ee] disabled:from-zinc-700 disabled:to-zinc-600 text-black font-black px-12 py-5 rounded-2xl text-lg uppercase tracking-[2px] shadow-2xl shadow-[#22d3ee]/40 transition-all flex items-center gap-3"
              >
                {isProcessing ? (
                  <>REORDERING<span className="animate-pulse">...</span></>
                ) : (
                  <>EXPORT REORDERED PDF <Download size={24} /></>
                )}
              </button>
            </div>

            {/* Pages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {pages.map((page, index) => (
                <div
                  key={`${page.id}-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`group relative bg-black border-2 rounded-3xl overflow-hidden transition-all duration-300 cursor-grab active:cursor-grabbing
                    ${draggedIndex === index ? 'opacity-50 scale-95 border-[#22d3ee]' : 'border-zinc-800 hover:border-[#22d3ee]/60'}
                    ${dragOverItemRef.current === index && draggedIndex !== index ? 'border-[#22d3ee] scale-[1.03]' : ''}`}
                >
                  <div className="relative">
                    <img 
                      src={page.url} 
                      alt={`Page ${index + 1}`} 
                      className="w-full h-auto object-contain bg-zinc-950"
                    />

                    {/* Page Number Overlay */}
                    <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-mono px-3 py-1 rounded-xl">
                      PAGE {index + 1}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => movePage(index, 'up')}
                        className="bg-black/80 hover:bg-zinc-900 p-2 rounded-xl text-white"
                      >
                        <RotateCw size={16} className="rotate-[-90deg]" />
                      </button>
                      <button
                        onClick={() => movePage(index, 'down')}
                        className="bg-black/80 hover:bg-zinc-900 p-2 rounded-xl text-white"
                      >
                        <RotateCw size={16} className="rotate-90" />
                      </button>
                      <button
                        onClick={() => removePage(index)}
                        className="bg-black/80 hover:bg-red-600 p-2 rounded-xl text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Grip Handle */}
                    <div className="absolute bottom-4 right-4 bg-black/70 hover:bg-black p-2 rounded-2xl cursor-grab active:cursor-grabbing">
                      <GripVertical size={22} className="text-[#22d3ee]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pages.length === 0 && (
              <div className="text-center py-20 text-zinc-500">
                All pages removed. Drop another PDF to continue.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
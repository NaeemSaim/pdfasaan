'use client';
import { useState } from 'react';
import { splitPDF } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, Scissors } from 'lucide-react';

export default function SplitTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageSelection, setPageSelection] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSplit = async () => {
    if (!file || !pageSelection) return;
    setIsProcessing(true);
    try {
      // Convert "1, 2, 5" into [0, 1, 4]
      const pages = pageSelection.split(',')
        .map(p => parseInt(p.trim()) - 1)
        .filter(p => !isNaN(p) && p >= 0);

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const splitBytes = await splitPDF(bytes, pages);
      
      const blob = new Blob([splitBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `split-${file.name}`;
      a.click();
    } catch (e) {
      alert("Split failed. Check your page numbers.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-500/10 rounded-2xl text-green-500">
          <Scissors size={24} />
        </div>
        <h2 className="text-3xl font-bold">Split PDF</h2>
      </div>

      {!file ? (
        <DropZone onUpload={(files) => setFile(files[0])} />
      ) : (
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <p className="mb-6 text-zinc-400">Extracting from: <span className="text-white font-medium">{file.name}</span></p>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-zinc-500 mb-2">
              Enter page numbers (e.g., 1, 2, 5)
            </label>
            <input 
              type="text"
              value={pageSelection}
              onChange={(e) => setPageSelection(e.target.value)}
              placeholder="1, 3, 5..."
              className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-white focus:border-green-500 outline-none transition-all"
            />
          </div>

          <button 
            onClick={handleSplit}
            disabled={isProcessing || !pageSelection}
            className="w-full bg-green-500 text-black font-bold py-4 rounded-xl hover:bg-green-400 transition-colors disabled:opacity-50"
          >
            {isProcessing ? 'Extracting...' : 'Download Split PDF'}
          </button>
        </div>
      )}
    </div>
  );
}
'use client';
import { useState } from 'react';
import { addPageNumbers } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, Hash, Download, CheckCircle } from 'lucide-react';

export default function PageNumberTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleAddNumbers = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const numberedBytes = await addPageNumbers(bytes);
      
      const blob = new Blob([numberedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `numbered-${file.name}`;
      a.click();
      setIsDone(true);
    } catch (e) {
      alert("Failed to add page numbers.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-violet-500/10 rounded-2xl text-violet-500">
          <Hash size={24} />
        </div>
        <h2 className="text-3xl font-bold italic text-white">Page Numbering</h2>
      </div>

      {!file ? (
        <DropZone onUpload={(files) => setFile(files[0])} />
      ) : (
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full border border-zinc-800 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            {file.name}
          </div>

          <p className="text-zinc-500 text-sm">
            This will add <b>"Page X of Y"</b> centered at the bottom of every page.
          </p>

          <button 
            onClick={handleAddNumbers}
            disabled={isProcessing}
            className="w-full bg-violet-600 text-white font-black py-5 rounded-2xl hover:bg-violet-500 transition-all uppercase tracking-widest shadow-lg shadow-violet-500/20"
          >
            {isProcessing ? 'Processing...' : 'Apply Page Numbers'}
          </button>

          {isDone && (
            <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle size={18} /> Numbers applied and downloaded!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
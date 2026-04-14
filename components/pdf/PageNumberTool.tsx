'use client';

import { useState } from 'react';
import { ArrowLeft, Hash, Download, CheckCircle, Settings } from 'lucide-react';
import DropZone from './DropZone';
import { addPageNumbers } from '@/lib/pdf-engine';

export default function PageNumberTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleAddNumbers = async () => {
    if (!file) return;

    setIsProcessing(true);
    setIsDone(false);

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

      // Auto-reset success message after 4 seconds
      setTimeout(() => setIsDone(false), 4000);
    } catch (error) {
      console.error(error);
      alert("Failed to add page numbers. The PDF might be protected or corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-12 px-6">
      <div className="max-w-3xl mx-auto">
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
          <div className="p-5 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-3xl">
            <Hash className="text-violet-400" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">PAGE NUMBERS</h1>
            <p className="text-violet-400 text-xl mt-1">Stamp professional numbering on every page</p>
          </div>
        </div>

        {!file ? (
          <DropZone 
            onUpload={(files) => setFile(files[0])} 
            multiple={false}
            label="Drop a PDF to add page numbers"
          />
        ) : (
          <div className="glass-panel p-12 rounded-3xl space-y-10">
            {/* File Info */}
            <div className="flex items-center justify-center gap-4 bg-black/60 border border-zinc-800 rounded-2xl py-5 px-8">
              <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center">
                <Hash className="text-violet-400" size={28} />
              </div>
              <div className="text-left">
                <div className="text-white font-medium truncate max-w-xs">{file.name}</div>
                <div className="text-xs text-zinc-500 font-mono">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for numbering
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-black rounded-full border border-violet-900/50 text-sm text-violet-300">
                <Settings size={16} />
                DEFAULT STYLE: "Page X of Y" — Centered Footer
              </div>
              <p className="text-zinc-400 max-w-md mx-auto">
                This will automatically add clean, professional page numbering 
                at the bottom center of every page in your document.
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={handleAddNumbers}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-violet-500 disabled:from-zinc-700 disabled:to-zinc-600 text-white font-black py-7 rounded-2xl text-xl uppercase tracking-[2px] shadow-2xl shadow-violet-500/40 transition-all flex items-center justify-center gap-4"
            >
              {isProcessing ? (
                <>STAMPING NUMBERS<span className="animate-pulse">...</span></>
              ) : (
                <>
                  <Download size={26} /> APPLY PAGE NUMBERS
                </>
              )}
            </button>

            {/* Success Message */}
            {isDone && (
              <div className="flex items-center justify-center gap-3 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-medium">
                <CheckCircle size={24} className="animate-bounce" />
                Page numbers applied successfully • File downloaded
              </div>
            )}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs font-mono text-zinc-600 tracking-widest">
          CLIENT-SIDE ONLY • YOUR DOCUMENT NEVER LEAVES THIS BROWSER
        </div>
      </div>
    </div>
  );
}
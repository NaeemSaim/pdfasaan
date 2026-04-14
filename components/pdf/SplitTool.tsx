'use client';

import { useState } from 'react';
import { ArrowLeft, Scissors, Download, AlertTriangle } from 'lucide-react';
import DropZone from './DropZone';
import { splitPDF } from '@/lib/pdf-engine';

export default function SplitTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageSelection, setPageSelection] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSplit = async () => {
    if (!file || !pageSelection.trim()) return;

    setIsProcessing(true);
    setIsDone(false);

    try {
      // Support both commas and ranges: "1, 3-7, 10"
      const pagesToKeep: number[] = [];
      const parts = pageSelection.split(',').map(p => p.trim());

      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n.trim()));
          if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
            for (let i = start; i <= end; i++) {
              pagesToKeep.push(i - 1); // Convert to 0-based index
            }
          }
        } else {
          const num = parseInt(part);
          if (!isNaN(num) && num > 0) {
            pagesToKeep.push(num - 1);
          }
        }
      }

      const uniquePages = [...new Set(pagesToKeep)].sort((a, b) => a - b);

      if (uniquePages.length === 0) {
        alert("Please enter valid page numbers or ranges.");
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const splitBytes = await splitPDF(bytes, uniquePages);

      const blob = new Blob([splitBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `split-${file.name}`;
      a.click();

      setIsDone(true);
      setTimeout(() => setIsDone(false), 4000);

    } catch (error) {
      console.error(error);
      alert("Split failed. Make sure the page numbers exist in the document.");
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
          className="group flex items-center gap-3 text-zinc-500 hover:text-emerald-400 mb-12 transition-all font-mono uppercase tracking-[3px] text-xs"
        >
          <div className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-emerald-400">
            <ArrowLeft size={18} />
          </div>
          BACK TO DASHBOARD
        </button>

        <div className="flex items-center gap-5 mb-12">
          <div className="p-5 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl">
            <Scissors className="text-emerald-400" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">SPLIT PDF</h1>
            <p className="text-emerald-400 text-xl mt-1">Cut out exactly the pages you need</p>
          </div>
        </div>

        {!file ? (
          <DropZone 
            onUpload={(files) => setFile(files[0])} 
            multiple={false}
            label="Drop PDF to extract specific pages"
          />
        ) : (
          <div className="glass-panel p-12 rounded-3xl space-y-10">
            {/* File Info */}
            <div className="flex items-center gap-5 bg-black/60 border border-emerald-900/50 rounded-2xl p-6">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                <Scissors className="text-emerald-400" size={28} />
              </div>
              <div className="min-w-0">
                <div className="text-white font-medium truncate">{file.name}</div>
                <div className="text-xs text-zinc-500 font-mono">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • READY TO CUT
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="flex gap-4 p-5 bg-amber-950/30 border border-amber-900/60 rounded-2xl text-amber-300 text-sm">
              <AlertTriangle className="shrink-0 mt-0.5" size={22} />
              <div>
                Enter page numbers or ranges.<br />
                Example: <span className="font-mono text-emerald-400">1, 3-7, 12</span>
              </div>
            </div>

            {/* Input */}
            <div>
              <label className="block uppercase tracking-[3px] text-xs font-bold text-zinc-400 mb-3">
                PAGES TO KEEP
              </label>
              <input
                type="text"
                value={pageSelection}
                onChange={(e) => setPageSelection(e.target.value)}
                placeholder="1, 3-7, 12"
                className="w-full bg-black border border-zinc-800 focus:border-emerald-500 rounded-2xl px-7 py-6 text-lg text-white outline-none transition-all font-mono placeholder:text-zinc-700"
              />
              <p className="mt-3 text-xs text-zinc-500 font-mono">
                Use commas and dashes for ranges • Pages start from 1
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={handleSplit}
              disabled={isProcessing || !pageSelection.trim()}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 disabled:from-zinc-700 disabled:to-zinc-600 text-black font-black py-7 rounded-2xl text-xl uppercase tracking-[2px] shadow-2xl shadow-emerald-500/40 transition-all flex items-center justify-center gap-4"
            >
              {isProcessing ? (
                <>CUTTING PDF<span className="animate-pulse">...</span></>
              ) : (
                <>
                  <Scissors size={26} /> EXTRACT SELECTED PAGES
                </>
              )}
            </button>

            {/* Success Message */}
            {isDone && (
              <div className="flex items-center justify-center gap-3 py-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-medium">
                <Scissors className="text-emerald-400" size={24} />
                Split completed • File downloaded
              </div>
            )}
          </div>
        )}

        <div className="mt-16 text-center text-xs font-mono text-zinc-600 tracking-widest">
          ALL OPERATIONS HAPPEN IN YOUR BROWSER • NO DATA IS UPLOADED
        </div>
      </div>
    </div>
  );
}
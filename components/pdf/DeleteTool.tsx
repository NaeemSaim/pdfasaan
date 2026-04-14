'use client';

import { useState } from 'react';
import { ArrowLeft, Trash2, AlertCircle, Scissors, CheckCircle2 } from 'lucide-react';
import DropZone from './DropZone';
import { deletePagesFromPDF } from '@/lib/pdf-engine';

export default function DeleteTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [pagesInput, setPagesInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deletedPages, setDeletedPages] = useState<number[]>([]);

  const handleDelete = async () => {
    if (!file || !pagesInput.trim()) return;

    setIsProcessing(true);
    setDeletedPages([]);

    try {
      // Parse "1, 3-5, 7" → [1,3,4,5,7] (supports ranges too)
      const pagesToDelete: number[] = [];
      const parts = pagesInput.split(',').map(p => p.trim());

      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
            for (let i = start; i <= end; i++) {
              pagesToDelete.push(i);
            }
          }
        } else {
          const num = parseInt(part);
          if (!isNaN(num) && num > 0) pagesToDelete.push(num);
        }
      }

      const uniquePages = [...new Set(pagesToDelete)].sort((a, b) => a - b);

      if (uniquePages.length === 0) {
        alert("Please enter valid page numbers.");
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const cleanedBytes = await deletePagesFromPDF(bytes, uniquePages);

      const blob = new Blob([cleanedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `cleaned-${file.name}`;
      a.click();

      setDeletedPages(uniquePages);

      // Clean up URL after download
      setTimeout(() => URL.revokeObjectURL(url), 1000);

    } catch (error) {
      console.error(error);
      alert("Failed to delete pages. Make sure the page numbers exist in the document.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (files: File[]) => {
    if (files[0]?.type === 'application/pdf') {
      setFile(files[0]);
      setPagesInput('');
      setDeletedPages([]);
    } else {
      alert("Only PDF files are supported.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-zinc-500 hover:text-red-400 mb-12 transition-all font-mono uppercase tracking-[3px] text-xs"
        >
          <div className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-red-400">
            <ArrowLeft size={18} />
          </div>
          BACK TO DASHBOARD
        </button>

        <div className="flex items-center gap-5 mb-12">
          <div className="p-5 bg-red-500/10 rounded-3xl">
            <Trash2 className="text-red-400" size={36} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">DELETE PAGES</h1>
            <p className="text-red-400/80 text-xl mt-1">Remove the weak. Keep the strong.</p>
          </div>
        </div>

        {!file ? (
          <DropZone onUpload={handleFileUpload} />
        ) : (
          <div className="glass-panel p-12 rounded-3xl space-y-10">
            {/* Warning Box */}
            <div className="flex gap-5 p-6 bg-red-950/40 border border-red-900/60 rounded-2xl">
              <AlertCircle className="text-red-400 shrink-0 mt-1" size={28} />
              <div className="text-sm text-red-200/80 leading-relaxed">
                Enter page numbers to <span className="text-red-400 font-bold">permanently remove</span>.<br />
                You can use commas and ranges: <span className="font-mono text-red-300">2, 5, 8-12</span>
              </div>
            </div>

            {/* Page Input */}
            <div>
              <label className="block uppercase tracking-[3px] text-xs font-bold text-zinc-400 mb-3">
                PAGES TO EXECUTE
              </label>
              <input
                type="text"
                value={pagesInput}
                onChange={(e) => setPagesInput(e.target.value)}
                placeholder="e.g. 2, 5, 8-12"
                className="w-full bg-black border border-zinc-800 focus:border-red-500 rounded-2xl px-7 py-6 text-white text-lg font-mono outline-none transition-all placeholder:text-zinc-700"
              />
              <p className="mt-3 text-xs text-zinc-500 font-mono">
                Example: 1,3,7 or 4-9 (removes pages 4 through 9)
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={handleDelete}
              disabled={isProcessing || !pagesInput.trim()}
              className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:from-zinc-800 disabled:to-zinc-700 text-white font-black py-7 rounded-2xl text-lg uppercase tracking-[2px] shadow-2xl shadow-red-500/30 transition-all flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>EXECUTING DELETION<span className="animate-pulse">...</span></>
              ) : (
                <>
                  <Scissors size={26} /> REMOVE SELECTED PAGES
                </>
              )}
            </button>

            {/* Success Feedback */}
            {deletedPages.length > 0 && (
              <div className="pt-6 border-t border-zinc-800 flex items-center gap-4 text-emerald-400">
                <CheckCircle2 size={28} />
                <div>
                  <div className="font-bold">Pages successfully removed</div>
                  <div className="text-sm text-emerald-400/70 font-mono">
                    Deleted: {deletedPages.join(', ')}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs text-zinc-600 font-mono tracking-widest">
          ALL OPERATIONS HAPPEN IN YOUR BROWSER • NO DATA IS SAVED
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { ArrowLeft, LayoutGrid, FileText, Trash2, Download, Plus } from 'lucide-react';
import DropZone from './DropZone';
import { mergePDFs } from '@/lib/pdf-engine';

export default function MergeTool({ onBack }: { onBack: () => void }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddFiles = (newFiles: File[]) => {
    const validPDFs = newFiles.filter(file => 
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    );
    setSelectedFiles(prev => [...prev, ...validPDFs]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setSelectedFiles([]);
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      alert("You need at least 2 PDFs to merge, you savage.");
      return;
    }

    setIsProcessing(true);

    try {
      const mergedBytes = await mergePDFs(selectedFiles);

      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `pdfasaan-merged-${new Date().toISOString().slice(0,10)}.pdf`;
      a.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Merge failed:", error);
      alert("Merge failed. One or more files might be corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-12 px-6">
      <div className="max-w-4xl mx-auto">
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
          <div className="p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-3xl">
            <LayoutGrid className="text-orange-400" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">MERGE PDFs</h1>
            <p className="text-orange-400 text-xl mt-1">Weld multiple documents into one unbreakable file</p>
          </div>
        </div>

        <div className="space-y-10">
          {/* DropZone */}
          <DropZone 
            onUpload={handleAddFiles} 
            multiple={true}
            label="Drop PDFs here to merge"
          />

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="glass-panel p-10 rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="uppercase text-xs tracking-[3px] text-zinc-400 font-bold">LOADED DOCUMENTS</div>
                  <div className="text-3xl font-bold text-white mt-1">
                    {selectedFiles.length} PDF{selectedFiles.length > 1 ? 's' : ''} ready
                  </div>
                </div>
                
                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                >
                  <Trash2 size={18} /> CLEAR ALL
                </button>
              </div>

              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div 
                    key={index}
                    className="group flex items-center justify-between bg-black/60 border border-zinc-800 hover:border-orange-500/50 rounded-2xl px-7 py-5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                        <FileText className="text-orange-400" size={22} />
                      </div>
                      <div className="truncate max-w-[420px]">
                        <p className="text-white font-medium text-[15px]">{file.name}</p>
                        <p className="text-xs text-zinc-500 font-mono">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFile(index)}
                      className="text-zinc-500 hover:text-red-400 p-3 transition-colors opacity-60 group-hover:opacity-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Merge Button */}
              <button
                onClick={handleMerge}
                disabled={isProcessing || selectedFiles.length < 2}
                className="mt-12 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:via-amber-400 hover:to-orange-400 disabled:from-zinc-700 disabled:to-zinc-600 text-black font-black py-7 rounded-2xl text-xl uppercase tracking-[2px] shadow-2xl shadow-orange-500/40 transition-all flex items-center justify-center gap-4"
              >
                {isProcessing ? (
                  <>WELDING PDFs TOGETHER<span className="animate-pulse">...</span></>
                ) : (
                  <>
                    <Download size={26} /> 
                    MERGE {selectedFiles.length} PDFs INTO ONE
                  </>
                )}
              </button>

              {selectedFiles.length < 2 && (
                <p className="text-center text-xs text-orange-400/70 mt-4 font-mono">
                  Add at least 2 PDFs to enable merging
                </p>
              )}
            </div>
          )}
        </div>

        {/* Privacy footer */}
        <div className="mt-16 text-center text-xs font-mono text-zinc-600 tracking-widest">
          EVERYTHING PROCESSED LOCALLY • YOUR FILES NEVER LEAVE THIS DEVICE
        </div>
      </div>
    </div>
  );
}
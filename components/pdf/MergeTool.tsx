'use client';
import { useState } from 'react';
import { mergePDFs } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, FileText, Trash2, LayoutGrid } from 'lucide-react';

export default function MergeTool({ onBack }: { onBack: () => void }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMerge = async () => {
    if (selectedFiles.length < 2) return alert("Please select at least 2 files");
    setIsProcessing(true);
    try {
      const bytes = await mergePDFs(selectedFiles);
      const blob = new Blob([bytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pdfasaan-merged.pdf';
      a.click();
    } catch (error) {
      console.error("Merge failed:", error);
      alert("Something went wrong during merging.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
          <LayoutGrid size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">Merge PDFs</h2>
      </div>

      <DropZone onUpload={(files) => setSelectedFiles([...selectedFiles, ...files])} />

      {selectedFiles.length > 0 && (
        <div className="mt-10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Selected Files ({selectedFiles.length})</h3>
            <button onClick={() => setSelectedFiles([])} className="text-sm text-zinc-500 hover:text-red-500">
              Clear All
            </button>
          </div>
          
          {selectedFiles.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <FileText className="text-orange-500" size={20} />
                <span className="text-sm truncate max-w-[200px] md:max-w-md">{file.name}</span>
              </div>
              <button onClick={() => setSelectedFiles(selectedFiles.filter((_, idx) => idx !== i))}>
                <Trash2 size={18} className="text-zinc-500 hover:text-red-400 transition-colors" />
              </button>
            </div>
          ))}

          <button
            onClick={handleMerge}
            disabled={isProcessing || selectedFiles.length < 2}
            className="w-full bg-orange-500 text-black font-bold py-5 rounded-2xl text-xl hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 shadow-lg shadow-orange-500/20"
          >
            {isProcessing ? 'Processing...' : 'Merge All PDFs'}
          </button>
        </div>
      )}
    </div>
  );
}
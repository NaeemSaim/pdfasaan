'use client';
import { useState } from 'react';
import { deletePagesFromPDF } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, Trash2, AlertCircle } from 'lucide-react';

export default function DeleteTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [pagesInput, setPagesInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    if (!file || !pagesInput) return;
    setIsProcessing(true);
    try {
      // Convert "1, 3, 4" into [1, 3, 4]
      const pagesToDelete = pagesInput.split(',')
        .map(p => parseInt(p.trim()))
        .filter(p => !isNaN(p) && p > 0);

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const cleanedBytes = await deletePagesFromPDF(bytes, pagesToDelete);
      
      const blob = new Blob([cleanedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cleaned-${file.name}`;
      a.click();
    } catch (e) {
      alert("Error deleting pages. Ensure page numbers exist.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-500/10 rounded-2xl text-red-500">
          <Trash2 size={24} />
        </div>
        <h2 className="text-3xl font-bold italic">Delete Pages</h2>
      </div>

      {!file ? (
        <DropZone onUpload={(files) => setFile(files[0])} />
      ) : (
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
          <div className="flex items-start gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
            <AlertCircle className="text-red-500 shrink-0" size={20} />
            <p className="text-xs text-red-200/60 leading-relaxed">
              Enter the page numbers you want to **remove**. For example, if you enter "2, 5", the second and fifth pages will be deleted.
            </p>
          </div>

          <div>
            <label className="block text-sm text-zinc-500 mb-2 uppercase tracking-widest font-bold">Pages to Remove</label>
            <input 
              type="text"
              value={pagesInput}
              onChange={(e) => setPagesInput(e.target.value)}
              placeholder="e.g. 1, 4, 7"
              className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-red-500 transition-all placeholder:text-zinc-700 font-mono"
            />
          </div>

          <button 
            onClick={handleDelete}
            disabled={isProcessing || !pagesInput}
            className="w-full bg-red-500 text-white font-black py-5 rounded-2xl hover:bg-red-600 transition-all uppercase tracking-widest shadow-lg shadow-red-500/20"
          >
            {isProcessing ? 'Removing Pages...' : 'Generate New PDF'}
          </button>
        </div>
      )}
    </div>
  );
}
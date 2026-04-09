// app/page.tsx
'use client';
import { useState } from 'react';
import { mergePDFs } from '@/lib/pdf-engine';
import DropZone from '@/components/pdf/DropZone';
import { Download, FileText, Trash2 } from 'lucide-react';

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMerge = async () => {
    setIsProcessing(true);
    const bytes = await mergePDFs(selectedFiles);
    // @ts-ignore - Ignore type mismatch for Blob generation
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pdfasaan-merged.pdf';
    a.click();
    setIsProcessing(false);
  };

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4">PDF Asaan</h1>
        <p className="text-zinc-400">Professional PDF tools, simplified for you.</p>
      </div>

      <DropZone onUpload={(files) => setSelectedFiles([...selectedFiles, ...files])} />

      {selectedFiles.length > 0 && (
        <div className="mt-10 space-y-4">
          <h2 className="text-xl font-bold">Files to Merge</h2>
          {selectedFiles.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <FileText className="text-orange-500" />
                <span>{file.name}</span>
              </div>
              <button onClick={() => setSelectedFiles(selectedFiles.filter((_, idx) => idx !== i))}>
                <Trash2 size={18} className="text-zinc-500 hover:text-red-500" />
              </button>
            </div>
          ))}
          <button 
            onClick={handleMerge}
            disabled={isProcessing}
            className="w-full bg-orange-500 text-black font-bold py-5 rounded-2xl text-xl hover:bg-orange-600 disabled:opacity-50"
          >
            {isProcessing ? 'Merging...' : 'Merge All PDFs'}
          </button>
        </div>
      )}
    </main>
  );
}
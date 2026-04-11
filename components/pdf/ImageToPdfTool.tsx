'use client';
import { useState } from 'react';
import { imageToPDF } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, FileImage, Download, Plus } from 'lucide-react';

export default function ImageToPdfTool({ onBack }: { onBack: () => void }) {
  const [images, setImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfBytes = await imageToPDF(images);
      // Wrap 'result' in its buffer property to satisfy the TypeScript compiler
      const blob = new Blob([result.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `images-converted.pdf`;
      a.click();
    } catch (e) {
      alert("Conversion failed. Ensure images are JPG or PNG.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
          <FileImage size={24} />
        </div>
        <h2 className="text-3xl font-bold italic">Image to PDF</h2>
      </div>

      <DropZone onUpload={(files) => setImages([...images, ...files])} />

      {images.length > 0 && (
        <div className="mt-10 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 rounded-2xl p-2 relative group">
                <img src={URL.createObjectURL(img)} className="w-full h-full object-cover rounded-xl" alt="preview" />
                <button 
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="rotate-45" size={14} />
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={handleConvert}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500 transition-all uppercase tracking-widest shadow-lg shadow-blue-500/20"
          >
            {isProcessing ? 'Generating PDF...' : `Convert ${images.length} Images to PDF`}
          </button>
        </div>
      )}
    </div>
  );
}
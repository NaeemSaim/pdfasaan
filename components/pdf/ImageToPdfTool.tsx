'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, FileImage, Download, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import DropZone from './DropZone';
import { imageToPDF } from '@/lib/pdf-engine';

export default function ImageToPdfTool({ onBack }: { onBack: () => void }) {
  const [images, setImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  // Generate object URLs for previews
  useEffect(() => {
    const urls = images.map(img => URL.createObjectURL(img));
    setPreviews(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleAddImages = (newFiles: File[]) => {
    // Filter only images
    const validImages = newFiles.filter(file => 
      file.type.startsWith('image/') || 
      file.name.match(/\.(jpg|jpeg|png|webp)$/i)
    );
    setImages(prev => [...prev, ...validImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);

    try {
      const pdfBytes = await imageToPDF(images);

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `converted-${new Date().toISOString().slice(0,10)}.pdf`;
      a.click();

      // Cleanup
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error(error);
      alert("Conversion failed. Please ensure all files are valid images (JPG, PNG, WebP).");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-12 px-6">
      <div className="max-w-5xl mx-auto">
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
          <div className="p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl">
            <FileImage className="text-[#22d3ee]" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">IMAGE TO PDF</h1>
            <p className="text-[#22d3ee] text-xl mt-1">Turn your images into a clean, professional document</p>
          </div>
        </div>

        <div className="space-y-12">
          {/* DropZone */}
          <DropZone 
            onUpload={handleAddImages} 
            multiple={true} 
            accept="image/*"
            label="Drop images here (JPG, PNG, WebP)"
          />

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="glass-panel p-10 rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="uppercase text-xs tracking-[3px] text-zinc-400 font-bold">SELECTED IMAGES</div>
                  <div className="text-3xl font-bold text-white mt-1">{images.length} files loaded</div>
                </div>
                <button
                  onClick={() => setImages([])}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                >
                  <Trash2 size={18} /> CLEAR ALL
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    className="group relative aspect-square bg-black rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#22d3ee]/50 transition-all"
                  >
                    <img 
                      src={previews[index]} 
                      alt={`preview-${index}`} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-3 right-3 bg-black/80 hover:bg-red-600 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                      <Plus className="rotate-45" size={18} />
                    </button>

                    {/* Filename overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                      <p className="text-xs text-white/80 font-mono truncate">
                        {img.name.length > 28 ? img.name.slice(0, 25) + '...' : img.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="mt-12 w-full bg-gradient-to-r from-[#22d3ee] to-cyan-400 hover:from-cyan-300 hover:to-[#22d3ee] disabled:from-zinc-700 disabled:to-zinc-600 text-black font-black py-7 rounded-2xl text-xl uppercase tracking-[2px] shadow-2xl shadow-[#22d3ee]/40 transition-all flex items-center justify-center gap-4"
              >
                {isProcessing ? (
                  <>GENERATING PDF<span className="animate-pulse">...</span></>
                ) : (
                  <>
                    <Download size={26} /> 
                    CONVERT {images.length} IMAGES TO PDF
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Privacy note */}
        <div className="mt-16 text-center text-xs font-mono text-zinc-600 tracking-widest">
          ALL PROCESSING HAPPENS IN YOUR BROWSER • YOUR IMAGES NEVER LEAVE THIS DEVICE
        </div>
      </div>
    </div>
  );
}
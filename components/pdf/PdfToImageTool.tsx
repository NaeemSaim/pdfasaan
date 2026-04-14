'use client';

import { useState } from 'react';
import { ArrowLeft, ImageIcon, Download, FileImage, RefreshCw } from 'lucide-react';
import DropZone from './DropZone';
import { pdfToImage } from '@/lib/pdf-engine';

export default function PdfToImageTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    setImages([]);
    setCurrentPage(1);

    try {
      const result = await pdfToImage(file); // Use your existing engine function

      setImages(result.images);
      setTotalPages(result.totalPages);

      // Auto-download first image as bonus
      if (result.images.length > 0) {
        const link = document.createElement('a');
        link.href = result.images[0];
        link.download = `page-1-${file.name.replace('.pdf', '')}.jpg`;
        link.click();
      }
    } catch (error: any) {
      console.error("PDF to Image Error:", error);
      if (error.name === 'PasswordException') {
        alert("This PDF is password protected. Please unlock it first.");
      } else {
        alert("Conversion failed. The PDF might be corrupted or too large.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = () => {
    images.forEach((img, index) => {
      const link = document.createElement('a');
      link.href = img;
      link.download = `page-${index + 1}-${file?.name.replace('.pdf', '')}.jpg`;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] py-12 px-6">
      <div className="max-w-6xl mx-auto">
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
          <div className="p-5 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-3xl">
            <ImageIcon className="text-pink-400" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">PDF TO IMAGES</h1>
            <p className="text-pink-400 text-xl mt-1">Extract every page as high-quality JPG</p>
          </div>
        </div>

        {!file ? (
          <DropZone 
            onUpload={(files) => setFile(files[0])} 
            multiple={false}
            label="Drop a PDF to extract its pages as images"
          />
        ) : (
          <div className="space-y-10">
            {/* File Header */}
            <div className="glass-panel p-8 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileImage className="text-pink-400" size={32} />
                <div>
                  <div className="text-white font-medium text-lg truncate max-w-md">{file.name}</div>
                  <div className="text-xs text-zinc-500 font-mono">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>

              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 disabled:from-zinc-700 disabled:to-zinc-600 text-black font-black px-10 py-4 rounded-2xl uppercase tracking-[2px] shadow-xl shadow-pink-500/30 transition-all flex items-center gap-3"
              >
                {isProcessing ? (
                  <>EXTRACTING PAGES<span className="animate-pulse">...</span></>
                ) : (
                  <>CONVERT TO IMAGES <RefreshCw size={20} /></>
                )}
              </button>
            </div>

            {/* Results Area */}
            {images.length > 0 && (
              <div className="glass-panel p-10 rounded-3xl">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="text-3xl font-bold text-white">{images.length} Pages Extracted</div>
                    <div className="text-pink-400 text-sm font-mono">High quality JPG • 300 DPI equivalent</div>
                  </div>

                  <button
                    onClick={downloadAll}
                    className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-pink-500 px-8 py-4 rounded-2xl font-bold transition-all"
                  >
                    <Download size={22} /> DOWNLOAD ALL AS ZIP (soon)
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {images.map((imgSrc, index) => (
                    <div key={index} className="group relative bg-black rounded-3xl overflow-hidden border border-zinc-800 hover:border-pink-500/50 transition-all">
                      <img 
                        src={imgSrc} 
                        alt={`Page ${index + 1}`} 
                        className="w-full h-auto object-contain bg-zinc-950"
                      />
                      <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-mono px-4 py-1.5 rounded-xl">
                        PAGE {index + 1}
                      </div>
                      
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = imgSrc;
                          link.download = `page-${index + 1}-${file.name.replace('.pdf', '')}.jpg`;
                          link.click();
                        }}
                        className="absolute bottom-4 right-4 bg-black/80 hover:bg-pink-600 p-3 rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="text-center py-20 text-pink-400 font-mono tracking-widest">
                RIPPING PAGES FROM PDF... THIS MAY TAKE A MOMENT ON LARGE FILES
              </div>
            )}
          </div>
        )}

        <div className="mt-16 text-center text-xs font-mono text-zinc-600 tracking-widest">
          ALL CONVERSION HAPPENS IN YOUR BROWSER • NO SERVERS • NO TRACKING
        </div>
      </div>
    </div>
  );
}
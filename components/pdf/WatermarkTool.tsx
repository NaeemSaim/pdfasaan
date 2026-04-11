'use client';
import { useState, useEffect } from 'react';
import { watermarkPDF } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, Type, Layout, Eye, Sliders } from 'lucide-react';

export default function WatermarkTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [size, setSize] = useState(60);
  const [position, setPosition] = useState<'top' | 'center' | 'bottom'>('center');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle file cleanup
  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const handleUpload = (files: File[]) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleDownload = async () => {
    if (!file || !text) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const watermarkedBytes = await watermarkPDF(bytes, text, size, position);
      
      const blob = new Blob([watermarkedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `watermarked-${file.name}`;
      a.click();
    } catch (e) {
      alert("Watermarking failed.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Controls */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500"><Sliders size={24} /></div>
            <h2 className="text-3xl font-bold italic">Watermark Settings</h2>
          </div>

          {!file ? (
            <DropZone onUpload={handleUpload} />
          ) : (
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
              {/* Text Input */}
              <div>
                <label className="block text-sm text-zinc-500 mb-2 uppercase tracking-widest font-bold">Watermark Text</label>
                <input 
                  type="text" value={text} onChange={(e) => setText(e.target.value)} 
                  className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-purple-500 transition-all" 
                />
              </div>

              {/* Size Slider */}
              <div>
                <label className="block text-sm text-zinc-500 mb-2 uppercase tracking-widest font-bold">Font Size: {size}px</label>
                <input 
                  type="range" min="20" max="150" value={size} onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500" 
                />
              </div>

              {/* Placement Selector */}
              <div>
                <label className="block text-sm text-zinc-500 mb-2 uppercase tracking-widest font-bold">Placement</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['top', 'center', 'bottom'] as const).map((p) => (
                    <button
                      key={p} onClick={() => setPosition(p)}
                      className={`p-3 rounded-xl border text-sm capitalize font-bold transition-all ${
                        position === p ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-zinc-800 bg-black text-zinc-500'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleDownload} disabled={isProcessing}
                className="w-full bg-purple-500 text-white font-black py-5 rounded-2xl hover:bg-purple-400 transition-all shadow-lg shadow-purple-500/20 uppercase tracking-widest"
              >
                {isProcessing ? 'Processing...' : 'Download PDF'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Live Preview */}
        <div className="sticky top-10">
          <div className="flex items-center gap-2 text-zinc-500 mb-4 px-2">
            <Eye size={18} /> <span className="text-xs font-bold uppercase tracking-widest">Real-time Preview</span>
          </div>
          
          <div className="aspect-[3/4] bg-black border border-zinc-800 rounded-[2rem] overflow-hidden relative shadow-2xl">
            {previewUrl ? (
              <div className="w-full h-full relative">
                <iframe src={`${previewUrl}#toolbar=0&navpanes=0`} className="w-full h-full border-none opacity-80" />
                
                {/* CSS Simulation of the PDF Watermark */}
                <div 
                  className="absolute inset-0 pointer-events-none flex justify-center p-12 overflow-hidden"
                  style={{ 
                    alignItems: position === 'top' ? 'flex-start' : position === 'bottom' ? 'flex-end' : 'center'
                  }}
                >
                  <div 
                    className="text-white/30 font-black whitespace-nowrap select-none italic text-center"
                    style={{ 
                      fontSize: `${size / 2.5}px`, 
                      transform: 'rotate(-30deg)' 
                    }}
                  >
                    {text}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 p-12 text-center">
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                    <Type size={32} className="opacity-20" />
                </div>
                <p className="text-sm">Upload a PDF to see the<br/>watermark preview instantly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
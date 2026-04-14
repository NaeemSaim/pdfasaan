'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCw, Eye, Download } from 'lucide-react';
import DropZone from './DropZone';
import { rotatePDF } from '@/lib/pdf-engine';

export default function RotateTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleUpload = (files: File[]) => {
    const selectedFile = files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setAngle(90); // Reset to default
    }
  };

  const handleRotate = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const rotatedBytes = await rotatePDF(bytes, angle);

      const blob = new Blob([rotatedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `rotated-${file.name}`;
      a.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error(error);
      alert("Rotation failed. The PDF might be corrupted or password-protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-12 px-6">
      <div className="max-w-7xl mx-auto">
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
            <RotateCw className="text-[#22d3ee]" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">ROTATE PDF</h1>
            <p className="text-[#22d3ee] text-xl mt-1">Fix upside-down chaos in seconds</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-8">
            {!file ? (
              <DropZone 
                onUpload={handleUpload} 
                multiple={false}
                label="Drop PDF to rotate pages"
              />
            ) : (
              <div className="glass-panel p-10 rounded-3xl space-y-10">
                <div>
                  <label className="block uppercase tracking-[3px] text-xs font-bold text-zinc-400 mb-4">
                    ROTATION ANGLE
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[90, 180, 270].map((deg) => (
                      <button
                        key={deg}
                        onClick={() => setAngle(deg as 90 | 180 | 270)}
                        className={`py-6 rounded-2xl border-2 font-black text-xl transition-all duration-300 ${
                          angle === deg 
                            ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee] shadow-lg shadow-[#22d3ee]/30' 
                            : 'border-zinc-800 bg-black hover:border-zinc-700 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {deg}°
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-blue-950/30 border border-blue-900/50 rounded-2xl">
                  <div className="flex gap-3">
                    <Smartphone className="text-blue-400 mt-1" size={22} />
                    <p className="text-sm text-blue-200/80 leading-relaxed">
                      Most scanned documents need <span className="text-[#22d3ee] font-medium">90°</span> to fix landscape orientation.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRotate}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-[#22d3ee] to-cyan-400 hover:from-cyan-300 hover:to-[#22d3ee] disabled:from-zinc-700 disabled:to-zinc-600 text-black font-black py-7 rounded-2xl text-xl uppercase tracking-[2px] shadow-2xl shadow-[#22d3ee]/40 transition-all flex items-center justify-center gap-4"
                >
                  {isProcessing ? (
                    <>ROTATING DOCUMENT<span className="animate-pulse">...</span></>
                  ) : (
                    <>
                      <Download size={26} /> DOWNLOAD ROTATED PDF
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Real-time Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-8">
              <div className="flex items-center gap-3 mb-6 px-2">
                <Eye className="text-[#22d3ee]" size={22} />
                <span className="uppercase text-xs font-bold tracking-[3px] text-zinc-400">LIVE ORIENTATION PREVIEW</span>
              </div>

              <div className="glass-panel aspect-video bg-black rounded-[2.5rem] overflow-hidden flex items-center justify-center border border-zinc-800 relative shadow-2xl">
                {previewUrl ? (
                  <div 
                    className="transition-transform duration-700 ease-out origin-center shadow-2xl"
                    style={{ 
                      transform: `rotate(${angle}deg)`,
                      maxWidth: '85%',
                      maxHeight: '85%'
                    }}
                  >
                    <iframe 
                      src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                      className="w-full h-full border-none pointer-events-none rounded-xl" 
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-zinc-700">
                    <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                      <RotateCw size={48} className="opacity-20" />
                    </div>
                    <p className="text-lg">Upload a PDF to see live rotation</p>
                  </div>
                )}
              </div>

              {file && (
                <div className="mt-6 text-center text-xs font-mono text-zinc-500">
                  {file.name} • {angle}° preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
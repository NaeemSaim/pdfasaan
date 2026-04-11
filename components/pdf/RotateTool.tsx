'use client';
import { useState, useEffect } from 'react';
import { rotatePDF } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, RotateCw, Eye, Smartphone, Monitor } from 'lucide-react';

export default function RotateTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [angle, setAngle] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const handleUpload = (files: File[]) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleRotate = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const rotatedBytes = await rotatePDF(bytes, angle);
      
      const blob = new Blob([rotatedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rotated-${file.name}`;
      a.click();
    } catch (e) {
      alert("Rotation failed.");
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
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><RotateCw size={24} /></div>
            <h2 className="text-3xl font-bold italic">Rotate Settings</h2>
          </div>

          {!file ? (
            <DropZone onUpload={handleUpload} />
          ) : (
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-8 shadow-xl">
              <div>
                <label className="block text-sm text-zinc-500 mb-4 uppercase tracking-widest font-bold">Select Angle</label>
                <div className="grid grid-cols-3 gap-4">
                  {[90, 180, 270].map((deg) => (
                    <button 
                      key={deg}
                      onClick={() => setAngle(deg)}
                      className={`py-4 rounded-xl border-2 font-black transition-all ${
                        angle === deg ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-zinc-800 bg-black text-zinc-500 hover:border-zinc-700'
                      }`}
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                <p className="text-sm text-blue-200/70 leading-relaxed italic">
                  Tip: Most scanned documents need a 90° rotation to fix landscape orientation.
                </p>
              </div>

              <button 
                onClick={handleRotate}
                disabled={isProcessing}
                className="w-full bg-blue-500 text-white font-black py-5 rounded-2xl hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest"
              >
                {isProcessing ? 'Rotating...' : 'Download Rotated PDF'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Real-time Preview */}
        <div className="sticky top-10">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-zinc-500">
              <Eye size={18} /> 
              <span className="text-xs font-bold uppercase tracking-widest">Orientation Preview</span>
            </div>
            {file && <span className="text-xs text-zinc-600 truncate max-w-[200px]">{file.name}</span>}
          </div>
          
          <div className="aspect-square bg-black border border-zinc-800 rounded-[2rem] overflow-hidden flex items-center justify-center relative shadow-2xl">
            {previewUrl ? (
              <div 
                className="w-[70%] h-[70%] transition-transform duration-500 ease-in-out shadow-2xl rounded-lg overflow-hidden"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <iframe src={`${previewUrl}#toolbar=0&navpanes=0`} className="w-full h-full border-none pointer-events-none" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-zinc-700 p-12 text-center">
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                    <RotateCw size={32} className="opacity-20" />
                </div>
                <p className="text-sm">Upload a PDF to see the<br/>rotation preview instantly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
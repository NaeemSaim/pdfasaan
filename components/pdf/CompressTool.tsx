'use client';
import { useState, useEffect } from 'react';
import { compressPDF } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, Zap, CheckCircle2, FileDown, Activity } from 'lucide-react';

export default function CompressTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to format bytes to KB/MB
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const levels = [
    { id: 'low', name: 'Low', reduction: 15, desc: 'High quality, large size' },
    { id: 'medium', name: 'Medium', reduction: 40, desc: 'Best balance for web' },
    { id: 'high', name: 'High', reduction: 70, desc: 'Max compression, low quality' },
  ];

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const compressedBytes = await compressPDF(bytes, level);
      
      const blob = new Blob([compressedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed-${file.name}`;
      a.click();
    } catch (e) {
      alert("Compression failed.");
    }
    setIsProcessing(false);
  };

  const currentLevel = levels.find(l => l.id === level);
  const estimatedSize = file ? file.size * (1 - (currentLevel?.reduction || 0) / 100) : 0;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Controls */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500"><Zap size={24} /></div>
            <h2 className="text-3xl font-bold italic text-white">Compress Settings</h2>
          </div>

          {!file ? (
            <DropZone onUpload={(files) => setFile(files[0])} />
          ) : (
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex justify-between items-center">
                 <span className="text-zinc-500 text-sm uppercase font-bold">Original Size</span>
                 <span className="text-white font-mono">{formatSize(file.size)}</span>
              </div>

              <div className="space-y-3">
                {levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id as any)}
                    className={`w-full p-5 rounded-2xl border text-left flex justify-between items-center transition-all ${
                      level === l.id ? 'border-yellow-500 bg-yellow-500/5 ring-1 ring-yellow-500/20' : 'border-zinc-800 bg-black hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="font-black text-white">{l.name} Compression</div>
                      <div className="text-xs text-zinc-500">{l.desc}</div>
                    </div>
                    <div className="text-right">
                       <div className={`font-black ${level === l.id ? 'text-yellow-500' : 'text-zinc-600'}`}>-{l.reduction}%</div>
                    </div>
                  </button>
                ))}
              </div>

              <button 
                onClick={handleCompress}
                disabled={isProcessing}
                className="w-full bg-yellow-500 text-black font-black py-5 rounded-2xl hover:bg-yellow-400 transition-all uppercase tracking-widest shadow-lg shadow-yellow-500/20"
              >
                {isProcessing ? 'Optimizing...' : 'Download Compressed PDF'}
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Visual Stats */}
        <div className="sticky top-10">
           <div className="flex items-center gap-2 text-zinc-500 mb-4 px-2">
            <Activity size={18} /> <span className="text-xs font-bold uppercase tracking-widest">Efficiency Forecast</span>
          </div>

          <div className="bg-black border border-zinc-800 rounded-[2rem] p-10 shadow-2xl space-y-10">
             {file ? (
               <>
                <div className="text-center space-y-2">
                  <div className="text-sm text-zinc-500 uppercase tracking-tighter">Estimated Final Size</div>
                  <div className="text-6xl font-black text-white tabular-nums">{formatSize(estimatedSize)}</div>
                  <div className="inline-block px-4 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-bold">
                    Saving ~{formatSize(file.size - estimatedSize)}
                  </div>
                </div>

                {/* Progress Bar Visual */}
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase text-zinc-600">
                    <span>Current</span>
                    <span>Projected</span>
                  </div>
                  <div className="h-6 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                    <div className="h-full bg-zinc-700 transition-all duration-500" style={{ width: `${100 - (currentLevel?.reduction || 0)}%` }}></div>
                    <div className="h-full bg-yellow-500/20 transition-all duration-500" style={{ width: `${currentLevel?.reduction || 0}%` }}></div>
                  </div>
                </div>
               </>
             ) : (
               <div className="h-64 flex flex-col items-center justify-center text-zinc-700 text-center">
                  <FileDown size={48} className="mb-4 opacity-10" />
                  <p className="text-sm">Upload a file to see <br/> compression statistics.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
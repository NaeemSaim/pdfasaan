'use client';

import { useState } from 'react';
import { ArrowLeft, Zap, Activity, FileDown, CheckCircle2, Download } from 'lucide-react';
import DropZone from './DropZone';
import { compressPDF } from '@/lib/pdf-engine';

type CompressionLevel = 'low' | 'medium' | 'high';

export default function CompressTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const levels = [
    { 
      id: 'low' as CompressionLevel, 
      name: 'Light', 
      reduction: 20, 
      desc: 'Maximum quality • Minimal size reduction',
      color: '#22d3ee'
    },
    { 
      id: 'medium' as CompressionLevel, 
      name: 'Balanced', 
      reduction: 45, 
      desc: 'Perfect for web & sharing',
      color: '#eab308'
    },
    { 
      id: 'high' as CompressionLevel, 
      name: 'Aggressive', 
      reduction: 75, 
      desc: 'Maximum compression • Noticeable quality drop',
      color: '#ef4444'
    },
  ];

  const currentLevel = levels.find(l => l.id === level)!;
  const originalSize = file?.size || 0;
  const estimatedReduction = Math.floor(originalSize * (currentLevel.reduction / 100));
  const estimatedSize = originalSize - estimatedReduction;

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    setDownloadUrl(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const compressedBytes = await compressPDF(bytes, level);

      const blob = new Blob([compressedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);

      // Auto-download after a tiny delay for better UX
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = url;
        a.download = `compressed-${file.name.replace('.pdf', '')}.pdf`;
        a.click();
      }, 300);

    } catch (error) {
      console.error(error);
      alert("Compression failed. The file might be corrupted or too complex.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (files: File[]) => {
    if (files[0]?.type === 'application/pdf') {
      setFile(files[0]);
      setDownloadUrl(null);
    } else {
      alert("Please upload a valid PDF file.");
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

        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-yellow-500/10 rounded-2xl">
            <Zap className="text-yellow-400" size={32} />
          </div>
          <div>
            <h1 className="text-6xl font-black tracking-tighter text-white">COMPRESS PDF</h1>
            <p className="text-zinc-400 mt-1">Shrink your files without leaving the browser</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Controls Panel */}
          <div className="lg:col-span-7 space-y-8">
            {!file ? (
              <DropZone onUpload={handleFileUpload} />
            ) : (
              <div className="glass-panel p-10 rounded-3xl space-y-8">
                {/* File Info */}
                <div className="flex items-center justify-between bg-black/60 p-6 rounded-2xl border border-zinc-800">
                  <div>
                    <div className="text-white font-medium truncate max-w-md">{file.name}</div>
                    <div className="text-sm text-zinc-500 font-mono">{formatSize(file.size)}</div>
                  </div>
                  <CheckCircle2 className="text-emerald-400" size={28} />
                </div>

                {/* Compression Levels */}
                <div>
                  <div className="uppercase text-xs tracking-[3px] text-zinc-500 mb-4 font-bold">COMPRESSION INTENSITY</div>
                  <div className="space-y-3">
                    {levels.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setLevel(l.id)}
                        className={`w-full p-6 rounded-2xl border text-left transition-all group ${
                          level === l.id 
                            ? 'border-[#22d3ee] bg-[#22d3ee]/5 ring-1 ring-[#22d3ee]/30' 
                            : 'border-zinc-800 hover:border-zinc-700 bg-black/40'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-xl text-white group-hover:text-[#22d3ee] transition-colors">
                              {l.name}
                            </div>
                            <div className="text-sm text-zinc-400 mt-1">{l.desc}</div>
                          </div>
                          <div className={`font-black text-4xl tabular-nums transition-colors ${level === l.id ? 'text-[#22d3ee]' : 'text-zinc-700'}`}>
                            -{l.reduction}%
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compress Button */}
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 disabled:from-zinc-700 disabled:to-zinc-600 text-black font-black py-6 rounded-2xl text-lg uppercase tracking-[2px] shadow-xl shadow-yellow-500/30 transition-all flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>OPTIMIZING FILE<span className="animate-pulse">...</span></>
                  ) : (
                    <>
                      <Download size={24} /> DOWNLOAD COMPRESSED PDF
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Live Stats Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="flex items-center gap-3 mb-6 px-2">
                <Activity className="text-[#22d3ee]" size={22} />
                <span className="uppercase text-xs font-bold tracking-[3px] text-zinc-400">LIVE EFFICIENCY FORECAST</span>
              </div>

              <div className="glass-panel rounded-3xl p-10 space-y-12 border border-zinc-700">
                {file ? (
                  <>
                    {/* Size Comparison */}
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">ESTIMATED FINAL SIZE</div>
                      <div className="text-7xl font-black text-white tabular-nums tracking-tighter">
                        {formatSize(estimatedSize)}
                      </div>
                      <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-6 py-2 rounded-full text-sm font-bold">
                        SAVING {formatSize(estimatedReduction)}
                      </div>
                    </div>

                    {/* Visual Compression Bar */}
                    <div className="space-y-5">
                      <div className="flex justify-between text-xs font-mono uppercase text-zinc-500">
                        <span>ORIGINAL</span>
                        <span>COMPRESSED</span>
                      </div>
                      <div className="h-3 bg-zinc-900 rounded-full overflow-hidden flex">
                        <div 
                          className="h-full bg-zinc-600 transition-all duration-700"
                          style={{ width: `${100 - currentLevel.reduction}%` }}
                        />
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-700"
                          style={{ width: `${currentLevel.reduction}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[13px] text-zinc-400 font-mono">
                        <span>{formatSize(originalSize)}</span>
                        <span className="text-amber-400">-{currentLevel.reduction}%</span>
                      </div>
                    </div>

                    {downloadUrl && (
                      <div className="pt-6 border-t border-zinc-800 text-center">
                        <p className="text-emerald-400 text-sm font-medium">✓ File ready for download</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-96 flex flex-col items-center justify-center text-center opacity-60">
                    <FileDown size={64} className="mb-6 text-zinc-700" />
                    <p className="text-xl text-zinc-500">Upload a PDF to see<br />real-time compression stats</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
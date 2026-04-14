'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Download, Eraser, Move, Trash2 } from 'lucide-react';
import DropZone from './DropZone';
import { imagesToPdf } from '@/lib/pdf-engine';

export default function RedactTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [redactions, setRedactions] = useState<Array<{x: number, y: number, w: number, h: number}>>([]);

  // Load PDF page to canvas
  useEffect(() => {
    if (file) loadPdfToCanvas();
  }, [file]);

  const loadPdfToCanvas = async () => {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

    const arrayBuffer = await file!.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1); // Currently only first page (you can expand later)

    const viewport = page.getViewport({ scale: 1.6 });

    const canvas = canvasRef.current!;
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const context = canvas.getContext('2d')!;
    await page.render({ canvasContext: context, viewport }).promise;
  };

  // Redaction drawing
  const startRect = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
    setIsDrawing(true);
  };

  const drawRect = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const rect = canvas.getBoundingClientRect();

    const currX = e.clientX - rect.left;
    const currY = e.clientY - rect.top;

    // Redraw the original canvas + previous redactions
    loadPdfToCanvas(); // Re-render base (simple but works)
    
    // Draw all previous redactions
    ctx.fillStyle = '#000000';
    redactions.forEach(r => ctx.fillRect(r.x, r.y, r.w, r.h));

    // Draw current rectangle
    ctx.fillStyle = '#ef4444';
    ctx.globalAlpha = 0.85;
    ctx.fillRect(startX, startY, currX - startX, currY - startY);
    ctx.globalAlpha = 1.0;
  };

  const endRect = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const newRedaction = {
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      w: Math.abs(endX - startX),
      h: Math.abs(endY - startY)
    };

    if (newRedaction.w > 10 && newRedaction.h > 10) {
      setRedactions(prev => [...prev, newRedaction]);
    }

    setIsDrawing(false);
  };

  const clearAllRedactions = () => {
    setRedactions([]);
    if (file) loadPdfToCanvas();
  };

  const handleSave = async () => {
    if (!canvasRef.current) return;

    setIsProcessing(true);

    try {
      // Get final canvas with all redactions applied
      const finalCanvas = canvasRef.current;
      const ctx = finalCanvas.getContext('2d')!;
      
      ctx.fillStyle = '#000000';
      redactions.forEach(r => ctx.fillRect(r.x, r.y, r.w, r.h));

      const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.92);
      const pdfBytes = await imagesToPdf([dataUrl]);

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `redacted-${file?.name || 'document'}.pdf`;
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error(e);
      alert("Failed to create redacted PDF.");
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
          className="group flex items-center gap-3 text-zinc-500 hover:text-red-400 mb-12 transition-all font-mono uppercase tracking-[3px] text-xs"
        >
          <div className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-red-400">
            <ArrowLeft size={18} />
          </div>
          BACK TO DASHBOARD
        </button>

        <div className="flex items-center gap-5 mb-12">
          <div className="p-5 bg-gradient-to-br from-red-500/10 to-rose-600/10 rounded-3xl">
            <ShieldCheck className="text-red-400" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">REDACT</h1>
            <p className="text-red-400 text-xl mt-1">Blackout sensitive information. Permanently.</p>
          </div>
        </div>

        {!file ? (
          <DropZone 
            onUpload={(files) => setFile(files[0])} 
            multiple={false}
            label="Drop PDF to start redaction"
          />
        ) : (
          <div className="space-y-8">
            {/* Toolbar */}
            <div className="glass-panel flex items-center justify-between p-6 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="text-white font-medium truncate max-w-md">{file.name}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearAllRedactions}
                  className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-2xl text-red-400 hover:text-red-300 transition-all"
                >
                  <Eraser size={20} /> CLEAR ALL
                </button>

                <button
                  onClick={handleSave}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:from-zinc-700 disabled:to-zinc-600 text-white font-black px-10 py-3 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-red-600/40"
                >
                  {isProcessing ? (
                    <>REDACTING<span className="animate-pulse">...</span></>
                  ) : (
                    <>EXPORT REDACTED PDF <Download size={22} /></>
                  )}
                </button>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="relative bg-black rounded-3xl overflow-hidden border border-red-900/50 shadow-2xl">
              <canvas
                ref={canvasRef}
                onMouseDown={startRect}
                onMouseMove={drawRect}
                onMouseUp={endRect}
                onMouseLeave={endRect}
                className="max-w-full h-auto cursor-crosshair block mx-auto"
              />

              {/* Overlay Instructions */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 text-red-400 text-xs font-mono px-6 py-2 rounded-2xl border border-red-900/50 pointer-events-none">
                DRAG MOUSE TO BLACKOUT • RELEASE TO CONFIRM
              </div>
            </div>

            <p className="text-center text-zinc-500 text-xs uppercase tracking-[2px] font-bold">
              All redacted areas are permanently blacked out in the final PDF
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
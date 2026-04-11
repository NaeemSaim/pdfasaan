'use client';
import { useState, useRef, useEffect } from 'react';
import { imagesToPdf } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, ShieldCheck, Download, Eraser, Move } from 'lucide-react';

export default function RedactTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  // Initialize PDF to Canvas
  useEffect(() => {
    if (file) loadPdfToCanvas();
  }, [file]);

  const loadPdfToCanvas = async () => {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'; // Using your local worker
    const arrayBuffer = await file!.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1); // Redact first page
    
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context!, viewport }).promise;
  };

  const startRect = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
    setIsDrawing(true);
  };

  const drawRect = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const rect = canvas.getBoundingClientRect();
    const currX = e.clientX - rect.left;
    const currY = e.clientY - rect.top;

    ctx.fillStyle = 'black';
    ctx.fillRect(startX, startY, currX - startX, currY - startY);
  };

  const endRect = () => setIsDrawing(false);

  const handleSave = async () => {
    setIsProcessing(true);
    const dataUrl = canvasRef.current!.toDataURL('image/jpeg', 0.9);
    const pdfBytes = await imagesToPdf([dataUrl]);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `redacted-${file?.name}`;
    link.click();
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8"><ArrowLeft size={18}/> Back</button>
      
      {!file ? (
        <DropZone onUpload={(files) => setFile(files[0])} />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <p className="text-sm text-zinc-400 font-mono truncate max-w-[200px]">{file.name}</p>
            <div className="flex gap-2">
              <button onClick={() => setFile(null)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400"><Eraser size={20}/></button>
              <button onClick={handleSave} disabled={isProcessing} className="bg-white text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2">
                <Download size={18}/> {isProcessing ? 'Saving...' : 'Export Redacted PDF'}
              </button>
            </div>
          </div>

          <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl cursor-crosshair flex justify-center">
            <canvas 
              ref={canvasRef}
              onMouseDown={startRect}
              onMouseMove={drawRect}
              onMouseUp={endRect}
              className="max-w-full h-auto"
            />
          </div>
          <p className="text-center text-zinc-500 text-xs uppercase tracking-widest font-bold">Drag your mouse to blackout sensitive info</p>
        </div>
      )}
    </div>
  );
}
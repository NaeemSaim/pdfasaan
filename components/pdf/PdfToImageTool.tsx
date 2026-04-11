'use client';
import { useState } from 'react';
import { pdfToImage } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, ImageIcon, Download, FileImage } from 'lucide-react';

export default function PdfToImageTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
  if (!file) return;
  setIsProcessing(true);
  
  try {
    const pdfjs = await import('pdfjs-dist');
    
    // POINT TO YOUR LOCAL PUBLIC FOLDER
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      
      // 3. Lower the scale if it's failing on large files (from 2.0 to 1.5)
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) throw new Error("Canvas context failed");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      setResultImage(canvas.toDataURL('image/jpeg', 0.8)); // Lower quality slightly for speed
      
    } catch (e: any) {
      console.error("PDF Conversion Error:", e);
      // Specifically check for password-protected files
      if (e.name === 'PasswordException') {
        alert("This PDF is password protected. Please unlock it first.");
      } else {
        alert(`Conversion failed: ${e.message}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8">
        <ArrowLeft size={18} /> Back
      </button>
      <h2 className="text-3xl font-bold mb-6">PDF to Image</h2>
      {!file ? (
        <DropZone onUpload={(files) => setFile(files[0])} />
      ) : (
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
           <button onClick={handleConvert} className="w-full bg-pink-500 py-4 rounded-xl font-bold mb-4">
             {isProcessing ? 'Converting...' : 'Convert to JPG'}
           </button>
           {resultImage && <img src={resultImage} className="w-full rounded-xl" />}
        </div>
      )}
    </div>
  );
}
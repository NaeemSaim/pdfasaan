// components/pdf/DropZone.tsx
'use client';
import { UploadCloud } from 'lucide-react';

interface Props { onUpload: (files: File[]) => void; multiple?: boolean; }

export default function DropZone({ onUpload, multiple = true }: Props) {
  return (
    <div 
      className="border-2 border-dashed border-zinc-800 rounded-3xl p-16 text-center hover:border-orange-500 transition-colors bg-zinc-900/50 cursor-pointer"
      onClick={() => document.getElementById('uploader')?.click()}
    >
      <input 
        id="uploader" type="file" hidden multiple={multiple} accept=".pdf"
        onChange={(e) => onUpload(Array.from(e.target.files || []))}
      />
      <UploadCloud className="mx-auto mb-4 text-orange-500" size={48} />
      <h3 className="text-xl font-bold">Drop your PDFs here</h3>
      <p className="text-zinc-500">or click to browse from your device</p>
    </div>
  );
}
// components/pdf/DropZone.tsx
'use client';

import { useState, useRef } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

interface Props {
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
}

export default function DropZone({
  onUpload,
  multiple = false,
  accept = ".pdf",
  label = "Drop your PDFs here"
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    );

    if (droppedFiles.length > 0) {
      const newFiles = multiple ? [...selectedFiles, ...droppedFiles] : droppedFiles;
      setSelectedFiles(newFiles);
      onUpload(newFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).filter(file =>
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    );

    if (selected.length > 0) {
      const newFiles = multiple ? [...selectedFiles, ...selected] : selected;
      setSelectedFiles(newFiles);
      onUpload(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    onUpload(updated);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div
        className={`glass-panel border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 cursor-pointer group
          ${isDragging 
            ? 'border-[#22d3ee] bg-[#22d3ee]/5 scale-[1.02] shadow-2xl shadow-[#22d3ee]/20' 
            : 'border-zinc-700 hover:border-[#22d3ee]/70 hover:bg-zinc-900/30'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
        />

        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
          <UploadCloud 
            className={`transition-colors ${isDragging ? 'text-[#22d3ee]' : 'text-zinc-400 group-hover:text-[#22d3ee]'}`} 
            size={52} 
          />
        </div>

        <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
          {label}
        </h3>
        <p className="text-zinc-400 text-[15px]">
          or <span className="text-[#22d3ee] underline decoration-dotted">click to browse</span> from your device
        </p>

        <div className="mt-8 text-xs font-mono text-zinc-500 tracking-widest">
          ONLY PDF FILES • MAX 100MB PER FILE
        </div>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div 
              key={index}
              className="glass-panel flex items-center justify-between px-6 py-4 rounded-2xl border border-zinc-700 group"
            >
              <div className="flex items-center gap-4">
                <FileText className="text-[#22d3ee]" size={22} />
                <div className="truncate max-w-md">
                  <div className="text-white font-medium text-sm">{file.name}</div>
                  <div className="text-xs text-zinc-500 font-mono">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-zinc-500 hover:text-red-400 transition-colors p-2"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
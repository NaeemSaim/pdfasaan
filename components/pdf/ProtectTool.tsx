'use client';
import { useState } from 'react';
import { protectPDF } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, Shield, Lock, Eye, EyeOff } from 'lucide-react';

export default function ProtectTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProtect = async () => {
    if (!file || !password) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const protectedBytes = await protectPDF(bytes, password);
      
      const blob = new Blob([protectedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protected-${file.name}`;
      a.click();
    } catch (e) {
      alert("Failed to protect PDF.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-500/10 rounded-2xl text-red-500">
          <Shield size={24} />
        </div>
        <h2 className="text-3xl font-bold">Protect PDF</h2>
      </div>

      {!file ? (
        <DropZone onUpload={(files) => setFile(files[0])} />
      ) : (
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <p className="mb-6 text-zinc-400">Locking: <span className="text-white font-medium">{file.name}</span></p>
          
          <div className="mb-8 relative">
            <label className="block text-sm font-medium text-zinc-500 mb-2">Set Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password"
                className="w-full bg-black border border-zinc-800 rounded-xl p-4 pr-12 text-white focus:border-red-500 outline-none transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            onClick={handleProtect}
            disabled={isProcessing || !password}
            className="w-full bg-red-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <Lock size={18} /> {isProcessing ? 'Protecting...' : 'Lock & Download PDF'}
          </button>
        </div>
      )}
    </div>
  );
}
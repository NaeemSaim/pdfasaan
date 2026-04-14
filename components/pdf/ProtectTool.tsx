'use client';

import { useState } from 'react';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import DropZone from './DropZone';
import { protectPDF } from '@/lib/pdf-engine';

export default function ProtectTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleProtect = async () => {
    if (!file || !password || password.length < 4) {
      alert("Password must be at least 4 characters long.");
      return;
    }

    setIsProcessing(true);
    setIsDone(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const protectedBytes = await protectPDF(bytes, password);

      const blob = new Blob([protectedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `protected-${file.name}`;
      a.click();

      setIsDone(true);

      // Auto-hide success after 5 seconds
      setTimeout(() => setIsDone(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to encrypt PDF. The file might already be protected or corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-12 px-6">
      <div className="max-w-3xl mx-auto">
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
            <Shield className="text-red-400" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">PROTECT PDF</h1>
            <p className="text-red-400 text-xl mt-1">Military-grade encryption. Your file. Your rules.</p>
          </div>
        </div>

        {!file ? (
          <DropZone 
            onUpload={(files) => setFile(files[0])} 
            multiple={false}
            label="Drop PDF to add password protection"
          />
        ) : (
          <div className="glass-panel p-12 rounded-3xl space-y-10">
            {/* File Info */}
            <div className="flex items-center gap-5 bg-black/60 border border-red-900/50 rounded-2xl p-6">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <Lock className="text-red-400" size={28} />
              </div>
              <div className="min-w-0">
                <div className="text-white font-medium truncate">{file.name}</div>
                <div className="text-xs text-zinc-500 font-mono mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • WILL BE ENCRYPTED
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="flex gap-4 p-5 bg-red-950/30 border border-red-900/60 rounded-2xl text-sm text-red-300">
              <AlertTriangle className="shrink-0 mt-0.5" size={22} />
              <div>
                Once protected, <span className="text-red-400 font-medium">you will need this exact password</span> to open the PDF again.<br />
                There is no recovery option. Store it safely.
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block uppercase tracking-[3px] text-xs font-bold text-zinc-400 mb-3">
                ENCRYPTION PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a strong password (min 4 characters)"
                  className="w-full bg-black border border-zinc-800 focus:border-red-500 rounded-2xl px-7 py-6 text-lg text-white outline-none transition-all font-mono placeholder:text-zinc-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
              <p className="mt-3 text-xs text-zinc-500 font-mono">
                Recommended: 8+ characters with symbols and numbers
              </p>
            </div>

            {/* Protect Button */}
            <button
              onClick={handleProtect}
              disabled={isProcessing || !password || password.length < 4}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:from-zinc-800 disabled:to-zinc-700 text-white font-black py-7 rounded-2xl text-xl uppercase tracking-[2px] shadow-2xl shadow-red-600/40 transition-all flex items-center justify-center gap-4"
            >
              {isProcessing ? (
                <>ENCRYPTING FILE<span className="animate-pulse">...</span></>
              ) : (
                <>
                  <Lock size={26} /> LOCK PDF WITH PASSWORD
                </>
              )}
            </button>

            {/* Success Message */}
            {isDone && (
              <div className="flex items-center justify-center gap-3 py-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
                <Shield className="text-emerald-400" size={26} />
                PDF successfully encrypted • File downloaded
              </div>
            )}
          </div>
        )}

        <div className="mt-16 text-center text-xs font-mono text-zinc-600 tracking-widest">
          100% CLIENT-SIDE ENCRYPTION • PASSWORD NEVER LEAVES YOUR DEVICE
        </div>
      </div>
    </div>
  );
}
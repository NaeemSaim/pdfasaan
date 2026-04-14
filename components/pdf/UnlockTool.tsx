'use client';

import { useState } from 'react';
import { ArrowLeft, Unlock, Lock, ShieldAlert, Download, Eye, EyeOff } from 'lucide-react';
import DropZone from './DropZone';
import { unlockPDF } from '@/lib/pdf-engine';

export default function UnlockTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUnlock = async () => {
    if (!file || !password) return;

    setIsProcessing(true);
    setIsSuccess(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const unlockedBytes = await unlockPDF(bytes, password);

      const blob = new Blob([unlockedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `unlocked-${file.name}`;
      a.click();

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4500);

    } catch (error: any) {
      console.error(error);
      if (error.name === 'PasswordException' || error.message?.includes('password')) {
        alert("Incorrect password. The PDF could not be unlocked.");
      } else {
        alert("Failed to unlock PDF. The file might not be password-protected or is corrupted.");
      }
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
          className="group flex items-center gap-3 text-zinc-500 hover:text-emerald-400 mb-12 transition-all font-mono uppercase tracking-[3px] text-xs"
        >
          <div className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-emerald-400">
            <ArrowLeft size={18} />
          </div>
          BACK TO DASHBOARD
        </button>

        <div className="flex items-center gap-5 mb-12">
          <div className="p-5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-3xl">
            <Unlock className="text-emerald-400" size={42} />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter text-white">UNLOCK PDF</h1>
            <p className="text-emerald-400 text-xl mt-1">Remove password protection permanently</p>
          </div>
        </div>

        {!file ? (
          <DropZone 
            onUpload={(files) => setFile(files[0])} 
            multiple={false}
            label="Drop password-protected PDF to unlock"
          />
        ) : (
          <div className="glass-panel p-12 rounded-3xl space-y-10">
            {/* File Info + Warning */}
            <div className="flex gap-5 p-6 bg-red-950/30 border border-red-900/60 rounded-2xl">
              <ShieldAlert className="text-red-400 shrink-0 mt-1" size={28} />
              <div className="text-sm text-red-200/90">
                This PDF is encrypted.<br />
                Enter the correct password to permanently remove protection.
              </div>
            </div>

            {/* File Name */}
            <div className="flex items-center gap-4 bg-black/60 border border-emerald-900/50 rounded-2xl p-6">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                <Lock className="text-emerald-400" size={26} />
              </div>
              <div className="truncate">
                <div className="text-white font-medium">{file.name}</div>
                <div className="text-xs text-zinc-500 font-mono">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • ENCRYPTED FILE
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block uppercase tracking-[3px] text-xs font-bold text-zinc-400 mb-3">
                DECRYPTION PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the document password"
                  className="w-full bg-black border border-zinc-800 focus:border-emerald-500 rounded-2xl px-7 py-6 text-lg text-white outline-none transition-all font-mono placeholder:text-zinc-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>

            {/* Unlock Button */}
            <button
              onClick={handleUnlock}
              disabled={isProcessing || !password}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 disabled:from-zinc-700 disabled:to-zinc-600 text-black font-black py-7 rounded-2xl text-xl uppercase tracking-[2px] shadow-2xl shadow-emerald-500/40 transition-all flex items-center justify-center gap-4"
            >
              {isProcessing ? (
                <>DECRYPTING FILE<span className="animate-pulse">...</span></>
              ) : (
                <>
                  <Unlock size={26} /> REMOVE PASSWORD PROTECTION
                </>
              )}
            </button>

            {/* Success Message */}
            {isSuccess && (
              <div className="flex items-center justify-center gap-3 py-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-medium">
                <Download className="text-emerald-400" size={24} />
                PDF successfully unlocked • File downloaded
              </div>
            )}
          </div>
        )}

        <div className="mt-16 text-center text-xs font-mono text-zinc-600 tracking-widest">
          100% CLIENT-SIDE • PASSWORD NEVER LEAVES YOUR DEVICE
        </div>
      </div>
    </div>
  );
}
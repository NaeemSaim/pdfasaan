'use client';
import { useState } from 'react';
import { unlockPDF } from '@/lib/pdf-engine';
import DropZone from './DropZone';
import { ArrowLeft, Unlock, Lock, ShieldAlert, Download } from 'lucide-react';

export default function UnlockTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUnlock = async () => {
    if (!file || !password) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const unlockedBytes = await unlockPDF(bytes, password);
      
      const blob = new Blob([unlockedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `unlocked-${file.name}`;
      a.click();
      setIsSuccess(true);
    } catch (e) {
      alert("Incorrect password or the file is not encrypted.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
          <Unlock size={24} />
        </div>
        <h2 className="text-3xl font-bold italic text-white">Unlock PDF</h2>
      </div>

      {!file ? (
        <DropZone onUpload={(files) => setFile(files[0])} />
      ) : (
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
            <Lock className="text-emerald-500 shrink-0" size={20} />
            <div>
               <p className="text-sm font-bold text-white uppercase tracking-wider">{file.name}</p>
               <p className="text-xs text-zinc-500">Enter the password to remove encryption permanently.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-500 mb-2 uppercase tracking-widest font-bold">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter document password"
                className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-emerald-500 transition-all font-mono"
              />
            </div>

            <button 
              onClick={handleUnlock}
              disabled={isProcessing || !password}
              className="w-full bg-emerald-500 text-black font-black py-5 rounded-2xl hover:bg-emerald-400 transition-all uppercase tracking-widest shadow-lg shadow-emerald-500/20"
            >
              {isProcessing ? 'Decrypting...' : 'Remove Password'}
            </button>
          </div>

          {isSuccess && (
            <div className="flex items-center gap-2 text-emerald-500 justify-center font-bold text-sm">
              <Download size={16} /> Decrypted file downloaded successfully!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
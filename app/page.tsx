'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, RotateCw, Zap, Scissors, Shield, Type, Trash2, 
  ImageIcon, FileImage, Hash, ShieldCheck, GripVertical, 
  Coffee, ChevronRight
} from 'lucide-react';

// Tool Component Imports (Keep these as they are in your project)
import MergeTool from '@/components/pdf/MergeTool';
import RotateTool from '@/components/pdf/RotateTool';
import CompressTool from '@/components/pdf/CompressTool';
import SplitTool from '@/components/pdf/SplitTool';
import ProtectTool from '@/components/pdf/ProtectTool';
import WatermarkTool from '@/components/pdf/WatermarkTool';
import DeleteTool from '@/components/pdf/DeleteTool';
import PdfToImageTool from '@/components/pdf/PdfToImageTool';
import ImageToPdfTool from '@/components/pdf/ImageToPdfTool';
import PageNumberTool from '@/components/pdf/PageNumberTool';
import RedactTool from '@/components/pdf/RedactTool';
import OrganizerTool from '@/components/pdf/OrganizerTool';

type Tool = 'home' | 'merge' | 'rotate' | 'compress' | 'split' | 'protect' | 'watermark' | 'delete' | 'pdf2img' | 'img2pdf' | 'numbers' | 'redact' | 'organize';

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>('home');

  // Rendering Logic
  if (activeTool === 'merge') return <MergeTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'rotate') return <RotateTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'compress') return <CompressTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'split') return <SplitTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'protect') return <ProtectTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'watermark') return <WatermarkTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'delete') return <DeleteTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'pdf2img') return <PdfToImageTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'img2pdf') return <ImageToPdfTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'numbers') return <PageNumberTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'redact') return <RedactTool onBack={() => setActiveTool('home')} />;
  if (activeTool === 'organize') return <OrganizerTool onBack={() => setActiveTool('home')} />;

  const tools = [
    { id: 'merge', name: 'Merge', desc: 'Join multiple PDFs', icon: <LayoutGrid size={22} />, color: 'bg-cyan-500/10 text-cyan-400' },
    { id: 'compress', name: 'Compress', desc: 'Reduce file size', icon: <Zap size={22} />, color: 'bg-emerald-500/10 text-emerald-400' },
    { id: 'img2pdf', name: 'Images', desc: 'Photos to PDF', icon: <FileImage size={22} />, color: 'bg-blue-500/10 text-blue-400' },
    { id: 'organize', name: 'Organize', desc: 'Reorder pages', icon: <GripVertical size={22} />, color: 'bg-purple-500/10 text-purple-400' },
    { id: 'split', name: 'Split', desc: 'Extract pages', icon: <Scissors size={22} />, color: 'bg-orange-500/10 text-orange-400' },
    { id: 'protect', name: 'Security', desc: 'Add passwords', icon: <Shield size={22} />, color: 'bg-slate-500/10 text-slate-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Dynamic Nav - Uses standard Tailwind blur */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl px-6 py-3 flex justify-between items-center shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-bold tracking-tight text-white">PdfAsaan</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://buymeacoffee.com/yourusername" target="_blank" className="text-xs font-medium text-slate-400 hover:text-cyan-400">Support</a>
            <div className="h-4 w-px bg-slate-800" />
            <span className="text-[10px] font-mono text-slate-500 tracking-tighter">V2.0</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto pt-40 pb-20 px-6">
        {/* Clean Hero */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            PDF tools, <span className="text-slate-500">simplified.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
            Professional document handling directly in your browser. 
            No uploads, no servers, total privacy.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as Tool)}
              className="group p-6 bg-slate-900/50 border border-slate-800 rounded-3xl text-left hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-2xl ${tool.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-slate-500 mt-1">{tool.desc}</p>
            </button>
          ))}
        </div>

        {/* Security Badge */}
        <div className="mt-12 p-4 bg-slate-900/30 border border-slate-800 rounded-2xl flex items-center justify-center gap-3">
            <ShieldCheck size={16} className="text-cyan-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">100% Private Client-Side Processing</span>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-900 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/privacy" className="text-[10px] font-bold text-slate-600 hover:text-white uppercase tracking-widest">Privacy</Link>
          <Link href="/terms" className="text-[10px] font-bold text-slate-600 hover:text-white uppercase tracking-widest">Terms</Link>
        </div>
        <p className="text-[10px] font-mono text-slate-800 uppercase tracking-[0.4em]">© 2026 PDF ASAAN</p>
      </footer>
    </div>
  );
}
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, RotateCw, Zap, Scissors, Shield, Type, Trash2, 
  ImageIcon, FileImage, Hash, ShieldCheck, GripVertical, 
  Coffee 
} from 'lucide-react';

// Tool Component Imports
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

  // --- CONDITIONAL RENDERING ---
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
    { id: 'merge', name: 'Merge PDF', desc: 'Combine multiple files into one.', icon: <LayoutGrid size={28} />, category: 'primary' },
    { id: 'split', name: 'Split PDF', desc: 'Extract specific pages.', icon: <Scissors size={28} />, category: 'primary' },
    { id: 'compress', name: 'Compress', desc: 'Reduce file size efficiently.', icon: <Zap size={28} />, category: 'primary' },
    { id: 'img2pdf', name: 'Image to PDF', desc: 'Turn photos into a PDF.', icon: <FileImage size={28} />, category: 'secondary' },
    { id: 'pdf2img', name: 'PDF to Image', desc: 'Convert pages into JPGs.', icon: <ImageIcon size={28} />, category: 'secondary' },
    { id: 'organize', name: 'Organize', desc: 'Reorder or delete pages.', icon: <GripVertical size={28} />, category: 'secondary' },
    { id: 'rotate', name: 'Rotate PDF', desc: 'Fix page orientation.', icon: <RotateCw size={28} />, category: 'utility' },
    { id: 'protect', name: 'Protect', desc: 'Add password encryption.', icon: <Shield size={28} />, category: 'utility' },
    { id: 'watermark', name: 'Watermark', desc: 'Add text overlay.', icon: <Type size={28} />, category: 'utility' },
    { id: 'delete', name: 'Delete Pages', desc: 'Remove unwanted pages.', icon: <Trash2 size={28} />, category: 'utility' },
    { id: 'numbers', name: 'Page Numbers', desc: 'Add footer numbering.', icon: <Hash size={28} />, category: 'utility' },
    { id: 'redact', name: 'Redact PDF', desc: 'Blackout sensitive info.', icon: <ShieldCheck size={28} />, category: 'utility' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-orange-500/30">
      {/* 2026 Style Floating Header */}
      <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20">
              <span className="font-black text-black text-xl italic">A</span>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">PDF Asaan</span>
          </div>
          
          <a 
            href="https://www.buymeacoffee.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-full hover:bg-orange-600 transition-all duration-300 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-black">Support</span>
            <Coffee size={14} className="text-orange-500 group-hover:text-black" />
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        {/* Hero Section */}
        <div className="mb-20">
          <h1 className="text-7xl font-black mb-6 tracking-tighter italic leading-none">
            EVERYTHING <br /> <span className="text-orange-600">ASAAN.</span>
          </h1>
          <p className="text-zinc-500 text-xl max-w-2xl font-medium">
            Professional PDF tools without the clutter. No uploads. 
            <span className="text-zinc-300 ml-2">Secure browser-side processing.</span>
          </p>
        </div>

        {/* Tools Section Grouped by Importance */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-700">Primary Actions</h2>
            <div className="h-[1px] flex-grow bg-zinc-900"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as Tool)}
                className="group relative p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem] text-left hover:bg-orange-600 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative background number or icon */}
                <div className="absolute -right-4 -bottom-4 text-zinc-800/20 group-hover:text-black/10 transition-colors">
                   {tool.icon}
                </div>

                <div className="text-orange-600 mb-6 group-hover:text-black transition-colors duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-black transition-colors duration-300 tracking-tight">{tool.name}</h3>
                <p className="text-zinc-500 group-hover:text-black/70 transition-colors duration-300 text-sm font-medium">{tool.desc}</p>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Modern Minimal Footer */}
      <footer className="py-20 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-black text-zinc-800 uppercase tracking-[0.5em] mb-4">
                © 2026 PDF ASAAN
              </p>
              <p className="text-zinc-600 text-sm max-w-xs">
                Your files never touch our servers. Security by design.
              </p>
            </div>
            <div className="flex flex-wrap md:justify-end gap-x-8 gap-y-4">
              <Link href="/privacy" className="text-xs font-bold text-zinc-500 hover:text-orange-500 uppercase tracking-widest">Privacy</Link>
              <Link href="/terms" className="text-xs font-bold text-zinc-500 hover:text-orange-500 uppercase tracking-widest">Terms</Link>
              <Link href="/about" className="text-xs font-bold text-zinc-500 hover:text-orange-500 uppercase tracking-widest">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, RotateCw, Zap, Scissors, Shield, Type, Trash2, 
  ImageIcon, FileImage, Hash, ShieldCheck, GripVertical, 
  ChevronLeft, ChevronRight, Coffee 
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

// Expanded type to include all tools
type Tool = 'home' | 'merge' | 'rotate' | 'compress' | 'split' | 'protect' | 'watermark' | 'delete' | 'pdf2img' | 'img2pdf' | 'numbers' | 'redact' | 'organize';

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>('home');

  // --- CONDITIONAL RENDERING LOGIC ---
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
    { id: 'merge', name: 'Merge PDF', desc: 'Combine multiple files into one.', icon: <LayoutGrid />, color: 'text-orange-500' },
    { id: 'rotate', name: 'Rotate PDF', desc: 'Fix orientation of your pages.', icon: <RotateCw />, color: 'text-blue-500' },
    { id: 'compress', name: 'Compress', desc: 'Reduce file size efficiently.', icon: <Zap />, color: 'text-yellow-500' },
    { id: 'split', name: 'Split PDF', desc: 'Extract specific pages.', icon: <Scissors />, color: 'text-green-500' },
    { id: 'protect', name: 'Protect PDF', desc: 'Add password encryption.', icon: <Shield />, color: 'text-red-500' },
    { id: 'watermark', name: 'Watermark', desc: 'Add text overlay to pages.', icon: <Type />, color: 'text-purple-500' },
    { id: 'delete', name: 'Delete Pages', desc: 'Remove unwanted pages easily.', icon: <Trash2 />, color: 'text-red-500' },
    { id: 'pdf2img', name: 'PDF to Image', desc: 'Convert pages into JPG files.', icon: <ImageIcon />, color: 'text-pink-500' },
    { id: 'img2pdf', name: 'Image to PDF', desc: 'Turn photos into a PDF document.', icon: <FileImage />, color: 'text-blue-500' },
    { id: 'numbers', name: 'Page Numbers', desc: 'Add "Page X of Y" to footer.', icon: <Hash />, color: 'text-violet-500' },
    { id: 'redact', name: 'Redact PDF', desc: 'Blackout sensitive info.', icon: <ShieldCheck />, color: 'text-white' },
    { id: 'organize', name: 'Organize', desc: 'Reorder or delete pages.', icon: <GripVertical />, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top Support Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-end">
        <a 
          href="https://www.buymeacoffee.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-zinc-500 hover:text-orange-400 transition-all group"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Support Project</span>
          <div className="p-2 bg-zinc-900 rounded-xl group-hover:bg-orange-500/10 transition-colors">
            <Coffee size={16} />
          </div>
        </a>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl mx-auto py-10 px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-4 tracking-tighter italic text-white">PDF Asaan</h1>
          <p className="text-zinc-400 text-lg">Fast, local, and professional PDF management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as Tool)}
              className="group p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl text-left hover:border-orange-500/50 transition-all"
            >
              <div className={`${tool.color} mb-4 transform group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{tool.name}</h3>
              <p className="text-sm text-zinc-500">{tool.desc}</p>
            </button>
          ))}
        </div>
      </main>

      {/* Transparent Footer */}
      <footer className="mt-auto py-16 border-t border-zinc-900 bg-transparent w-full">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center gap-10 mb-6">
            <Link href="/about" className="text-xs font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-[0.2em]">
              About
            </Link>
            <Link href="/privacy" className="text-xs font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-[0.2em]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-[0.2em]">
              Terms of Service
            </Link>
            <a 
              href="https://www.buymeacoffee.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold text-orange-500/80 hover:text-orange-400 transition-all uppercase tracking-[0.2em]"
            >
              Support
            </a>
          </div>
          
          <p className="text-[10px] text-zinc-800 font-mono uppercase tracking-[0.4em]">
            © 2026 PDF ASAAN • SECURE BROWSER-BASED PROCESSING
          </p>
        </div>
      </footer>
    </div>
  );
}
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, RotateCw, Zap, Scissors, Shield, Type, Trash2, 
  ImageIcon, FileImage, Hash, ShieldCheck, GripVertical, 
  Coffee, ChevronRight 
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

  // Hardcoded Style Tokens (Ensures 2026 look regardless of Tailwind config)
  const theme = {
    bg: '#020617',
    card: 'rgba(30, 41, 59, 0.4)',
    border: 'rgba(255, 255, 255, 0.08)',
    accent: '#22d3ee',
    textMain: '#f8fafc',
    textDim: '#94a3b8'
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: theme.bg,
    minHeight: '100vh',
    color: theme.textMain,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '140px 24px 60px 24px',
    transition: 'all 0.3s ease'
  };

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '800px',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: `1px solid ${theme.border}`,
    borderRadius: '20px',
    padding: '14px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '1100px',
    margin: '48px auto 0 auto'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: '24px',
    padding: '32px',
    textAlign: 'left',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
    display: 'flex',
    flexDirection: 'column'
  };

  const tools = [
    { id: 'merge', name: 'Merge PDF', desc: 'Combine multiple files into one.', icon: <LayoutGrid size={24} />, color: '#06b6d4' },
    { id: 'split', name: 'Split PDF', desc: 'Extract specific pages or ranges.', icon: <Scissors size={24} />, color: '#f97316' },
    { id: 'compress', name: 'Compress', desc: 'Reduce file size without quality loss.', icon: <Zap size={24} />, color: '#10b981' },
    { id: 'img2pdf', name: 'Image to PDF', desc: 'Convert JPG/PNG to document.', icon: <FileImage size={24} />, color: '#3b82f6' },
    { id: 'pdf2img', name: 'PDF to Image', desc: 'Turn PDF pages into JPG images.', icon: <ImageIcon size={24} />, color: '#ec4899' },
    { id: 'organize', name: 'Organize', desc: 'Reorder or delete pages visually.', icon: <GripVertical size={24} />, color: '#a855f7' },
    { id: 'rotate', name: 'Rotate', desc: 'Fix orientation of your pages.', icon: <RotateCw size={24} />, color: '#6366f1' },
    { id: 'protect', name: 'Security', desc: 'Add password encryption.', icon: <Shield size={24} />, color: '#94a3b8' },
    { id: 'watermark', name: 'Watermark', desc: 'Add text or image overlay.', icon: <Type size={24} />, color: '#0ea5e9' },
    { id: 'delete', name: 'Delete Pages', desc: 'Easily remove specific pages.', icon: <Trash2 size={24} />, color: '#ef4444' },
    { id: 'numbers', name: 'Page Numbers', desc: 'Add numbering to footer.', icon: <Hash size={24} />, color: '#f59e0b' },
    { id: 'redact', name: 'Redact', desc: 'Blackout sensitive information.', icon: <ShieldCheck size={24} />, color: '#ffffff' },
  ];

  // --- RENDERING LOGIC ---
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

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#0891b2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#000', fontStyle: 'italic' }}>A</div>
          <span style={{ fontWeight: '800', fontSize: '18px', letterSpacing: '-0.5px' }}>PdfAsaan</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="https://buymeacoffee.com/yourusername" target="_blank" style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: theme.textDim, textDecoration: 'none' }}>Support</a>
          <div style={{ width: '1px', height: '16px', backgroundColor: theme.border }}></div>
          <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#0891b2' }}>STABLE V2.0</span>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: '1', marginBottom: '20px' }}>
            Document handling, <br/>
            <span style={{ color: theme.textDim }}>made truly effortless.</span>
          </h1>
          <p style={{ fontSize: '19px', color: theme.textDim, maxWidth: '600px', lineHeight: '1.6' }}>
            Professional-grade PDF tools running entirely in your browser. No uploads, no servers, 100% private.
          </p>
        </header>

        <div style={gridStyle}>
          {tools.map((tool) => (
            <button 
              key={tool.id} 
              onClick={() => setActiveTool(tool.id as Tool)}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.6)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.card;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: `${tool.color}15`, color: tool.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                {tool.icon}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{tool.name}</h3>
                <ChevronRight size={18} color={theme.textDim} />
              </div>
              <p style={{ fontSize: '14px', color: theme.textDim, margin: 0, lineHeight: '1.5' }}>{tool.desc}</p>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '80px', padding: '30px', border: `1px solid ${theme.border}`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <ShieldCheck size={20} color="#22d3ee" />
          <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: '#64748b' }}>
            End-to-End Privacy: Files never leave your device
          </span>
        </div>
      </div>

      <footer style={{ marginTop: '100px', paddingBottom: '40px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px' }}>
          <Link href="/privacy" style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: theme.textDim, textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: theme.textDim, textDecoration: 'none' }}>Terms</Link>
          <Link href="/about" style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: theme.textDim, textDecoration: 'none' }}>About</Link>
        </div>
        <p style={{ fontSize: '10px', fontFamily: 'monospace', color: '#334155', letterSpacing: '4px' }}>© 2026 PDF ASAAN • OPEN SOURCE UTILITY</p>
      </footer>
    </div>
  );
}
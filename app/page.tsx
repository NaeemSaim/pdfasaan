'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  LayoutGrid, RotateCw, Zap, Scissors, Shield, Type, Trash2,
  ImageIcon, FileImage, Hash, ShieldCheck, GripVertical,
  Coffee, ChevronRight, Sparkles
} from 'lucide-react';

// Tool Imports
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

type Tool = 'home' | 'merge' | 'rotate' | 'compress' | 'split' | 'protect' | 
           'watermark' | 'delete' | 'pdf2img' | 'img2pdf' | 'numbers' | 
           'redact' | 'organize';

const toolComponents: Record<Exclude<Tool, 'home'>, React.ComponentType<{ onBack: () => void }>> = {
  merge: MergeTool,
  rotate: RotateTool,
  compress: CompressTool,
  split: SplitTool,
  protect: ProtectTool,
  watermark: WatermarkTool,
  delete: DeleteTool,
  pdf2img: PdfToImageTool,
  img2pdf: ImageToPdfTool,
  numbers: PageNumberTool,
  redact: RedactTool,
  organize: OrganizerTool,
};

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>('home');
  const [devMode, setDevMode] = useState(false);
  const [recentTools, setRecentTools] = useState<string[]>([]);

  // 2026 Cyberpunk Theme
  const theme = {
    bg: '#020617',
    card: 'rgba(30, 41, 59, 0.45)',
    border: 'rgba(255, 255, 255, 0.06)',
    accent: '#22d3ee',
    accentGlow: '#67e8f9',
    textMain: '#f8fafc',
    textDim: '#94a3b8',
    success: '#22c55e'
  };

  // Keyboard shortcut for Devil Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setDevMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save recent tools
  const handleToolSelect = useCallback((toolId: Tool) => {
    if (toolId === 'home') return;
    
    setActiveTool(toolId);
    
    setRecentTools(prev => {
      const filtered = prev.filter(id => id !== toolId);
      return [toolId, ...filtered].slice(0, 4);
    });
  }, []);

  const handleBack = () => {
    setActiveTool('home');
  };

  // Dynamic styles based on devMode
  const containerStyle: React.CSSProperties = {
    backgroundColor: devMode ? '#0a0a0a' : theme.bg,
    minHeight: '100vh',
    color: theme.textMain,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '140px 24px 80px 24px',
    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '820px',
    backgroundColor: devMode ? 'rgba(20, 20, 20, 0.95)' : 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${devMode ? '#450a0a' : theme.border}`,
    borderRadius: '9999px',
    padding: '14px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    boxShadow: devMode 
      ? '0 0 40px -10px #ef4444' 
      : '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    maxWidth: '1180px',
    margin: '60px auto 0 auto'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: devMode ? 'rgba(30, 10, 10, 0.6)' : theme.card,
    border: `1px solid ${devMode ? '#7f1d1d' : theme.border}`,
    borderRadius: '28px',
    padding: '36px 32px',
    textAlign: 'left',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 30px -15px rgba(0,0,0,0.5)'
  };

  const tools = [
    { id: 'merge', name: 'Merge PDF', desc: 'Combine multiple PDFs into one powerful document.', icon: <LayoutGrid size={26} />, color: '#06b6d4' },
    { id: 'split', name: 'Split PDF', desc: 'Extract pages or ranges with surgical precision.', icon: <Scissors size={26} />, color: '#f97316' },
    { id: 'compress', name: 'Compress PDF', desc: 'Shrink file size without losing a single pixel.', icon: <Zap size={26} />, color: '#10b981' },
    { id: 'img2pdf', name: 'Image to PDF', desc: 'Turn images into clean, professional PDFs.', icon: <FileImage size={26} />, color: '#3b82f6' },
    { id: 'pdf2img', name: 'PDF to Images', desc: 'Extract every page as high-quality JPG/PNG.', icon: <ImageIcon size={26} />, color: '#ec4899' },
    { id: 'organize', name: 'Organize Pages', desc: 'Drag, drop, reorder like a god.', icon: <GripVertical size={26} />, color: '#a855f7' },
    { id: 'rotate', name: 'Rotate Pages', desc: 'Fix upside-down chaos in seconds.', icon: <RotateCw size={26} />, color: '#6366f1' },
    { id: 'protect', name: 'Password Protect', desc: 'Military-grade encryption.', icon: <Shield size={26} />, color: '#64748b' },
    { id: 'watermark', name: 'Watermark', desc: 'Stamp your authority on every page.', icon: <Type size={26} />, color: '#0ea5e9' },
    { id: 'delete', name: 'Delete Pages', desc: 'Remove the weak pages mercilessly.', icon: <Trash2 size={26} />, color: '#ef4444' },
    { id: 'numbers', name: 'Page Numbers', desc: 'Add elegant numbering automatically.', icon: <Hash size={26} />, color: '#f59e0b' },
    { id: 'redact', name: 'Redact', desc: 'Blackout sensitive data like a pro.', icon: <ShieldCheck size={26} />, color: '#ffffff' },
  ];

  const ActiveToolComponent = activeTool !== 'home' 
    ? toolComponents[activeTool as Exclude<Tool, 'home'>] 
    : null;

  if (ActiveToolComponent) {
    return <ActiveToolComponent onBack={handleBack} />;
  }

  return (
    <div style={containerStyle}>
      {/* Subtle background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.08) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Navigation */}
      <nav style={navStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: devMode ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, #0891b2, #22d3ee)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '22px',
            color: '#000',
            boxShadow: devMode ? '0 0 20px #ef4444' : '0 0 20px #22d3ee',
            transition: 'all 0.4s ease'
          }}>
            A
          </div>
          <div>
            <span style={{ fontWeight: '900', fontSize: '21px', letterSpacing: '-0.6px' }}>PdfAsaan</span>
            {devMode && <span style={{ fontSize: '10px', color: '#ef4444', marginLeft: '8px', verticalAlign: 'super' }}>DEVIL MODE</span>}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a 
            href="https://buymeacoffee.com/yourusername" 
            target="_blank"
            style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              color: theme.textDim,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Coffee size={14} /> Support
          </a>
          <div style={{ width: '1px', height: '18px', backgroundColor: theme.border }} />
          <span style={{ 
            fontSize: '10px', 
            fontFamily: 'monospace', 
            color: devMode ? '#ef4444' : '#22d3ee',
            letterSpacing: '2px'
          }}>
            STABLE V2.1 — 2026
          </span>
        </div>
      </nav>

      <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <header style={{ marginBottom: '72px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'rgba(255,255,255,0.03)', 
              padding: '6px 18px', 
              borderRadius: '9999px',
              border: `1px solid ${theme.border}`
            }}>
              <Sparkles size={16} color={theme.accent} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: theme.accent, letterSpacing: '3px' }}>
                CLIENT-SIDE • ZERO UPLOADS
              </span>
            </div>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(42px, 9vw, 78px)', 
            fontWeight: '900', 
            letterSpacing: '-0.05em', 
            lineHeight: '1.05',
            marginBottom: '24px'
          }}>
            Document warfare,<br />
            <span style={{ color: theme.textDim }}>made brutally simple.</span>
          </h1>

          <p style={{ 
            fontSize: '19.5px', 
            color: theme.textDim, 
            maxWidth: '620px', 
            margin: '0 auto',
            lineHeight: '1.65'
          }}>
            Professional PDF tools that run entirely in your browser.<br />
            No servers. No tracking. No mercy.
          </p>
        </header>

        {/* Recent Tools */}
        {recentTools.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '15px', color: theme.textDim, marginBottom: '18px', letterSpacing: '1px' }}>
              RECENTLY SUMMONED
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {recentTools.map((toolId) => {
                const tool = tools.find(t => t.id === toolId);
                if (!tool) return null;
                return (
                  <button
                    key={toolId}
                    onClick={() => handleToolSelect(toolId as Tool)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${theme.border}`,
                      padding: '10px 20px',
                      borderRadius: '9999px',
                      fontSize: '14px',
                      color: theme.textDim,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}
                  >
                    {tool.icon}
                    {tool.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tools Grid */}
        <div style={gridStyle}>
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool.id as Tool)}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.borderColor = tool.color;
                e.currentTarget.style.boxShadow = `0 20px 40px -15px ${tool.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = devMode ? '#7f1d1d' : theme.border;
                e.currentTarget.style.boxShadow = '0 10px 30px -15px rgba(0,0,0,0.5)';
              }}
            >
              <div style={{
                width: '58px',
                height: '58px',
                borderRadius: '16px',
                backgroundColor: `${tool.color}15`,
                color: tool.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '28px',
                transition: 'all 0.3s ease'
              }}>
                {tool.icon}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ 
                  fontSize: '21px', 
                  fontWeight: '700', 
                  margin: 0,
                  lineHeight: '1.2'
                }}>
                  {tool.name}
                </h3>
                <ChevronRight size={20} color={theme.textDim} />
              </div>

              <p style={{ 
                fontSize: '14.5px', 
                color: theme.textDim, 
                margin: 0, 
                lineHeight: '1.55' 
              }}>
                {tool.desc}
              </p>

              <div style={{
                marginTop: 'auto',
                paddingTop: '24px',
                borderTop: `1px solid ${theme.border}`,
                fontSize: '11px',
                color: theme.accent,
                fontWeight: '600',
                letterSpacing: '1px',
                opacity: 0.7
              }}>
                IN-BROWSER • INSTANT
              </div>
            </button>
          ))}
        </div>

        {/* Privacy Statement */}
        <div style={{
          marginTop: '100px',
          padding: '32px 40px',
          border: `1px solid ${devMode ? '#450a0a' : theme.border}`,
          borderRadius: '28px',
          backgroundColor: devMode ? 'rgba(30,10,10,0.4)' : 'rgba(255,255,255,0.015)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '720px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <ShieldCheck size={28} color={devMode ? '#ef4444' : theme.accent} />
          <div>
            <span style={{ 
              fontSize: '13px', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '2.5px',
              color: devMode ? '#fca5a5' : '#64748b'
            }}>
              END-TO-END PRIVACY
            </span>
            <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: theme.textDim }}>
              Every file stays on your device. We don’t want your data. We don’t even look at it.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: '140px',
        paddingBottom: '60px',
        textAlign: 'center',
        color: '#334155'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '32px', 
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          <Link href="/privacy" style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1px', color: theme.textDim, textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1px', color: theme.textDim, textDecoration: 'none' }}>Terms</Link>
          <Link href="/about" style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1px', color: theme.textDim, textDecoration: 'none' }}>About</Link>
          <Link href="/changelog" style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1px', color: theme.textDim, textDecoration: 'none' }}>Changelog</Link>
        </div>
        <p style={{ 
          fontSize: '10px', 
          fontFamily: 'monospace', 
          letterSpacing: '4px',
          color: '#1e2937'
        }}>
          © 2026 PDF ASAAN • BUILT TO DESTROY ADOBE'S MONOPOLY
        </p>
      </footer>
    </div>
  );
}
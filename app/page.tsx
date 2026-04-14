'use client';
import React from 'react';
import { Hammer, ShieldCheck, Mail } from 'lucide-react';

export default function Home() {
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    textAlign: 'center'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: '32px',
    padding: '48px 32px',
    maxWidth: '500px',
    width: '100%',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div style={containerStyle}>
      {/* Small Logo Mark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
        <div style={{ width: '28px', height: '28px', backgroundColor: '#0891b2', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#000', fontSize: '14px' }}>A</div>
        <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.5px' }}>PdfAsaan</span>
      </div>

      <div style={cardStyle}>
        <div style={{ 
          width: '64px', 
          height: '64px', 
          backgroundColor: 'rgba(34, 211, 238, 0.1)', 
          borderRadius: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 24px auto',
          color: theme.accent
        }}>
          <Hammer size={32} />
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Under Maintenance
        </h1>
        
        <p style={{ color: theme.textDim, fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
          We're upgrading PdfAsaan to provide a faster, more secure document experience. We'll be back shortly.
        </p>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px', 
          color: '#475569',
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          <ShieldCheck size={16} color="#22d3ee" />
          Privacy First Architecture
        </div>
      </div>

      <footer style={{ marginTop: '40px' }}>
         <a 
          href="mailto:support@pdfasaan.com" 
          style={{ 
            color: theme.textDim, 
            textDecoration: 'none', 
            fontSize: '14px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            opacity: 0.8
          }}
        >
          <Mail size={16} /> Contact Support
        </a>
      </footer>
    </div>
  );
}
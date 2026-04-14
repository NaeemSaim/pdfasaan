'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, ServerOff, Globe, Database, EyeOff, Lock, Zap } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-zinc-400 py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="bg-glow" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <Link 
          href="/"
          className="group flex items-center gap-3 text-zinc-500 hover:text-[#22d3ee] mb-20 transition-all duration-300 font-mono uppercase tracking-[3px] text-xs"
        >
          <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-[#22d3ee] transition-colors">
            <ArrowLeft size={18} />
          </div>
          BACK TO DASHBOARD
        </Link>

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <ShieldCheck className="text-[#22d3ee]" size={42} />
            <span className="font-mono text-xs tracking-[4px] text-[#22d3ee] uppercase">SECURITY BY DESIGN</span>
          </div>

          <h1 className="text-[88px] leading-none font-black text-white tracking-tighter mb-4">
            PRIVACY <span className="text-[#22d3ee]">POLICY</span>
          </h1>
          
          <p className="font-mono text-sm text-zinc-500 tracking-widest">
            DOCUMENT REFERENCE: PA-PP-2026-REV1 • LAST UPDATED: APRIL 2026
          </p>
        </div>

        <div className="space-y-24 text-[17px] leading-relaxed">
          {/* Introduction */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-white tracking-tight border-b border-zinc-800 pb-6">
              1. WE DON’T WANT YOUR DATA
            </h2>
            <p className="max-w-3xl">
              PDF Asaan was built with one non-negotiable rule: 
              <strong className="text-white">your files never leave your device.</strong> 
              This entire privacy policy exists because we chose to make privacy the default, not a marketing gimmick.
            </p>
          </section>

          {/* Zero-Server Processing - Hero Section */}
          <section className="glass-panel p-12 rounded-3xl border border-emerald-900/50">
            <div className="flex items-center gap-4 mb-8">
              <ServerOff className="text-emerald-400" size={36} />
              <h2 className="text-4xl font-bold text-white tracking-tighter">2. ZERO-SERVER PROCESSING</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="space-y-3">
                <div className="text-emerald-400 text-5xl font-black">01</div>
                <p className="text-white">No file is ever uploaded</p>
              </div>
              <div className="space-y-3">
                <div className="text-emerald-400 text-5xl font-black">02</div>
                <p className="text-white">Everything runs locally via WebAssembly + PDF.js</p>
              </div>
              <div className="space-y-3">
                <div className="text-emerald-400 text-5xl font-black">03</div>
                <p className="text-white">Data dies when you close the tab</p>
              </div>
            </div>
          </section>

          {/* Data Categories */}
          <section>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-10">3. WHAT WE COLLECT (SPOILER: ALMOST NOTHING)</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-panel p-10 rounded-3xl cyan-shadow-hover">
                <div className="flex items-center gap-4 mb-6">
                  <Lock className="text-[#22d3ee]" size={32} />
                  <h3 className="text-2xl font-semibold text-white">Your Documents</h3>
                </div>
                <p className="text-zinc-300">
                  We do not read, store, analyze, or transmit any content inside your PDFs or images. 
                  The bytes stay inside your browser. Period.
                </p>
              </div>

              <div className="glass-panel p-10 rounded-3xl cyan-shadow-hover">
                <div className="flex items-center gap-4 mb-6">
                  <EyeOff className="text-[#22d3ee]" size={32} />
                  <h3 className="text-2xl font-semibold text-white">Personal Information</h3>
                </div>
                <p className="text-zinc-300">
                  No accounts. No emails. No names. No phone numbers. 
                  You are completely anonymous. We literally cannot identify you.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Infrastructure */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <Globe className="text-sky-400" size={32} />
              <h2 className="text-4xl font-bold text-white tracking-tighter">4. THIRD-PARTY INFRASTRUCTURE</h2>
            </div>
            
            <div className="prose prose-invert max-w-none text-zinc-300">
              <p>We only use infrastructure that never touches your documents:</p>
              <ul className="space-y-6 mt-8">
                <li className="flex gap-6">
                  <div className="shrink-0 w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center text-sky-400">C</div>
                  <div>
                    <strong className="text-white">Cloudflare</strong> — Provides global CDN, DDoS protection, and basic edge security. 
                    They may log standard HTTP request data (IP, User-Agent) for abuse prevention, but they never see your PDF content.
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="shrink-0 w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center text-sky-400">U</div>
                  <div>
                    <strong className="text-white">Unpkg / CDNs</strong> — Used only to deliver JavaScript libraries (like PDF.js). 
                    These providers see that you requested a library file, nothing more.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section className="glass-panel p-12 rounded-3xl bg-gradient-to-br from-zinc-950 to-black border border-red-900/30">
            <div className="flex items-center gap-4 mb-8">
              <Database className="text-red-400" size={36} />
              <h2 className="text-4xl font-bold text-white tracking-tighter">5. DATA RETENTION POLICY</h2>
            </div>
            <p className="text-2xl text-white leading-tight">
              Our retention policy is simple:<br />
              <span className="text-red-400 font-black">ZERO.</span>
            </p>
            <p className="mt-6 text-lg">
              Your processed files exist only in your browser’s temporary memory (RAM). 
              As soon as you close the tab or refresh the page, everything is gone. 
              We maintain no databases. We keep no backups. We don’t even want the capability.
            </p>
          </section>

          {/* Final Statement */}
          <div className="pt-16 border-t border-zinc-800 text-center">
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              We built PDF Asaan because we were tired of tools that treat your documents like their property.<br /><br />
              Here, your files are yours. Always.
            </p>
            
            <div className="mt-12 text-xs font-mono text-zinc-600 tracking-widest">
              QUESTIONS? OPEN AN ISSUE ON THE OFFICIAL REPOSITORY.<br />
              WE ACTUALLY READ THEM.
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-zinc-900 text-xs font-mono tracking-[3px] text-zinc-600 flex flex-col md:flex-row justify-between gap-4">
          <div>PDF ASAAN • PRIVACY FIRST • 2026</div>
          <div>NO COOKIES • NO TRACKING • NO BULLSHIT</div>
        </footer>
      </div>
    </div>
  );
}
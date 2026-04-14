'use client';

import Link from 'next/link';
import { ArrowLeft, Zap, Infinity, Shield, Code2, Coffee, Rocket, Sparkles } from 'lucide-react';

export default function AboutPage() {
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

        {/* Hero Title */}
        <div className="mb-24">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full mb-8">
            <Sparkles className="text-[#22d3ee]" size={18} />
            <span className="text-xs font-bold tracking-[4px] text-zinc-400">EST. 2026</span>
          </div>

          <h1 className="text-[92px] leading-none font-black text-white tracking-tighter mb-6">
            PDF <span className="text-[#22d3ee]">ASAAN</span>
          </h1>

          <p className="text-3xl text-zinc-300 font-light max-w-2xl tracking-tight">
            Document warfare,<br />made brutally simple.
          </p>
        </div>

        <div className="space-y-24">
          {/* Philosophy */}
          <section className="space-y-8">
            <div className="uppercase text-xs font-black tracking-[4px] text-[#22d3ee]">THE MANIFESTO</div>
            
            <h2 className="text-5xl font-bold text-white leading-tight tracking-tighter">
              We built the PDF tool<br />we always wanted.
            </h2>

            <div className="max-w-3xl text-lg leading-relaxed text-zinc-300">
              The web is bloated with slow, ad-riddled, privacy-violating PDF tools. 
              Most of them spy on you, limit you, or try to sell you bullshit subscriptions.
            </div>
            
            <div className="max-w-3xl text-lg leading-relaxed text-zinc-300">
              <strong className="text-white">PDF Asaan</strong> is different. 
              Everything runs in your browser. No uploads. No tracking. No corporate cock in your files.
              "Asaan" means easy — and we deliver exactly that.
            </div>
          </section>

          {/* Core Pillars */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel p-10 rounded-3xl space-y-6 cyan-shadow-hover group">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <h4 className="text-2xl font-semibold text-white">Instant. No Login.</h4>
              <p className="text-zinc-400">
                Open the site and start working in under a second. 
                We don’t want your email, your data, or your soul.
              </p>
            </div>

            <div className="glass-panel p-10 rounded-3xl space-y-6 cyan-shadow-hover group">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <Infinity size={32} />
              </div>
              <h4 className="text-2xl font-semibold text-white">Truly Unlimited</h4>
              <p className="text-zinc-400">
                Process 1 file or 10,000 files. Since everything happens locally, 
                there are no server costs. No limits. Ever.
              </p>
            </div>

            <div className="glass-panel p-10 rounded-3xl space-y-6 cyan-shadow-hover group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Shield size={32} />
              </div>
              <h4 className="text-2xl font-semibold text-white">Zero Tracking</h4>
              <p className="text-zinc-400">
                Your files never leave your device. 
                We can’t see them. We don’t want to. End of story.
              </p>
            </div>

            <div className="glass-panel p-10 rounded-3xl space-y-6 cyan-shadow-hover group">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                <Code2 size={32} />
              </div>
              <h4 className="text-2xl font-semibold text-white">Built Different</h4>
              <p className="text-zinc-400">
                Next.js + WebAssembly + pure client-side magic. 
                Fast, secure, and designed to outlive every bloated SaaS tool.
              </p>
            </div>
          </div>

          {/* Support Section - Evil Edition */}
          <div className="glass-panel p-14 rounded-[3rem] text-center border border-zinc-700/50">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center">
                <Coffee className="text-orange-400" size={48} />
              </div>
            </div>

            <h3 className="text-4xl font-black text-white tracking-tighter mb-4">
              Keep the fire alive
            </h3>

            <p className="max-w-lg mx-auto text-zinc-400 text-[17px] leading-relaxed">
              By running everything in the browser, we killed server costs and ads.<br />
              If PdfAsaan has saved you time and frustration, throw a few bucks our way.<br />
              Every donation helps us stay independent and keep this tool free forever.
            </p>

            <a
              href="https://www.buymeacoffee.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black uppercase tracking-[2px] text-sm px-12 py-5 rounded-2xl transition-all hover:scale-105 shadow-xl shadow-orange-500/30"
            >
              BUY US A COFFEE <Rocket size={22} />
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono tracking-[3px] text-zinc-600">
          <div>
            PDF ASAAN • V2.1 • 2026
          </div>
          <div className="text-center md:text-right">
            BUILT TO MAKE ADOBE CRY • OPEN SOURCE ENERGY
          </div>
        </footer>
      </div>
    </div>
  );
}
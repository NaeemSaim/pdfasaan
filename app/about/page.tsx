'use client';
import Link from 'next/link';
import { ArrowLeft, Zap, Infinity, Shield, UserX, Rocket, Coffee, Code2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-400 py-24 px-6 leading-relaxed">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-zinc-600 hover:text-white mb-16 transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <section className="mb-24">
          <h1 className="text-7xl font-black text-white mb-6 italic tracking-tighter">
            PDF <span className="text-zinc-500">ASAAN</span>
          </h1>
          <p className="text-2xl text-zinc-300 font-light max-w-2xl">
            A high-performance document suite built for speed, privacy, and absolute simplicity.
          </p>
        </section>

        <div className="grid gap-20">
          {/* Mission Statement */}
          <section className="space-y-6">
            <h2 className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">The Philosophy</h2>
            <h3 className="text-3xl font-bold text-white">Why "Asaan"?</h3>
            <p className="text-lg">
              The internet is filled with PDF tools that are slow, cluttered with ads, or hidden behind expensive paywalls. 
              <strong> PDF Asaan</strong> was built to change that. "Asaan" means easy—and that is exactly what we deliver. 
              No accounts, no subscriptions, and no complicated menus.
            </p>
          </section>

          {/* Core Pillars Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4">
              <Zap className="text-yellow-500" size={32} />
              <h4 className="text-xl font-bold text-white">No Registration</h4>
              <p className="text-sm">We don't want your email, your name, or your data. Just open the site and start working instantly. Your time is valuable.</p>
            </div>
            
            <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4">
              <Infinity className="text-blue-500" size={32} />
              <h4 className="text-xl font-bold text-white">Unlimited Usage</h4>
              <p className="text-sm">Because we process everything in your browser, there are no "server costs" per file. You can process 1,000 files for free.</p>
            </div>

            <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4">
              <Shield className="text-emerald-500" size={32} />
              <h4 className="text-xl font-bold text-white">100% Ad-Free</h4>
              <p className="text-sm">A professional environment should be clean. We prioritize your user experience over ad revenue.</p>
            </div>

            <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4">
              <Code2 className="text-violet-500" size={32} />
              <h4 className="text-xl font-bold text-white">Modern Tech</h4>
              <p className="text-sm">Built with Next.js and WebAssembly to ensure your documents are handled with military-grade precision.</p>
            </div>
          </div>

          {/* Transparency & Support Section */}
<section className="bg-zinc-900/20 p-10 rounded-[3rem] border border-zinc-800 text-center space-y-6">
  <div className="flex justify-center mb-2">
    <Coffee className="text-orange-400" size={40} />
  </div>
  <h3 className="text-2xl font-bold text-white italic">Support PDF Asaan</h3>
  <p className="max-w-xl mx-auto text-zinc-500 text-sm leading-relaxed">
    By processing files directly on your device, we eliminate server costs and intrusive ads. 
    If this tool has helped your workflow, consider a voluntary donation to help cover 
    domain hosting and ongoing development. Every bit of support helps keep this 
    project independent and free for everyone.
  </p>
  <div className="pt-4">
    <a 
      href="https://www.buymeacoffee.com/yourusername" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-orange-500 text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-400 hover:scale-105 transition-all shadow-lg shadow-orange-500/20"
    >
      Support the Project <Rocket size={18} />
    </a>
  </div>
</section>
        </div>

        <footer className="mt-20 pt-10 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-600">
          <span>v1.2.0 Stable Build</span>
          <span>Crafted for Professionals</span>

        </footer>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldAlert, Gavel, Scale, AlertTriangle, FileCheck, Zap } from 'lucide-react';

export default function TermsPage() {
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
            <Gavel className="text-[#22d3ee]" size={42} />
            <span className="font-mono text-xs tracking-[4px] text-[#22d3ee] uppercase">LEGAL ARMOR</span>
          </div>

          <h1 className="text-[88px] leading-none font-black text-white tracking-tighter mb-4">
            TERMS OF <span className="text-[#22d3ee]">SERVICE</span>
          </h1>
          
          <p className="font-mono text-sm text-zinc-500 tracking-widest">
            AGREEMENT VERSION: 1.0.4-2026 • EFFECTIVE APRIL 2026
          </p>
        </div>

        <div className="space-y-24 text-[17px] leading-relaxed">
          {/* Binding Agreement */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-white tracking-tight border-b border-zinc-800 pb-6 flex items-center gap-4">
              1. BINDING AGREEMENT
            </h2>
            <p className="max-w-3xl">
              By using PDF Asaan, you are entering a binding agreement with the developer. 
              You acknowledge that you have read, understood, and agree to these terms. 
              If you are using this on behalf of a company, you represent that you have the authority to bind that entity.
            </p>
          </section>

          {/* Acceptable Use - Warning Section */}
          <section className="glass-panel p-12 rounded-3xl border border-red-900/50 bg-gradient-to-br from-zinc-950 to-black">
            <div className="flex items-center gap-4 mb-10">
              <ShieldAlert className="text-red-400" size={36} />
              <h2 className="text-4xl font-bold text-white tracking-tighter">2. ACCEPTABLE USE POLICY</h2>
            </div>
            
            <p className="mb-8 text-zinc-300">
              You agree not to use PDF Asaan for any illegal, harmful, or prohibited activities, including:
            </p>
            
            <ul className="space-y-6 text-zinc-300">
              <li className="flex gap-5">
                <div className="shrink-0 text-red-400 mt-1">●</div>
                Processing forged government documents or IDs
              </li>
              <li className="flex gap-5">
                <div className="shrink-0 text-red-400 mt-1">●</div>
                Circumventing copyright, DRM, or licensing protections
              </li>
              <li className="flex gap-5">
                <div className="shrink-0 text-red-400 mt-1">●</div>
                Automated scraping, stress-testing, or reverse-engineering the service
              </li>
              <li className="flex gap-5">
                <div className="shrink-0 text-red-400 mt-1">●</div>
                Distributing sensitive personal or classified information through the tool
              </li>
            </ul>

            <div className="mt-12 p-6 bg-red-950/30 border border-red-900/50 rounded-2xl text-sm text-red-400 italic">
              Violation of these rules may result in immediate blocking of your IP and permanent ban from the service. 
              We will cooperate with law enforcement when required by legal process.
            </div>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-8 flex items-center gap-4">
              <AlertTriangle className="text-amber-400" size={32} />
              3. DISCLAIMER OF WARRANTIES
            </h2>
            
            <div className="glass-panel p-12 rounded-3xl italic border border-amber-900/30 bg-zinc-950/80">
              PDF ASAAN IS PROVIDED ON AN <span className="text-white">"AS IS"</span> AND <span className="text-white">"AS AVAILABLE"</span> BASIS.<br /><br />
              WE EXPRESSLY DISCLAIM ALL WARRANTIES — EXPRESS, IMPLIED, OR STATUTORY — 
              INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.<br /><br />
              WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, 
              OR THAT YOUR DOCUMENTS WILL NEVER BE CORRUPTED.
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-white tracking-tight border-b border-zinc-800 pb-6">
              4. LIMITATION OF LIABILITY
            </h2>
            <p className="max-w-3xl">
              To the maximum extent permitted by law, the developer of PDF Asaan shall not be liable 
              for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, 
              data loss, document corruption, or business interruption — even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-white tracking-tight border-b border-zinc-800 pb-6 flex items-center gap-4">
              5. INTELLECTUAL PROPERTY
            </h2>
            <p>
              The PDF Asaan name, logo, design, and source code are the exclusive intellectual property of the developer. 
              You are granted a limited, non-exclusive, non-transferable license to use the web application for personal 
              and commercial document processing.
            </p>
            <p className="text-sm text-zinc-500 mt-6">
              You may not copy, modify, distribute, reverse-engineer, or create derivative works of the service without explicit written permission.
            </p>
          </section>

          {/* Governing Law */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-white tracking-tight border-b border-zinc-800 pb-6">
              6. GOVERNING LAW
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
              where the developer resides, without regard to conflict of law principles.
            </p>
          </section>

          {/* Final Warning */}
          <div className="glass-panel p-12 rounded-3xl text-center border border-zinc-700 bg-black/60">
            <Zap className="mx-auto text-[#22d3ee] mb-6" size={48} />
            <p className="text-xl text-white max-w-md mx-auto">
              Use the tool wisely.<br />
              We built it to help you — not to babysit you.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-zinc-900 text-xs font-mono tracking-[3px] text-zinc-600 flex flex-col md:flex-row justify-between gap-4">
          <div>PDF ASAAN • TERMS OF SERVICE • 2026</div>
          <div>BUILT FOR FREEDOM • USE AT YOUR OWN RISK</div>
        </footer>
      </div>
    </div>
  );
}
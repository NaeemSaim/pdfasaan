'use client';
import Link from 'next/link';
import { ArrowLeft, Scale, AlertTriangle, FileCheck, Gavel, ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-400 py-24 px-6 leading-relaxed">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-zinc-600 hover:text-white mb-16 transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h1 className="text-6xl font-black text-white mb-2 italic">Terms of Service</h1>
        <p className="text-zinc-600 mb-16 font-mono">Agreement Version: 1.0.4-2026</p>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2">1. BINDING AGREEMENT</h2>
            <p>By accessing and using PDF Asaan ("the Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you are using the Service on behalf of an organization, you agree to these terms for that organization.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2 flex items-center gap-2">
              <ShieldAlert size={20} className="text-red-500" /> 2. ACCEPTABLE USE POLICY
            </h2>
            <p className="mb-4">You agree not to use the Service for any unlawful or prohibited activities, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-3 marker:text-red-500">
              <li>Processing fraudulent or forged government documents.</li>
              <li>Circumventing copyright protections or digital rights management (DRM).</li>
              <li>Automated scraping or stress-testing of the Service's infrastructure.</li>
              <li>Unauthorized distribution of sensitive personal information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2 flex items-center gap-2">
              <Gavel size={20} className="text-zinc-500" /> 3. DISCLAIMER OF WARRANTIES
            </h2>
            <p className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 italic text-sm">
              PDF ASAAN IS PROVIDED "AS IS" AND "AS AVAILABLE." WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2">4. LIMITATION OF LIABILITY</h2>
            <p>To the maximum extent permitted by law, the developer of PDF Asaan shall not be liable for any indirect, incidental, special, or consequential damages, including loss of profits, data loss, or document corruption, even if advised of the possibility of such damages.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2">5. INTELLECTUAL PROPERTY</h2>
            <p>The PDF Asaan brand, logo, and source code are the intellectual property of the developer. Users are granted a limited, non-exclusive license to use the web-based tools for personal or commercial document management.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2">6. GOVERNING LAW</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the developer resides, without regard to its conflict of law provisions.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
'use client';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, ServerOff, Globe, Database, Bell } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-400 py-24 px-6 leading-relaxed">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-zinc-600 hover:text-white mb-16 transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h1 className="text-6xl font-black text-white mb-2 italic">Privacy Policy</h1>
        <p className="text-zinc-600 mb-16 font-mono">Document Reference: PA-PP-2026-REV1</p>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2">1. INTRODUCTION AND SCOPE</h2>
            <p className="mb-4">This Privacy Policy governs the use of the PDF Asaan web application. We are committed to protecting the privacy of our users through a "Security by Design" architecture. This document explains how data is handled when you interact with our suite of PDF tools.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2 flex items-center gap-2">
              <ServerOff size={20} className="text-emerald-500" /> 2. ZERO-SERVER DATA PROCESSING
            </h2>
            <p className="mb-4">Unlike standard cloud-based PDF converters, PDF Asaan utilizes <strong>Client-Side Processing</strong>. This means:</p>
            <ul className="list-disc pl-6 space-y-3 marker:text-emerald-500">
              <li>Files are never uploaded to a remote server for processing.</li>
              <li>The browser’s local environment handles all manipulation via WebAssembly and JavaScript.</li>
              <li>No persistent storage of your documents exists once the browser tab is closed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2">3. DATA CATEGORIES AND COLLECTION</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Document Data</h3>
                <p className="text-sm">We do not collect, read, or share any data contained within the PDFs or images you process. Your content remains yours alone.</p>
              </div>
              <div className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Personal Identifiers</h3>
                <p className="text-sm">We do not require account registration, email addresses, or phone numbers for tool access. The service is anonymous.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2 flex items-center gap-2">
              <Globe size={20} className="text-blue-500" /> 4. THIRD-PARTY INFRASTRUCTURE
            </h2>
            <p className="mb-4">To ensure high availability and performance, we utilize the following technical providers:</p>
            <ul className="list-disc pl-6 space-y-3 marker:text-blue-500 text-sm">
              <li><strong>Cloudflare:</strong> For web hosting and DDoS protection. Cloudflare may process log data (IP addresses) to ensure network security.</li>
              <li><strong>Unpkg/CDNs:</strong> For serving library assets (PDF.js). These providers see your request for the library file but never your document.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-900 pb-2">5. DATA RETENTION POLICY</h2>
            <p>Our retention period is <strong>Zero</strong>. We do not maintain databases of user files. Data exists in the volatile memory (RAM) of your device for the duration of the session only.</p>
          </section>

          <footer className="pt-10 text-xs text-zinc-600 border-t border-zinc-900 italic">
            Questions regarding this policy should be directed to the administrator via the official project repository.
          </footer>
        </div>
      </div>
    </div>
  );
}
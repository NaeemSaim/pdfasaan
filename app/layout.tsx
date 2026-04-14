import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PdfAsaan — Professional PDF Tools in Your Browser",
  description: "Merge, split, compress, rotate, watermark, redact, and organize PDFs instantly. 100% client-side. Zero uploads. No tracking. Built like a weapon.",
  keywords: ["pdf tools", "pdf editor", "merge pdf", "compress pdf", "pdf to image", "image to pdf", "online pdf", "client side pdf"],
  authors: [{ name: "PdfAsaan" }],
  openGraph: {
    title: "PdfAsaan — PDF Tools That Don't Suck",
    description: "Professional-grade PDF tools running entirely in your browser. Fast. Private. Brutal.",
    images: [
      {
        url: "/og-image.png", // add this later in public folder
        width: 1200,
        height: 630,
        alt: "PdfAsaan - PDF Tools",
      },
    ],
    siteName: "PdfAsaan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PdfAsaan — Browser-Based PDF Warfare",
    description: "No servers. No bullshit. Just pure client-side PDF power.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ backgroundColor: "#020617" }}
    >
      <body 
        className="min-h-full flex flex-col text-white overflow-x-hidden"
        style={{
          fontFamily: "var(--font-geist-sans)",
          backgroundColor: "#020617",
        }}
      >
        {children}

        {/* Optional: Global Devil Mode indicator (only visible in dev) */}
        {/* You can remove this later */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-4 right-4 text-[10px] font-mono text-red-500/50 pointer-events-none z-50">
            DEVIL MODE ENABLED — CTRL+SHIFT+D
          </div>
        )}
      </body>
    </html>
  );
}
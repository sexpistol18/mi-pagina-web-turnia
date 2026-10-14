"use client";

import React from "react";
import StudioMockupViewer from "@/components/StudioMockupViewer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Sparkles, Smartphone } from "lucide-react";
import Link from "next/link";

export default function MockupsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-[#2f2c79] selection:text-[#fbf1e9]">
      {/* Navigation Top Header */}
      <header className="bg-[#2f2c79] border-b border-[#38bdf8]/20 px-4 sm:px-8 py-4 flex items-center justify-between shadow-xl sticky top-0 z-30">
        <Link
          href="/"
          className="flex items-center space-x-2 text-slate-200 hover:text-white transition-colors text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4 text-[#38bdf8]" />
          <span>Volver a Turnia</span>
        </Link>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-[#38bdf8] text-[#2f2c79] flex items-center justify-center font-black text-sm shadow-md">
            T
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Turnia Mockups
          </span>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] text-xs font-bold border border-[#38bdf8]/30">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Formato 9:16 Studio</span>
        </div>
      </header>

      {/* Main Studio View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        <StudioMockupViewer />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

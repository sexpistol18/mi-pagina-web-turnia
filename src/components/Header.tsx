"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export default function Header({ onOpenRegister, onOpenLogin }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f3f4f6] text-[#374151] border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Turnia Brand */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <img 
            src="/Turnia-gr.svg" 
            alt="Turnia Logo" 
            className="h-9 w-auto group-hover:scale-105 transition-transform" 
          />
          <span className="hidden sm:inline-block text-[10px] uppercase font-black tracking-widest text-[#0284c7] pl-1.5 border-l border-gray-300">
            ARGENTINA
          </span>
        </div>

        {/* Center: Navigation Menu (ALL UPPERCASE / MAYÚSCULAS) */}
        <nav className="hidden md:flex items-center space-x-6 text-xs sm:text-sm font-extrabold text-[#374151] tracking-wider uppercase">
          <button
            onClick={() => scrollToSection("que-es-turnia")}
            className="hover:text-[#0284c7] transition-colors py-1 cursor-pointer uppercase"
          >
            ¿QUÉ ES TURNIA?
          </button>
          <button
            onClick={() => scrollToSection("por-que-nos-eligen")}
            className="hover:text-[#0284c7] transition-colors py-1 cursor-pointer uppercase"
          >
            ¿POR QUÉ NOS ELIGEN?
          </button>
          <button
            onClick={() => scrollToSection("planes")}
            className="hover:text-[#0284c7] transition-colors py-1 cursor-pointer uppercase text-[#0284c7] font-black"
          >
            PLANES
          </button>
          <button
            onClick={() => scrollToSection("condiciones")}
            className="hover:text-[#0284c7] transition-colors py-1 cursor-pointer uppercase"
          >
            CONDICIONES
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className="hover:text-[#0284c7] transition-colors py-1 cursor-pointer flex items-center space-x-1 uppercase"
          >
            <span>CONTACTO</span>
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
          </button>
        </nav>

        {/* Right Side: Auth Buttons (ALL UPPERCASE / MAYÚSCULAS) */}
        <div className="flex items-center space-x-3">
          {/* INGRESAR Button */}
          <button
            onClick={onOpenLogin}
            className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-[#2f2c79]/15 text-[#2f2c79] border border-[#2f2c79]/30 hover:bg-[#2f2c79]/25 transition-all shadow-xs cursor-pointer"
          >
            INGRESAR
          </button>

          {/* REGISTRARME Button */}
          <button
            onClick={onOpenRegister}
            className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl bg-[#2f2c79] text-[#ffffff] hover:bg-[#242261] transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            REGISTRARME
          </button>
        </div>

      </div>
    </header>
  );
}

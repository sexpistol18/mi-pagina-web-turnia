"use client";

import React from "react";
import { Scissors, Calendar, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

interface HeroSectionProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export default function HeroSection({ onOpenRegister, onOpenLogin }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 bg-white">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#0284c7]/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#0284c7] mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Conexión directa con Google Calendar & Mercado Pago</span>
        </div>

        {/* Título en el medio de la pantalla (turnia) con fondo azul #2f2c79 y letra beige #fbf1e9 */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#2f2c79] text-[#fbf1e9] px-8 py-5 sm:px-12 sm:py-6 rounded-3xl shadow-2xl flex items-center space-x-3.5 border border-[#3b3894] transform hover:scale-[1.02] transition-transform">
            <img 
              src="/Turnia-wh.svg" 
              alt="Turnia Logo" 
              className="h-10 sm:h-14 w-auto" 
            />
          </div>
        </div>

        {/* Texto secundario por debajo del título */}
        <h2 className="text-xl sm:text-2xl font-semibold text-[#4b5563] max-w-2xl mx-auto mb-10 leading-relaxed">
          Agenda de turnos virtual en <span className="text-[#0284c7] font-bold">Argentina</span>
        </h2>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* BOTÓN DE REGISTRO */}
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto px-8 py-4 bg-[#2f2c79] text-white font-bold rounded-2xl shadow-xl hover:bg-[#242261] hover:shadow-2xl transition-all flex items-center justify-center space-x-3 group"
          >
            <Scissors className="w-5 h-5 text-[#38bdf8] group-hover:rotate-12 transition-transform" />
            <span>Entrar como emprendedor</span>
          </button>

          {/* BOTÓN INGRESAR (Azul trasparentoso, letras beige claro / azul) */}
          <button
            onClick={onOpenLogin}
            className="w-full sm:w-auto px-8 py-4 bg-[#2f2c79]/15 text-[#2f2c79] border-2 border-[#2f2c79]/30 font-bold rounded-2xl backdrop-blur-xs hover:bg-[#2f2c79]/25 transition-all flex items-center justify-center space-x-3 shadow-md"
          >
            <UserCheck className="w-5 h-5 text-[#2f2c79]" />
            <span>Ingresar como Cliente</span>
          </button>
        </div>

        {/* Highlight features bar below buttons */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-2 text-xs text-[#4b5563]">
            <Calendar className="w-4 h-4 text-[#0284c7]" />
            <span>Sincronización instantánea</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs text-[#4b5563]">
            <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
            <span>Cobros con anticipación</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs text-[#4b5563]">
            <Sparkles className="w-4 h-4 text-[#0284c7]" />
            <span>100% Automático para Barberos</span>
          </div>
        </div>

      </div>
    </section>
  );
}

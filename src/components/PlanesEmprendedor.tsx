"use client";

import React from "react";
import { Check, Calendar, Headphones, LayoutGrid, Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";

interface PlanesEmprendedorProps {
  onSelectPlan?: (planName: string) => void;
}

export default function PlanesEmprendedor({ onSelectPlan }: PlanesEmprendedorProps) {
  const handlePlanClick = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    } else {
      const regBtn = document.querySelector<HTMLButtonElement>("header button:last-child");
      if (regBtn) regBtn.click();
    }
  };

  return (
    <section id="planes" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#2f2c79]/30 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#0284c7]/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] text-xs font-bold border border-[#38bdf8]/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Precios Claras & Sin Sorpresas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mb-4">
            Planes para el Emprendedor
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Elegí la alternativa perfecta para impulsar la gestión de tu negocio con automatización total de turnos y sincronización directa.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">

          {/* PLAN 1: EMPRENDEDORES */}
          <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 hover:border-[#38bdf8]/40 transition-all duration-300 shadow-xl flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-[#38bdf8] text-xs font-bold border border-slate-700 uppercase tracking-wider">
                  Individual
                </span>
                <span className="text-xs font-bold text-slate-400">1 Usuario / Barbero</span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">
                Emprendedores
              </h3>

              <p className="text-xs text-slate-300 mb-6">
                Ideal para profesionales independientes, barberos o estilistas autónomos que buscan automatizar su agenda.
              </p>

              {/* Price Tag */}
              <div className="mb-8 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-white">$20.000</span>
                  <span className="text-xs font-bold text-[#38bdf8] ml-2 uppercase">ARG</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">/ mes</span>
              </div>

              {/* Features List */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Headphones className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-200 font-semibold">
                    Asesoramiento incluido de 24hs
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-200 font-semibold">
                    Agenda vinculada a Google Calendar
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#2f2c79]/40 text-[#38bdf8] flex items-center justify-center shrink-0 mt-0.5">
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-200 font-semibold">
                    Misma agenda e interfaz
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-300 text-xs">
                    Cobro anticipado con Mercado Pago (50% o 100%)
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-300 text-xs">
                    Recordatorios automáticos por sistema
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePlanClick("Emprendedores")}
              className="w-full mt-8 py-3.5 px-6 rounded-2xl bg-[#2f2c79] hover:bg-[#242261] text-white font-bold text-sm border border-[#38bdf8]/30 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg group-hover:border-[#38bdf8]"
            >
              <span>Elegir Plan Emprendedores</span>
              <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
            </button>
          </div>

          {/* PLAN 2: LOCALES */}
          <div className="bg-gradient-to-b from-[#1c1854] via-slate-900 to-slate-950 rounded-3xl p-8 border-2 border-[#38bdf8] shadow-2xl flex flex-col justify-between relative group scale-100 sm:scale-102">
            
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-slate-950 text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Más Elegido por Salones</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-1">
                <span className="px-3 py-1 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] text-xs font-black border border-[#38bdf8]/40 uppercase tracking-wider">
                  Comercial / Equipo
                </span>
                <span className="text-xs font-bold text-emerald-400">Sin límite de agenda</span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">
                Locales
              </h3>

              <p className="text-xs text-slate-300 mb-6">
                Para barberías, salones o locales comerciales con múltiples sillas, puestos de trabajo o personal.
              </p>

              {/* Price Tag */}
              <div className="mb-8 p-4 rounded-2xl bg-slate-950/80 border border-[#38bdf8]/30 flex items-baseline justify-between shadow-inner">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-white">$40.000</span>
                  <span className="text-xs font-bold text-[#38bdf8] ml-2 uppercase">ARG</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">/ mes</span>
              </div>

              {/* Features List */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Headphones className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-200 font-semibold">
                    Asesoramiento incluido de 24hs
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-200 font-semibold">
                    Agenda vinculada a Google Calendar
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#2f2c79]/40 text-[#38bdf8] flex items-center justify-center shrink-0 mt-0.5">
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-200 font-semibold">
                    Misma agenda e interfaz
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-300 text-xs">
                    Soporte prioritario y configuración asistida
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-300 text-xs">
                    Gestión centralizada de múltiples emprendedores
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePlanClick("Locales")}
              className="w-full mt-8 py-3.5 px-6 rounded-2xl bg-[#38bdf8] hover:bg-sky-400 text-slate-950 font-black text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-[#38bdf8]/20"
            >
              <span>Elegir Plan Locales</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Sin contratos ni letras chicas. Podés cambiar de plan o cancelar en cualquier momento.</span>
        </div>

      </div>
    </section>
  );
}

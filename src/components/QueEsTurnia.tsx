"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Zap, Award, Lock, Clock, Sparkles } from "lucide-react";

export default function QueEsTurnia() {
  return (
    <section id="que-es-turnia" className="py-20 bg-gradient-to-b from-white via-slate-50 to-gray-100 border-y border-gray-200 relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#2f2c79]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Header Pill */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#2f2c79] text-[#fbf1e9] px-5 py-2 rounded-2xl shadow-lg border border-[#38bdf8]/30 mb-4">
            <Zap className="w-5 h-5 text-[#38bdf8]" />
            <h2 className="text-xl sm:text-3xl font-black tracking-wide uppercase">
              ¿Qué es Turnia?
            </h2>
          </div>
          
          <p className="text-slate-600 font-semibold text-sm sm:text-base max-w-xl">
            La plataforma líder de agendamiento inteligente que revoluciona el trabajo de los emprendedores en Argentina.
          </p>
        </div>

        {/* Main Catchy Visual Card (Confianza y Seriedad) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200/90 relative overflow-hidden mb-12">
          
          {/* Subtle Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2f2c79] via-[#0284c7] to-[#38bdf8]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100 text-[#0284c7] text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Gestión Profesional Automatizada</span>
              </div>

              <p className="text-base sm:text-xl text-slate-800 leading-relaxed font-medium">
                Turnia es la solución integral creada para que agendes tus turnos online y cobres en un solo lugar, sin dar vueltas ni perder tiempo respondiendo mensajes de WhatsApp mientras trabajás.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                El cliente accede a tu link personalizado, elige el horario disponible, abona la seña o el total y el turno queda confirmado automáticamente en tu agenda. Vos te enfocás al 100% en brindar el mejor servicio, mientras la app organiza todo tu negocio.
              </p>

              {/* Key Features Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Sin interrupciones</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Elección y cobro automático</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Organización y seriedad 24/7</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Trust Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#2f2c79] to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#38bdf8]/30 flex flex-col justify-between space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-[#38bdf8]" />
                  <span className="font-extrabold text-sm uppercase tracking-wider">Garantía Turnia</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OFICIAL
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Clock className="w-5 h-5 text-[#38bdf8] shrink-0" />
                  <div>
                    <strong className="block text-white">Ahorro de +3 horas diarias</strong>
                    <span className="text-slate-300 text-[11px]">Cero chats pendientes de agendamiento</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="block text-white">Cero ausentismo de clientes</strong>
                    <span className="text-slate-300 text-[11px]">Seña previa que asegura cada turno</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
                  <div>
                    <strong className="block text-white">Imagen 100% profesional</strong>
                    <span className="text-slate-300 text-[11px]">Transmite confianza absoluta al cliente</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-white/10">
                <span className="text-[11px] text-slate-300 font-medium">
                  🇦🇷 Plataforma optimizada para emprendedores en Argentina
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* METODOS DE PAGO CON IMAGEN OFICIAL DE MERCADO PAGO */}
        <div className="bg-gradient-to-r from-sky-50 via-blue-50/50 to-indigo-50 rounded-3xl p-6 sm:p-8 border border-sky-200/80 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center space-x-5">
              {/* Mercado Pago Image Container */}
              <div className="bg-white p-3 rounded-2xl shadow-md border border-sky-100 shrink-0 flex items-center justify-center w-36 h-20 sm:w-44 sm:h-24">
                <img 
                  src="/mercado-pago.svg" 
                  alt="Mercado Pago" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-extrabold text-[#009ee3] mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Métodos de Pago Integrados</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Integración Directa con Mercado Pago
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Transmití confianza total a tus clientes recibiendo señas del 50% o cobros completos en Pesos Argentinos con acreditación en tu cuenta oficial.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl border border-sky-200 shadow-sm text-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold">Cobro Seguro Garantizado</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

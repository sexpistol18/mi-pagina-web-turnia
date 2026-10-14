"use client";

import React from "react";
import {
  BellRing,
  Sparkles,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ShieldAlert,
  CreditCard,
  Zap,
  ArrowRight,
  AlertCircle,
  Check,
} from "lucide-react";

export default function PorQueNosEligen() {
  return (
    <section id="por-que-nos-eligen" className="py-20 bg-gradient-to-b from-slate-900 via-[#161338] to-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2f2c79]/30 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-[#0284c7]/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] text-xs font-bold border border-[#38bdf8]/20 mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>Confianza & Eficiencia Garantizada</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight uppercase">
            ¿Por qué nos eligen los emprendedores de Argentina?
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Una solución integral diseñada para eliminar la pérdida de tiempo en WhatsApp, garantizar ausencias cero y maximizar la facturación de tu negocio.
          </p>
        </div>

        {/* PARTE 1: BENEFICIOS CLAVE DE TURNIA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          
          {/* 1. Recordatorios automáticos */}
          <div className="group bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-[#38bdf8]/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#2f2c79] text-[#38bdf8] flex items-center justify-center mb-6 shadow-lg border border-[#38bdf8]/30 group-hover:scale-110 transition-transform">
                <BellRing className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
                <span>Recordatorios Automáticos</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Evitá el ausentismo de clientes. La plataforma y nuestro asistente de recordatorio envían avisos automáticos previos al turno para confirmar la asistencia.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center space-x-2 text-xs text-[#38bdf8] font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Reducción comprobada del 95% de ausencias</span>
            </div>
          </div>

          {/* 2. Es sencillo */}
          <div className="group bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-[#38bdf8]/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#2f2c79] text-[#38bdf8] flex items-center justify-center mb-6 shadow-lg border border-[#38bdf8]/30 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Simplicidad Extrema
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Sin registros molestos ni descargas obligatorias. El cliente selecciona el servicio, elige día y horario disponible y agenda su turno en menos de 30 segundos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center space-x-2 text-xs text-[#38bdf8] font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Experiencia 100% amigable en smartphones</span>
            </div>
          </div>

          {/* 3. Agenda diferente */}
          <div className="group bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-[#38bdf8]/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#2f2c79] text-[#38bdf8] flex items-center justify-center mb-6 shadow-lg border border-[#38bdf8]/30 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Sincronización con Google Calendar
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Integración directa y sincrónica con tu calendario oficial. Visualizá todos tus turnos diarios sin solapamientos ni desorden.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center space-x-2 text-xs text-[#38bdf8] font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sincronización instantánea en tiempo real</span>
            </div>
          </div>

          {/* 4. Cobro anticipado */}
          <div className="group bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-[#38bdf8]/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#2f2c79] text-[#38bdf8] flex items-center justify-center mb-6 shadow-lg border border-[#38bdf8]/30 group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Cobro Anticipado Garantizado
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Cobrá la seña (50%) o el total del turno (100%) al momento de agendar a través de Mercado Pago para asegurar el ingreso de tu negocio.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center space-x-2 text-xs text-[#38bdf8] font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Acreditación inmediata de pesos argentinos</span>
            </div>
          </div>

        </div>


        {/* PARTE 2: CONDICIONES DE RESERVA Y CANCELACION DE TURNOS */}
        <div id="condiciones" className="bg-gradient-to-br from-slate-950 via-[#1b1747] to-slate-950 rounded-3xl p-8 sm:p-12 border-2 border-[#38bdf8]/30 shadow-2xl relative overflow-hidden">
          
          {/* Header del bloque de Condiciones */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] text-xs font-bold border border-[#38bdf8]/30 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Políticas Transparentes de Servicio</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase">
                CONDICIONES DE RESERVA Y CANCELACION DE TURNOS
              </h3>
              
              <p className="text-slate-300 text-sm mt-1 max-w-xl">
                Términos del servicio diseñados para proteger la agenda del emprendedor y garantizar un compromiso mutuo.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <img src="/Turnia-wh.svg" alt="Turnia" className="h-8 w-auto opacity-80" />
            </div>
          </div>

          {/* Grid de 3 Puntos de Condiciones con los textos exactos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            
            {/* Punto 1: Reserva 50% */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between shadow-lg relative group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#2f2c79] text-[#38bdf8] flex items-center justify-center font-bold border border-[#38bdf8]/30">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-white text-base leading-snug">
                  Reserva Previa del 50%
                </h4>
                <div className="flex items-start space-x-2 text-slate-200 text-sm leading-relaxed">
                  <span className="text-[#38bdf8] font-bold text-lg leading-none">•</span>
                  <p>
                    Para confirmar y reservar un turno, se deberá abonar previamente el 50% del valor total del servicio.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center space-x-2 text-xs text-[#38bdf8] font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Confirmación automática al abonar</span>
              </div>
            </div>

            {/* Punto 2: Aviso 24hs */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-lg relative group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold border border-amber-500/30">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-white text-base leading-snug">
                  Anticipación de 24 Horas
                </h4>
                <div className="flex items-start space-x-2 text-slate-200 text-sm leading-relaxed">
                  <span className="text-amber-400 font-bold text-lg leading-none">•</span>
                  <p>
                    En caso de necesitar cancelar o modificar el turno, deberá informase con un mínimo de 24 horas de anticipación.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center space-x-2 text-xs text-amber-300 font-bold">
                <Clock className="w-4 h-4" />
                <span>Tiempo prudente para reagendar</span>
              </div>
            </div>

            {/* Punto 3: No reintegro */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-rose-500/50 transition-all flex flex-col justify-between shadow-lg relative group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold border border-rose-500/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-white text-base leading-snug">
                  Política de No Reintegro
                </h4>
                <div className="flex items-start space-x-2 text-slate-200 text-sm leading-relaxed">
                  <span className="text-rose-400 font-bold text-lg leading-none">•</span>
                  <p>
                    El importe abonado en concepto de reserva no será reintegrado cuando la cancelación no sea informada dentro del plazo establecido o cuando el cliente no se presente al turno.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center space-x-2 text-xs text-rose-400 font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>Protección del tiempo del emprendedor</span>
              </div>
            </div>

          </div>

          {/* Destacado de resumen inferior */}
          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <p className="text-xs sm:text-sm text-slate-300">
                Al sumar tu negocio a <strong>Turnia</strong>, asegurás tu facturación mensual y brindás la mejor experiencia a tus clientes.
              </p>
            </div>
            
            <button
              onClick={() => {
                const regBtn = document.querySelector<HTMLButtonElement>("header button:last-child");
                if (regBtn) regBtn.click();
              }}
              className="px-6 py-3 bg-[#2f2c79] hover:bg-[#242261] text-white font-bold text-xs rounded-xl shadow-lg border border-[#38bdf8]/30 transition-all flex items-center space-x-2 shrink-0 cursor-pointer uppercase tracking-wider"
            >
              <span>Registrar mi emprendimiento</span>
              <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import EntrepreneurMobileScreen from "./mobile/EntrepreneurMobileScreen";
import ClientMobileScreen from "./mobile/ClientMobileScreen";
import { Sparkles, Smartphone, Eye, ShieldCheck, ArrowRight, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function StudioMockupViewer() {
  const { login } = useAuth();
  const [viewMode, setViewMode] = useState<"interactive" | "rendered_image">("interactive");

  return (
    <div className="w-full bg-slate-950 text-white rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Studio Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2f2c79]/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0284c7]/25 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] text-xs font-bold border border-[#38bdf8]/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Presentación Profesional de Maquetas (Mockups)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Turnia Mobile UI/UX — Argentina
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visualización lado a lado en 9:16 con fondo neutro de estudio e iluminación suave.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 space-x-2 shrink-0">
          <button
            onClick={() => setViewMode("interactive")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              viewMode === "interactive"
                ? "bg-[#2f2c79] text-white shadow-md border border-[#38bdf8]/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-4 h-4 text-[#38bdf8]" />
            <span>Simulador Interactivo</span>
          </button>

          <button
            onClick={() => setViewMode("rendered_image")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              viewMode === "rendered_image"
                ? "bg-[#2f2c79] text-white shadow-md border border-[#38bdf8]/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#38bdf8]" />
            <span>Render de Estudio</span>
          </button>
        </div>
      </div>

      {/* Main Studio Display Container */}
      <div className="py-8 relative z-10">
        {viewMode === "interactive" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            
            {/* PANTALLA 1 (Izquierda - Interfaz Móvil del Emprendedor) */}
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-3 px-3 py-1 rounded-full bg-[#2f2c79]/80 border border-[#38bdf8]/30 text-[#fbf1e9] text-xs font-bold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>PANTALLA 1: Interfaz Móvil del Emprendedor</span>
              </div>

              {/* Smartphone Frame (9:16 aspect ratio container) */}
              <div className="w-[330px] h-[660px] bg-slate-950 p-2.5 rounded-[44px] border-[4px] border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 relative transition-transform hover:scale-[1.01] duration-300">
                <EntrepreneurMobileScreen />
              </div>

              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => login("entrepreneur")}
                  className="px-4 py-2 bg-[#2f2c79] hover:bg-[#242261] text-white text-xs font-bold rounded-xl border border-[#38bdf8]/30 shadow-md flex items-center space-x-2 cursor-pointer"
                >
                  <span>Probar Dashboard /dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </button>
              </div>
            </div>

            {/* PANTALLA 2 (Derecha - Interfaz Móvil del Cliente) */}
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-3 px-3 py-1 rounded-full bg-[#2f2c79]/80 border border-[#38bdf8]/30 text-[#fbf1e9] text-xs font-bold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
                <span>PANTALLA 2: Interfaz Móvil del Cliente</span>
              </div>

              {/* Smartphone Frame (9:16 aspect ratio container) */}
              <div className="w-[330px] h-[660px] bg-slate-950 p-2.5 rounded-[44px] border-[4px] border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 relative transition-transform hover:scale-[1.01] duration-300">
                <ClientMobileScreen />
              </div>

              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => login("client")}
                  className="px-4 py-2 bg-[#2f2c79] hover:bg-[#242261] text-white text-xs font-bold rounded-xl border border-[#38bdf8]/30 shadow-md flex items-center space-x-2 cursor-pointer"
                >
                  <span>Probar Home /home</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* High-res Rendered Studio Image View */
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-black">
              <img
                src="/turnia_mobile_mockups.png"
                alt="Presentación Profesional de Maquetas Turnia"
                className="w-full h-auto object-cover max-h-[700px] mx-auto"
              />
            </div>
            <p className="text-xs text-slate-400 mt-3 italic">
              Presentación de maquetas (mockups) para smartphone 9:16 sobre fondo de estudio con tonos Azul principal (#2f2c79), Verde Agua (#38bdf8) y detalles dorados sutiles.
            </p>
          </div>
        )}
      </div>

      {/* Role Access Architecture Summary Footer */}
      <div className="pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 relative z-10">
        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-white block mb-0.5">
              Auth Guard — Rol Emprendedor
            </span>
            <span>
              Iniciar sesión como Emprendedor redirige exclusivamente a la interfaz de administración del negocio (`/dashboard`).
            </span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-white block mb-0.5">
              Auth Guard — Rol Cliente
            </span>
            <span>
              Iniciar sesión como Cliente redirige exclusivamente a la interfaz de exploración y reserva de turnos (`/home`).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

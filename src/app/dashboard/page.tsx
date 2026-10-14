"use client";

import React, { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import EntrepreneurBottomNav from "@/components/mobile/EntrepreneurBottomNav";
import EntrepreneurMobileScreen from "@/components/mobile/EntrepreneurMobileScreen";
import CalendarioView from "@/components/mobile/CalendarioView";
import ServiciosView from "@/components/mobile/ServiciosView";
import AjustesView from "@/components/mobile/AjustesView";
import {
  Scissors,
  LogOut,
  Smartphone,
  Calendar,
  TrendingUp,
  Store,
  Settings,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("panel");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile_sim">("desktop");

  const TAB_LABELS: Record<string, string> = {
    panel: "Panel Principal",
    calendario: "Calendario de Turnos",
    servicios: "Servicios",
    ajustes: "Ajustes",
  };

  return (
    <AuthGuard allowedRole="entrepreneur">
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#2f2c79] selection:text-[#fbf1e9]">
        
        {/* Top Header Navigation */}
        <header className="bg-[#2f2c79] border-b border-[#38bdf8]/20 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-[#fbf1e9] hover:opacity-90 transition-opacity"
            >
              <img src="/Turnia-wh.svg" alt="Turnia Logo" className="h-7 w-auto" />
            </Link>

            <span className="hidden sm:inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
              Panel Emprendedor (/dashboard)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Switcher toggle */}
            <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-800 flex space-x-1">
              <button
                onClick={() => setViewMode("desktop")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "desktop"
                    ? "bg-[#38bdf8] text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Vista Completa
              </button>
              <button
                onClick={() => setViewMode("mobile_sim")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  viewMode === "mobile_sim"
                    ? "bg-[#38bdf8] text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Móvil (9:16)</span>
              </button>
            </div>

            <button
              onClick={logout}
              className="px-3.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-xl text-xs border border-rose-500/40 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        {viewMode === "mobile_sim" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="w-[340px] h-[680px] bg-black p-2 rounded-[46px] border-4 border-slate-700 shadow-2xl ring-1 ring-white/20 relative">
              <EntrepreneurMobileScreen />
            </div>
          </div>
        ) : (
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
            {/* Breadcrumb Tab Indicator */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Store className="w-3.5 h-3.5" />
              <span>Panel Emprendedor</span>
              <span>/</span>
              <span className="text-[#38bdf8] font-bold">{TAB_LABELS[activeTab]}</span>
            </div>
            
            {/* Dynamic Tab Content */}
            {activeTab === "calendario" ? (
              <CalendarioView />
            ) : activeTab === "servicios" ? (
              <ServiciosView />
            ) : activeTab === "ajustes" ? (
              <AjustesView />
            ) : (
              <>
                {/* Top Welcome Banner */}
                <div className="bg-gradient-to-r from-[#2f2c79] via-[#1d1b52] to-slate-900 rounded-3xl p-6 sm:p-8 border border-[#38bdf8]/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center space-x-2 text-[#38bdf8] text-xs font-extrabold uppercase tracking-wider mb-1">
                      <Store className="w-4 h-4" />
                      <span>Negocio Verificado · Argentina</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black text-white">
                      Barbería Patagonia Cuts - Argentina
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                      Bienvenido al panel exclusivo de administración. Navegá por las opciones del menú inferior para gestionar tus servicios, calendario y ajustes.
                    </p>
                  </div>
                  <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-5 shadow-xl shrink-0 min-w-[280px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                        Total ingresado este mes
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span>+18.4%</span>
                      </span>
                    </div>
                    <div className="text-3xl font-black text-white">
                      $ 738.000 <span className="text-sm font-extrabold text-amber-300">ARS</span>
                    </div>
                    <p className="text-[10px] text-emerald-400/80 mt-1">
                      Suma acumulada por servicios cobrados y señas abonadas.
                    </p>
                  </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab("calendario")}
                    className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl hover:border-[#38bdf8]/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#2f2c79] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5 text-[#38bdf8]" />
                    </div>
                    <h3 className="font-black text-white text-base">Calendario</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Ver y gestionar turnos del día</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("servicios")}
                    className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl hover:border-[#38bdf8]/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#2f2c79] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Scissors className="w-5 h-5 text-[#38bdf8]" />
                    </div>
                    <h3 className="font-black text-white text-base">Servicios</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Administrar servicios y precios</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("ajustes")}
                    className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl hover:border-[#38bdf8]/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#2f2c79] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Settings className="w-5 h-5 text-[#38bdf8]" />
                    </div>
                    <h3 className="font-black text-white text-base">Ajustes</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Horarios, pagos y notificaciones</p>
                  </button>
                </div>
              </>
            )}

          </main>

        )}

        {/* Dynamic Bottom Navbar for Active View */}
        <div className="bg-[#2f2c79] border-t border-[#38bdf8]/20 sticky bottom-0 z-30">
          <div className="max-w-md mx-auto">
            <EntrepreneurBottomNav
              activeTab={activeTab}
              onSelectTab={setActiveTab}
            />
          </div>
        </div>

      </div>
    </AuthGuard>
  );
}

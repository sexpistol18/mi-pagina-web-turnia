"use client";

import React, { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import ClientBottomNav from "@/components/mobile/ClientBottomNav";
import ClientMobileScreen from "@/components/mobile/ClientMobileScreen";
import BusquedaView from "@/components/mobile/BusquedaView";
import MisTurnosDesktopView from "@/components/mobile/MisTurnosDesktopView";
import PerfilClienteView from "@/components/mobile/PerfilClienteView";
import {
  Search,
  MapPin,
  Calendar,
  LogOut,
  Smartphone,
  Scissors,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("inicio");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile_sim">("desktop");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const barberias = [
    {
      id: "1",
      nombre: "Barbería Patagonia Cuts",
      rating: "★ 4.5",
      reviewsCount: 128,
      precioRango: "$$ · $4.500 - $12.500 ARS",
      ubicacion: "Av. Alvear 840, Argentina",
      estado: "Abierto ahora",
      imagen:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "2",
      nombre: "Cordillera Barber",
      rating: "★ 4.8",
      reviewsCount: 94,
      precioRango: "$$ · $5.000 - $13.000 ARS",
      ubicacion: "San Martín 520, Argentina",
      estado: "Abierto ahora",
      imagen:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "3",
      nombre: "Barbería La Posta",
      rating: "★ 5.0",
      reviewsCount: 76,
      precioRango: "$$ · $4.000 - $11.000 ARS",
      ubicacion: "Rivadavia 1120, Argentina",
      estado: "Cerrado",
      imagen:
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const filteredBarberias = barberias.filter((b) =>
    b.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AuthGuard allowedRole="client">
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#2f2c79] selection:text-[#fbf1e9]">
        
        {/* Top Header Navigation */}
        <header className="bg-[#2f2c79] border-b border-[#38bdf8]/20 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-[#fbf1e9] hover:opacity-90 transition-opacity"
            >
              <img src="/Turnia-wh.svg" alt="Turnia" className="h-7 w-auto" />
            </Link>

            <span className="hidden sm:inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Vista Cliente (/home)
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
              <ClientMobileScreen />
            </div>
          </div>
        ) : (
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
            {/* Dynamic Tab Content */}
            {activeTab === "busqueda" ? (
              <BusquedaView />
            ) : activeTab === "mis-turnos" ? (
              <MisTurnosDesktopView />
            ) : activeTab === "perfil" ? (
              <PerfilClienteView onLogout={logout} />
            ) : (
              <>
                {/* Top Header Banner - Vista Inicio */}
                <div className="bg-gradient-to-r from-sky-950 via-[#2f2c79] to-slate-900 rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center space-x-2 text-[#38bdf8] text-xs font-extrabold uppercase tracking-wider mb-1">
                      <MapPin className="w-4 h-4 text-[#38bdf8]" />
                      <span>Argentina</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black text-white">
                      Locales virtuales y reserva de turnos
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                      Encontrá las mejores barberías abiertas en Argentina, mirá los horarios disponibles y agendá tu corte en un clic.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-white font-bold text-sm shrink-0">
                    📍 Ubicación: Argentina
                  </div>
                </div>

                {/* Quick Nav Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab("busqueda")}
                    className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl hover:border-[#38bdf8]/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#2f2c79] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Search className="w-5 h-5 text-[#38bdf8]" />
                    </div>
                    <h3 className="font-black text-white text-base">Buscar barbería</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Encontrá tu barbería y reservá</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("mis-turnos")}
                    className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl hover:border-[#38bdf8]/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#2f2c79] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5 text-[#38bdf8]" />
                    </div>
                    <h3 className="font-black text-white text-base">Mis Turnos</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Próximos y historial de turnos</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("perfil")}
                    className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl hover:border-[#38bdf8]/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#2f2c79] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Scissors className="w-5 h-5 text-[#38bdf8]" />
                    </div>
                    <h3 className="font-black text-white text-base">Mi Perfil</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Configurá tu cuenta y notificaciones</p>
                  </button>
                </div>

                {/* Barberías abiertas preview */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                    <Scissors className="w-6 h-6 text-[#38bdf8]" />
                    <span>Barberías de la zona abiertas</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredBarberias.map((shop) => (
                      <div
                        key={shop.id}
                        className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-[#38bdf8]/50 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="h-44 w-full relative bg-slate-800">
                            <img src={shop.imagen} alt={shop.nombre} className="w-full h-full object-cover" />
                            <div className="absolute top-3 right-3">
                              <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black shadow-md">
                                {shop.estado}
                              </span>
                            </div>
                          </div>
                          <div className="p-5 space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-white text-lg">{shop.nombre}</h3>
                              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/30">
                                {shop.rating}
                              </span>
                            </div>
                            <p className="text-xs text-[#38bdf8] font-bold">{shop.precioRango}</p>
                            <p className="text-xs text-slate-400 flex items-center space-x-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span>{shop.ubicacion}</span>
                            </p>
                          </div>
                        </div>
                        <div className="p-5 pt-0">
                          <button
                            onClick={() => setActiveTab("busqueda")}
                            className="w-full py-3 bg-[#2f2c79] hover:bg-[#23215c] text-white font-bold rounded-2xl shadow-md border border-[#38bdf8]/30 transition-all flex items-center justify-center space-x-2 text-xs cursor-pointer"
                          >
                            <Calendar className="w-4 h-4 text-[#38bdf8]" />
                            <span>Ver horarios y agendar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </main>

        )}

        {/* Dynamic Bottom Navbar for Active View */}
        <div className="bg-[#2f2c79] border-t border-[#38bdf8]/20 sticky bottom-0 z-30">
          <div className="max-w-md mx-auto">
            <ClientBottomNav
              activeTab={activeTab}
              onSelectTab={setActiveTab}
            />
          </div>
        </div>

      </div>
    </AuthGuard>
  );
}

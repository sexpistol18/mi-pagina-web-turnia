"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QueEsTurnia from "@/components/QueEsTurnia";
import PlanesEmprendedor from "@/components/PlanesEmprendedor";
import PorQueNosEligen from "@/components/PorQueNosEligen";
import Footer from "@/components/Footer";
import AuthModals from "@/components/AuthModals";
import StudioMockupViewer from "@/components/StudioMockupViewer";
import { Scissors, UserCheck, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"emprendedor" | "cliente" | null>(null);
  const { role, login, logout } = useAuth();

  const handleOpenRegister = () => {
    setAuthMode("emprendedor");
    setAuthModalOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthMode("cliente");
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#2f2c79] selection:text-[#fbf1e9]">
      
      {/* Sticky Header */}
      <Header
        onOpenRegister={handleOpenRegister}
        onOpenLogin={handleOpenLogin}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Active Session Role Banner if logged in */}
        {role && (
          <div className="bg-[#2f2c79] text-[#fbf1e9] px-4 py-2 text-center text-xs font-bold border-b border-[#38bdf8]/30 flex items-center justify-center space-x-3">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
              <span>
                Sesión Activa: Rol <strong className="text-[#38bdf8] uppercase">{role === "entrepreneur" ? "Emprendedor" : "Cliente"}</strong>
              </span>
            </span>
            <Link
              href={role === "entrepreneur" ? "/dashboard" : "/home"}
              className="px-2.5 py-0.5 rounded bg-[#38bdf8] text-slate-950 hover:bg-sky-300 transition-colors"
            >
              Ir a {role === "entrepreneur" ? "/dashboard" : "/home"} →
            </Link>
            <button
              onClick={logout}
              className="text-gray-300 hover:text-white underline text-[11px] cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        )}

        {/* Hero Section */}
        <HeroSection
          onOpenRegister={handleOpenRegister}
          onOpenLogin={handleOpenLogin}
        />

        {/* Studio Mockup Presentation Section */}
        <section className="py-12 bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] text-xs font-bold border border-[#38bdf8]/30 mb-3">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Maquetas Móviles en Formato 9:16</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Presentación de Maquetas (Mockups) Turnia
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl mx-auto">
                Diseño para smartphones modernos lado a lado sobre fondo neutro de estudio con iluminación suave y la identidad de marca Turnia.
              </p>
            </div>

            {/* Studio Mockup Viewer Component */}
            <StudioMockupViewer />

          </div>
        </section>

        {/* Auth Guard RBAC Demo Launcher */}
        <section className="py-12 bg-gradient-to-b from-slate-900 via-[#1a1744] to-slate-950 text-white border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 uppercase tracking-wider">
              Auth Guard & RBAC Router Rule Verification
            </span>
            <h3 className="text-2xl sm:text-4xl font-black mt-3 mb-3">
              Probar Sistema de Autenticación por Roles
            </h3>
            <p className="text-sm text-slate-300 mb-8 max-w-xl mx-auto">
              Seleccioná un rol para validar el redireccionamiento automático y el Navbar inferior dinámico según la pantalla activa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Option 1: Entrepreneur */}
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-[#2f2c79] hover:border-[#38bdf8] transition-all text-left shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#2f2c79] text-[#38bdf8] flex items-center justify-center font-bold mb-3">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-lg text-white">1. Rol Emprendedor</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Acceso exclusivo a la interfaz de administración del negocio.
                  </p>
                  <code className="inline-block mt-3 px-2 py-1 bg-black/50 text-[#38bdf8] text-xs font-mono rounded">
                    Ruta target: /dashboard
                  </code>
                </div>

                <button
                  onClick={() => login("entrepreneur")}
                  className="w-full mt-6 py-3 bg-[#2f2c79] hover:bg-[#23215c] text-white font-bold rounded-2xl border border-[#38bdf8]/30 shadow-md text-xs flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  <span>Iniciar como Emprendedor</span>
                  <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
                </button>
              </div>

              {/* Option 2: Client */}
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-[#2f2c79] hover:border-[#38bdf8] transition-all text-left shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#2f2c79] text-[#38bdf8] flex items-center justify-center font-bold mb-3">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-lg text-white">2. Rol Cliente</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Acceso exclusivo a la interfaz de exploración y reserva de turnos en Argentina.
                  </p>
                  <code className="inline-block mt-3 px-2 py-1 bg-black/50 text-[#38bdf8] text-xs font-mono rounded">
                    Ruta target: /home
                  </code>
                </div>

                <button
                  onClick={() => login("client")}
                  className="w-full mt-6 py-3 bg-[#2f2c79] hover:bg-[#242261] text-white font-bold rounded-2xl border border-[#38bdf8]/30 shadow-md text-xs flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  <span>Iniciar como Cliente</span>
                  <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: ¿Qué es turnia? */}
        <QueEsTurnia />

        {/* Section: Planes para el Emprendedor */}
        <PlanesEmprendedor onSelectPlan={() => handleOpenRegister()} />

        {/* Section: ¿Por qué nos eligen? (Incluye el apartado de Condiciones de reserva y cancelación) */}
        <PorQueNosEligen />

      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modals */}
      <AuthModals
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />

    </div>
  );
}

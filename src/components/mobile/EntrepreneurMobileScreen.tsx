"use client";

import React, { useState } from "react";
import {
  Bell,
  Plus,
  Scissors,
  Calendar as CalendarIcon,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Check,
  Sparkles,
  Store,
} from "lucide-react";
import EntrepreneurBottomNav from "./EntrepreneurBottomNav";

export default function EntrepreneurMobileScreen() {
  const [activeNavTab, setActiveNavTab] = useState("panel");
  const [expandedService, setExpandedService] = useState<string | null>("1");
  const [servicios, setServicios] = useState([
    {
      id: "1",
      nombre: "Corte normal",
      precio: 4500,
      duracion: "40 min",
      descripcion: "Corte clásico con lavado y peinado incluido.",
      imagen:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "2",
      nombre: "Barba",
      precio: 4500,
      duracion: "40 min",
      descripcion: "Recorte, perfilado y toalla caliente para barba.",
      imagen:
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "3",
      nombre: "Corte + Barba",
      precio: 12500,
      duracion: "1 hs",
      descripcion: "Combo completo de corte de cabello y diseño de barba.",
      imagen:
        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80",
    },
  ]);

  const [turnos, setTurnos] = useState([
    {
      id: "1",
      horario: "10:00 - 10:40 hs",
      cliente: "Juan Pérez",
      servicio: "Corte normal",
      estado: "Pago 100%",
      estadoTipo: "pago",
    },
    {
      id: "2",
      horario: "11:00 - 12:00 hs",
      cliente: "Lucas Borgia",
      servicio: "Corte + Barba",
      estado: "Reservado",
      estadoTipo: "reservado",
    },
    {
      id: "3",
      horario: "12:00 - 12:40 hs",
      cliente: "Mateo Rossi",
      servicio: "Barba",
      estado: "Pago 100%",
      estadoTipo: "pago",
    },
  ]);

  const toggleExpand = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <div className="w-full h-full bg-slate-900 text-gray-900 flex flex-col justify-between overflow-hidden font-sans select-none border border-slate-700/50 shadow-2xl rounded-[38px] relative">
      
      {/* Smartphone Notch & Speaker Bar */}
      <div className="bg-slate-950 pt-2 pb-1 px-6 flex justify-between items-center text-[10px] text-gray-400 font-medium z-30 shrink-0">
        <span>09:41</span>
        <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2 bg-emerald-400 rounded-2xs inline-block"></span>
          <span>5G</span>
        </div>
      </div>

      {/* TOP HEADER */}
      <header className="bg-[#2f2c79] text-[#fbf1e9] px-4 py-3 flex items-center justify-between shadow-md shrink-0 z-20 border-b border-[#38bdf8]/20">
        {/* Logo Turnia */}
        <div className="flex items-center space-x-2">
          <img src="/Turnia-wh.svg" alt="Turnia" className="h-5 w-auto" />
          <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-400 text-gray-900 uppercase">
            Pro
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-3">
          <button className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
            <Bell className="w-4 h-4 text-[#38bdf8]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
          </button>
          
          {/* Avatar de Perfil */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#38bdf8] to-emerald-400 p-0.5 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Perfil"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* MAIN SCROLLABLE MOBILE BODY */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-3 space-y-3.5 scrollbar-thin">
        
        {/* Título Principal */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center space-x-2 text-[10px] font-bold text-[#0284c7] uppercase tracking-wider mb-0.5">
            <Store className="w-3 h-3 text-[#0284c7]" />
            <span>Mi Negocio Activo</span>
          </div>
          <h1 className="text-base font-black text-slate-900 leading-tight">
            Barbería Patagonia Cuts - Argentina
          </h1>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Argentina · Agenda Inteligente
          </p>
        </div>

        {/* TARJETA DESTACADA DE MÉTRICAS */}
        <div className="bg-gradient-to-br from-[#2f2c79] via-[#262366] to-[#1c1a4e] text-white p-3.5 rounded-2xl shadow-md border border-[#38bdf8]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#38bdf8]/10 rounded-full blur-xl"></div>
          
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-[#38bdf8] uppercase tracking-wider">
              Total ingresado este mes
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold flex items-center space-x-1 border border-emerald-500/30">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>+18.4%</span>
            </span>
          </div>

          <div className="text-2xl font-black tracking-tight text-[#fbf1e9]">
            $738.000 <span className="text-xs font-bold text-amber-300">ARS</span>
          </div>

          {/* Gráfico de línea ascendente */}
          <div className="mt-2 flex items-end justify-between h-8 pt-1 border-t border-white/10">
            <div className="flex space-x-1 items-end h-full">
              <div className="w-2.5 bg-sky-400/40 rounded-t h-[40%]"></div>
              <div className="w-2.5 bg-sky-400/60 rounded-t h-[60%]"></div>
              <div className="w-2.5 bg-sky-400/80 rounded-t h-[75%]"></div>
              <div className="w-2.5 bg-emerald-400 rounded-t h-[100%] shadow-sm"></div>
            </div>
            {/* SVG line sparkline */}
            <svg className="w-24 h-6 text-emerald-400 stroke-current" viewBox="0 0 100 30" fill="none">
              <path
                d="M0 25 Q 25 20, 50 12 T 100 2"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* SECCIÓN: APARTADO DE CORTES (SERVICIOS) */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
              <Scissors className="w-3.5 h-3.5 text-[#2f2c79]" />
              <span>Apartado de cortes (Servicios)</span>
            </h2>

            {/* BOTÓN VISIBLE: + Agregar servicio */}
            <button className="px-2.5 py-1 bg-[#2f2c79] hover:bg-[#23215c] text-white text-[10px] font-bold rounded-xl shadow-2xs flex items-center space-x-1 transition-all cursor-pointer">
              <Plus className="w-3 h-3 text-[#38bdf8]" />
              <span>+ Agregar servicio</span>
            </button>
          </div>

          {/* Tarjetas desplegables con imagen, nombre y precio */}
          <div className="space-y-2">
            {servicios.map((srv) => {
              const isExpanded = expandedService === srv.id;
              return (
                <div
                  key={srv.id}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/70 transition-all"
                >
                  <div
                    onClick={() => toggleExpand(srv.id)}
                    className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={srv.imagen}
                        alt={srv.nombre}
                        className="w-10 h-10 rounded-lg object-cover shadow-xs border border-slate-200"
                      />
                      <div>
                        <h3 className="text-xs font-bold text-slate-900">
                          {srv.nombre}
                        </h3>
                        <span className="text-[10px] text-slate-500 font-medium">
                          Duración: {srv.duracion}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-[#2f2c79] bg-sky-100/70 px-2 py-0.5 rounded-lg border border-sky-200/60">
                        ${srv.precio.toLocaleString("es-AR")} ARS
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Desplegable info */}
                  {isExpanded && (
                    <div className="px-3 pb-2.5 pt-1 text-[10px] text-slate-600 border-t border-slate-200/60 bg-white">
                      <p className="mb-2 leading-relaxed">{srv.descripcion}</p>
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-[10px] font-bold text-[#0284c7] hover:underline">
                          Editar precio
                        </button>
                        <span className="text-slate-300">•</span>
                        <button className="text-[10px] font-bold text-emerald-600 hover:underline">
                          Turno rápido
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECCIÓN: CALENDARIO DE TURNOS */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Calendario de Turnos</span>
            </h2>
            <span className="text-[9px] font-bold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Google Calendar</span>
            </span>
          </div>

          <p className="text-[10px] text-slate-500 mb-2">
            Turnos de hoy en Patagonia Cuts:
          </p>

          {/* Lista vertical del día con horarios y etiquetas de estado */}
          <div className="space-y-2">
            {turnos.map((t) => (
              <div
                key={t.id}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="font-extrabold text-slate-900 text-[11px]">
                      {t.horario}
                    </span>
                  </div>
                  <div className="text-[10px] font-medium text-slate-700 mt-0.5">
                    {t.cliente} <span className="text-slate-400">({t.servicio})</span>
                  </div>
                </div>

                {/* Etiquetas de estado visuales */}
                <div>
                  {t.estadoTipo === "pago" ? (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 font-black text-[10px] inline-flex items-center space-x-1">
                      <Check className="w-2.5 h-2.5" />
                      <span>{t.estado}</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 font-black text-[10px] inline-flex items-center space-x-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{t.estado}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR FOR ENTREPRENEUR */}
      <EntrepreneurBottomNav
        activeTab={activeNavTab}
        onSelectTab={setActiveNavTab}
      />
    </div>
  );
}

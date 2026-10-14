"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Search,
  Star,
  Calendar,
  ChevronDown,
  CheckCircle2,
  Scissors,
  User,
} from "lucide-react";
import ClientBottomNav from "./ClientBottomNav";
import MisTurnosView from "./MisTurnosView";

export default function ClientMobileScreen() {
  const [activeNavTab, setActiveNavTab] = useState("inicio");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Argentina");
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Check unread notification status from API
  const checkNotificationStatus = async () => {
    try {
      const res = await fetch("/api/bookings/user/usr_client_1");
      if (res.ok) {
        const data = await res.json();
        setHasUnreadNotification(Boolean(data.has_unread_notification));
      }
    } catch (err) {
      console.error("Error checking notification status:", err);
    }
  };

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const handleBookingSubmit = async (shopNombre: string, servicioNombre: string, precio: number) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "usr_client_1",
          userName: "Juan Pérez",
          userEmail: "juan.perez@gmail.com",
          localNombre: shopNombre,
          servicioNombre: servicioNombre,
          profesionalNombre: "Marcos Barber",
          precio: precio,
          startTimeISO: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
          endTimeISO: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
        }),
      });

      if (res.ok) {
        setBookedSuccess(true);
        setHasUnreadNotification(true);
        setTimeout(() => setBookedSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Error creating booking:", err);
    }
  };

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
  ];

  const filteredBarberias = barberias.filter((b) =>
    b.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* RENDER VIEW BASED ON ACTIVE NAVIGATION TAB */}
      {activeNavTab === "mis-turnos" ? (
        <div className="flex-1 overflow-hidden flex flex-col">
          <MisTurnosView
            onNotificationRead={() => {
              setHasUnreadNotification(false);
            }}
          />
        </div>
      ) : activeNavTab === "perfil" ? (
        <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-4">
          <div className="bg-[#2f2c79] text-white p-4 rounded-2xl text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#38bdf8] text-[#2f2c79] font-black text-2xl flex items-center justify-center mx-auto shadow-md">
              JP
            </div>
            <h3 className="font-bold text-base">Juan Pérez</h3>
            <p className="text-xs text-sky-200">juan.perez@gmail.com</p>
            <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-[#38bdf8] text-[10px] font-bold border border-sky-400/30">
              Cliente Argentina
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900">Configuración de Notificaciones</h4>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Recordatorios Google Calendar (24h)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Activo
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Push Notifications FCM (Punto Rojo)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Activo
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* INICIO & BÚSQUEDA VIEWS */
        <>
          {/* ENCABEZADO SUPERIOR */}
          <header className="bg-[#2f2c79] text-[#fbf1e9] px-4 py-3 flex items-center justify-between shadow-md shrink-0 z-20 border-b border-[#38bdf8]/20">
            {/* Logo de Turnia */}
            <div className="flex items-center space-x-2">
              <img src="/Turnia-wh.svg" alt="Turnia" className="h-5 w-auto" />
            </div>

            {/* Selector de Ubicación */}
            <div className="bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full border border-white/20 flex items-center space-x-1.5 cursor-pointer text-[11px] transition-colors">
              <MapPin className="w-3 h-3 text-[#38bdf8]" />
              <span className="font-bold text-white tracking-tight">{selectedLocation}</span>
              <ChevronDown className="w-3 h-3 text-gray-300" />
            </div>
          </header>

          {/* MAIN SCROLLABLE MOBILE BODY */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-3 space-y-3.5 scrollbar-thin">
            
            {/* TÍTULO PRINCIPAL */}
            <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent p-3 rounded-2xl border border-sky-100/70 shadow-2xs">
              <span className="text-[10px] uppercase font-black tracking-wider text-[#0284c7] block mb-0.5">
                RESERVA ONLINE EN ARGENTINA
              </span>
              <h1 className="text-base font-black text-slate-900 leading-tight">
                Locales virtuales y reserva de turnos
              </h1>
            </div>

            {/* BARRA DE BÚSQUEDA PROMINENTE */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar barbería por nombre en Argentina..."
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2f2c79] shadow-xs text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Notification notification when booked */}
            {bookedSuccess && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-xs flex items-center space-x-2 animate-bounce shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block text-[11px]">¡Turno Reservado & Sincronizado en Google Calendar!</span>
                  <span className="text-[10px]">Barbería Patagonia Cuts — Alerta 24h configurada</span>
                </div>
              </div>
            )}

            {/* SECCIÓN: BARBERÍAS DE LA ZONA ABIERTAS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-slate-900 flex items-center space-x-1">
                  <Scissors className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Barberías de la zona abiertas</span>
                </h2>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {filteredBarberias.length} disponibles
                </span>
              </div>

              {/* Tarjetas verticales de barberías locales */}
              <div className="space-y-3">
                {filteredBarberias.map((shop) => (
                  <div
                    key={shop.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                  >
                    {/* Foto de Portada */}
                    <div className="h-32 w-full relative bg-slate-200 overflow-hidden">
                      <img
                        src={shop.imagen}
                        alt={shop.nombre}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-black shadow-xs">
                          {shop.estado}
                        </span>
                      </div>
                    </div>

                    {/* Contenido de la tarjeta */}
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-black text-slate-900 text-sm">
                          {shop.nombre}
                        </h3>
                        <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{shop.rating}</span>
                        </div>
                      </div>

                      <p className="text-[10px] font-semibold text-[#0284c7] mb-1">
                        {shop.precioRango}
                      </p>

                      <div className="flex items-center space-x-1 text-[10px] text-slate-500 mb-3">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{shop.ubicacion}</span>
                      </div>

                      {/* BOTÓN PRINCIPAL DE ACCIÓN: Reservar Turno */}
                      <button
                        onClick={() =>
                          handleBookingSubmit(shop.nombre, "Corte + Barba", 12500)
                        }
                        className="w-full py-2 bg-[#2f2c79] hover:bg-[#23215c] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span>Reservar Turno</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      )}

      {/* BOTTOM NAVIGATION BAR FOR CLIENT WITH RED DOT NOTIFICATION BADGE */}
      <ClientBottomNav
        activeTab={activeNavTab}
        hasUnreadNotification={hasUnreadNotification}
        onSelectTab={(tab) => {
          setActiveNavTab(tab);
          if (tab === "mis-turnos") {
            // Re-check notifications when switching to Mis Turnos
            checkNotificationStatus();
          }
        }}
      />
    </div>
  );
}

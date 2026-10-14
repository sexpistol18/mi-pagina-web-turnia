"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  XCircle,
  CheckCircle2,
  Bell,
  Sparkles,
  Scissors,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Booking } from "@/lib/bookingsStore";

interface MisTurnosViewProps {
  onNotificationRead?: () => void;
}

export default function MisTurnosView({ onNotificationRead }: MisTurnosViewProps) {
  const [activeTab, setActiveTab] = useState<"proximos" | "historial">("proximos");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings/user/usr_client_1");
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleMarkAsRead = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/notifications/read/${bookingId}`, {
        method: "PATCH",
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, has_unread_notification: false } : b
          )
        );
        if (onNotificationRead) onNotificationRead();
      }
    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  };

  const handleOpenGoogleCalendar = (bk: Booking) => {
    if (bk.has_unread_notification) {
      handleMarkAsRead(bk.id);
    }
    if (bk.googleCalendarUrl) {
      window.open(bk.googleCalendarUrl, "_blank");
    } else {
      const encode = encodeURIComponent;
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encode(
        `Turno en ${bk.localNombre} - ${bk.servicioNombre}`
      )}&details=${encode(
        `Servicio: ${bk.servicioNombre}\nDirección: ${bk.localDireccion}`
      )}&location=${encode(bk.localDireccion)}`;
      window.open(gcalUrl, "_blank");
    }
  };

  const handleCancelTurno = async (bookingId: string) => {
    if (confirm("¿Estás seguro que deseas cancelar este turno?")) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, estado: "Cancelado" } : b))
      );
    }
  };

  const proximosTurnos = bookings.filter(
    (b) => b.estado === "Confirmado" || b.estado === "Pendiente"
  );
  const historialTurnos = bookings.filter(
    (b) => b.estado === "Completado" || b.estado === "Cancelado"
  );

  const displayedTurnos = activeTab === "proximos" ? proximosTurnos : historialTurnos;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("es-AR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    } catch {
      return "Hoy";
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return "15:00 hs";
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Banner Header */}
      <div className="bg-[#2f2c79] text-[#fbf1e9] p-3.5 pb-4 border-b border-[#38bdf8]/20 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-[#38bdf8] uppercase tracking-wider block">
              Agenda Personal
            </span>
            <h2 className="text-base font-black text-white">Mis Turnos</h2>
          </div>
          <button
            onClick={fetchBookings}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#38bdf8] transition-colors cursor-pointer"
            title="Actualizar turnos"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Tab Switcher: "Próximos Turnos" vs "Historial de Turnos" */}
        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-white/10 mt-3 space-x-1">
          <button
            onClick={() => setActiveTab("proximos")}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer flex items-center justify-center space-x-1 ${
              activeTab === "proximos"
                ? "bg-[#38bdf8] text-slate-950 shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Próximos ({proximosTurnos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("historial")}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer flex items-center justify-center space-x-1 ${
              activeTab === "historial"
                ? "bg-[#38bdf8] text-slate-950 shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Historial ({historialTurnos.length})</span>
          </button>
        </div>
      </div>

      {/* Main List Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
            <div className="w-6 h-6 border-2 border-[#2f2c79] border-t-transparent rounded-full animate-spin"></div>
            <span>Cargando tus turnos...</span>
          </div>
        ) : displayedTurnos.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-xs">No hay turnos registrados</h3>
            <p className="text-[10px] text-slate-500">
              {activeTab === "proximos"
                ? "Buscá una barbería en Argentina y agendá tu primer turno."
                : "Aún no tenés historial de turnos pasados."}
            </p>
          </div>
        ) : (
          displayedTurnos.map((bk) => (
            <div
              key={bk.id}
              onClick={() => bk.has_unread_notification && handleMarkAsRead(bk.id)}
              className={`bg-white rounded-2xl border transition-all p-3 shadow-2xs relative ${
                bk.has_unread_notification
                  ? "border-red-500 ring-2 ring-red-400/30 bg-red-50/10"
                  : "border-slate-200"
              }`}
            >
              {/* PUNTO ROJO BRILLANTE DE NOTIFICACIÓN NO LEÍDA */}
              {bk.has_unread_notification && (
                <div className="absolute -top-1.5 -right-1.5 flex items-center space-x-1 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md animate-pulse z-10 border border-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span>Recordatorio 24h</span>
                </div>
              )}

              {/* Card Header: Local & Status Badge */}
              <div className="flex items-center space-x-3 mb-2.5">
                <img
                  src={bk.localImagen}
                  alt={bk.localNombre}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-slate-900 text-xs truncate">
                      {bk.localNombre}
                    </h3>

                    {/* Badge de estado */}
                    {bk.estado === "Confirmado" && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-[9px]">
                        Confirmado
                      </span>
                    )}
                    {bk.estado === "Pendiente" && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 font-extrabold text-[9px]">
                        Pendiente
                      </span>
                    )}
                    {bk.estado === "Completado" && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-300 font-extrabold text-[9px]">
                        Completado
                      </span>
                    )}
                    {bk.estado === "Cancelado" && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-300 font-extrabold text-[9px]">
                        Cancelado
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] font-bold text-[#0284c7] mt-0.5 truncate">
                    {bk.servicioNombre} ({bk.profesionalNombre})
                  </p>
                </div>
              </div>

              {/* Fecha y Hora exactas */}
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80 flex items-center justify-between text-[10px] mb-3">
                <div className="flex items-center space-x-1.5 text-slate-700">
                  <Calendar className="w-3 h-3 text-[#2f2c79]" />
                  <span className="font-bold">{formatDate(bk.startTimeISO)}</span>
                  <span className="text-slate-400">•</span>
                  <Clock className="w-3 h-3 text-[#2f2c79]" />
                  <span className="font-extrabold text-[#2f2c79]">
                    {formatTime(bk.startTimeISO)} hs
                  </span>
                </div>

                <span className="font-black text-slate-900">
                  ${bk.precio.toLocaleString("es-AR")} ARS
                </span>
              </div>

              {/* Quick Action Buttons */}
              {bk.estado === "Confirmado" && (
                <div className="flex items-center space-x-2 pt-1 border-t border-slate-100">
                  {/* Botón: Agregar/Ver en Google Calendar */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenGoogleCalendar(bk);
                    }}
                    className="flex-1 py-1.5 px-2 bg-[#2f2c79] hover:bg-[#23215c] text-white text-[10px] font-extrabold rounded-lg shadow-2xs flex items-center justify-center space-x-1 cursor-pointer transition-all active:scale-95"
                  >
                    <ExternalLink className="w-3 h-3 text-[#38bdf8]" />
                    <span>Ver en Google Calendar</span>
                  </button>

                  {/* Botón: Cancelar Turno */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelTurno(bk.id);
                    }}
                    className="py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

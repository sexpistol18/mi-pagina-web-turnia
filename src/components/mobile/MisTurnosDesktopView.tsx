"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  XCircle,
  CheckCircle2,
  RefreshCw,
  Scissors,
  AlertCircle,
} from "lucide-react";
import { Booking } from "@/lib/bookingsStore";

interface MisTurnosDesktopViewProps {
  onNotificationRead?: () => void;
}

export default function MisTurnosDesktopView({ onNotificationRead }: MisTurnosDesktopViewProps) {
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
      const res = await fetch(`/api/notifications/read/${bookingId}`, { method: "PATCH" });
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
    if (bk.has_unread_notification) handleMarkAsRead(bk.id);
    const encode = encodeURIComponent;
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encode(
      `Turno en ${bk.localNombre} - ${bk.servicioNombre}`
    )}&details=${encode(`Servicio: ${bk.servicioNombre}`)}&location=${encode(bk.localDireccion)}`;
    window.open(gcalUrl, "_blank");
  };

  const handleCancelTurno = (bookingId: string) => {
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

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("es-AR", {
        weekday: "long", day: "numeric", month: "long",
      });
    } catch { return "Hoy"; }
  };

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString("es-AR", {
        hour: "2-digit", minute: "2-digit", hour12: false,
      });
    } catch { return "15:00"; }
  };

  const unreadCount = bookings.filter(b => b.has_unread_notification).length;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#38bdf8]" />
            Mis Turnos
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Agenda personal · Próximos y historial de turnos
          </p>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 max-w-sm">
        <button
          onClick={() => setActiveTab("proximos")}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "proximos"
              ? "bg-[#38bdf8] text-slate-950 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Próximos ({proximosTurnos.length})
          {unreadCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("historial")}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "historial"
              ? "bg-[#38bdf8] text-slate-950 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          Historial ({historialTurnos.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center bg-slate-900 rounded-3xl border border-slate-800 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#2f2c79] border-t-[#38bdf8] rounded-full animate-spin" />
          <span className="text-slate-400 text-sm">Cargando turnos...</span>
        </div>
      ) : displayedTurnos.length === 0 ? (
        <div className="py-20 text-center bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
          <Calendar className="w-12 h-12 text-slate-700 mx-auto" />
          <h3 className="font-bold text-slate-500 text-base">No hay turnos registrados</h3>
          <p className="text-sm text-slate-600 max-w-xs mx-auto">
            {activeTab === "proximos"
              ? "Buscá una barbería y agendá tu primer turno."
              : "Aún no tenés historial de turnos pasados."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedTurnos.map((bk) => (
            <div
              key={bk.id}
              onClick={() => bk.has_unread_notification && handleMarkAsRead(bk.id)}
              className={`bg-slate-900 rounded-3xl border shadow-xl p-5 relative flex flex-col justify-between transition-all cursor-pointer group ${
                bk.has_unread_notification
                  ? "border-red-500 ring-2 ring-red-400/20"
                  : "border-slate-800 hover:border-[#38bdf8]/40"
              }`}
            >
              {/* Notification Badge */}
              {bk.has_unread_notification && (
                <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-lg animate-pulse border-2 border-slate-900 z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Recordatorio 24h
                </div>
              )}

              {/* Card Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-700 shrink-0">
                  <img
                    src={bk.localImagen}
                    alt={bk.localNombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-white text-sm truncate">{bk.localNombre}</h3>
                    {bk.estado === "Confirmado" && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold shrink-0">
                        Confirmado
                      </span>
                    )}
                    {bk.estado === "Pendiente" && (
                      <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold shrink-0">
                        Pendiente
                      </span>
                    )}
                    {bk.estado === "Completado" && (
                      <span className="px-2 py-0.5 rounded-lg bg-slate-700 text-slate-300 border border-slate-600 text-[10px] font-extrabold shrink-0">
                        Completado
                      </span>
                    )}
                    {bk.estado === "Cancelado" && (
                      <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-extrabold shrink-0">
                        Cancelado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#38bdf8] font-bold mt-0.5 truncate">
                    {bk.servicioNombre} ({bk.profesionalNombre})
                  </p>
                </div>
              </div>

              {/* Date/Time + Price */}
              <div className="bg-slate-800 rounded-2xl p-3 flex items-center justify-between text-xs mb-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-[#2f2c79]" />
                  <span className="font-bold">{formatDate(bk.startTimeISO)}</span>
                  <span className="text-slate-500">·</span>
                  <Clock className="w-3.5 h-3.5 text-[#2f2c79]" />
                  <span className="font-extrabold text-[#38bdf8]">{formatTime(bk.startTimeISO)} hs</span>
                </div>
                <span className="font-black text-white">
                  ${bk.precio.toLocaleString("es-AR")} ARS
                </span>
              </div>

              {/* Actions */}
              {bk.estado === "Confirmado" && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleOpenGoogleCalendar(bk); }}
                    className="flex-1 py-2 px-3 bg-[#2f2c79] hover:bg-[#23215c] text-white text-xs font-extrabold rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#38bdf8]" />
                    Ver en Google Calendar
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCancelTurno(bk.id); }}
                    className="py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

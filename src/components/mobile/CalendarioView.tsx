"use client";

import React, { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";

interface Turno {
  id: string;
  horario: string;
  cliente: string;
  servicio: string;
  estado: "pago" | "reservado" | "libre";
  estadoLabel: string;
}

const TURNOS_POR_DIA: Record<string, Turno[]> = {
  "2026-10-13": [
    { id: "1", horario: "10:00 - 10:40 hs", cliente: "Juan Pérez", servicio: "Corte normal", estado: "pago", estadoLabel: "Pago 100%" },
    { id: "2", horario: "11:00 - 12:00 hs", cliente: "Lucas Borgia", servicio: "Corte + Barba", estado: "reservado", estadoLabel: "Señado 50%" },
    { id: "3", horario: "12:00 - 12:40 hs", cliente: "", servicio: "", estado: "libre", estadoLabel: "Libre" },
    { id: "4", horario: "14:00 - 14:40 hs", cliente: "Mateo Rossi", servicio: "Barba", estado: "pago", estadoLabel: "Pago 100%" },
    { id: "5", horario: "15:00 - 15:40 hs", cliente: "", servicio: "", estado: "libre", estadoLabel: "Libre" },
    { id: "6", horario: "16:00 - 17:00 hs", cliente: "Carlos Vega", servicio: "Corte + Barba", estado: "reservado", estadoLabel: "Señado 50%" },
  ],
  "2026-10-14": [
    { id: "7", horario: "09:00 - 09:40 hs", cliente: "Diego Ruiz", servicio: "Corte normal", estado: "pago", estadoLabel: "Pago 100%" },
    { id: "8", horario: "10:00 - 10:40 hs", cliente: "", servicio: "", estado: "libre", estadoLabel: "Libre" },
    { id: "9", horario: "11:00 - 12:00 hs", cliente: "Nicolás Farías", servicio: "Corte + Barba", estado: "reservado", estadoLabel: "Señado 50%" },
  ],
  "2026-10-15": [
    { id: "10", horario: "10:00 - 10:40 hs", cliente: "Tomás Herrera", servicio: "Barba", estado: "pago", estadoLabel: "Pago 100%" },
    { id: "11", horario: "11:00 - 11:40 hs", cliente: "", servicio: "", estado: "libre", estadoLabel: "Libre" },
    { id: "12", horario: "14:00 - 15:00 hs", cliente: "Rodrigo Paz", servicio: "Corte + Barba", estado: "pago", estadoLabel: "Pago 100%" },
  ],
};

const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function CalendarioView() {
  const today = new Date(2026, 9, 13);
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const iso = toISODate(selectedDate);
  const turnos = TURNOS_POR_DIA[iso] || [];

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calDays: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1));

  const turnosPagados = turnos.filter((t) => t.estado === "pago").length;
  const turnosReservados = turnos.filter((t) => t.estado === "reservado").length;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#38bdf8]" />
            Calendario de Turnos
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Vinculado con Google Calendar · Actualización automática
          </p>
        </div>
        <a
          href="https://calendar.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2f2c79] hover:bg-[#23215c] text-white text-xs font-bold rounded-xl border border-[#38bdf8]/30 transition-all shadow-md"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#38bdf8]" />
          Abrir Google Calendar
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mini Calendar */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-black text-white">
              {MESES[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DIAS_SEMANA.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] font-extrabold text-slate-500 uppercase"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calDays.map((day, idx) => {
              if (!day) return <div key={idx} />;
              const date = new Date(year, month, day);
              const dateIso = toISODate(date);
              const isSelected = toISODate(selectedDate) === dateIso;
              const isToday = toISODate(today) === dateIso;
              const hasTurnos = Boolean(TURNOS_POR_DIA[dateIso]?.length);
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(date)}
                  className={`relative flex flex-col items-center justify-center h-9 rounded-xl text-xs font-bold transition-all cursor-pointer
                    ${
                      isSelected
                        ? "bg-[#38bdf8] text-slate-950 shadow-md scale-105"
                        : isToday
                        ? "bg-[#2f2c79]/70 text-[#38bdf8] border border-[#38bdf8]/40"
                        : "text-slate-300 hover:bg-slate-800"
                    }
                  `}
                >
                  {day}
                  {hasTurnos && !isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Tiene turnos
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] inline-block" />
              Día seleccionado
            </div>
          </div>
        </div>

        {/* Day Schedule */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col min-h-[340px]">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {DIAS_SEMANA[selectedDate.getDay()]} {selectedDate.getDate()} de{" "}
                {MESES[selectedDate.getMonth()]}
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {turnosPagados} pagados
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {turnosReservados} señados
                </span>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2f2c79] hover:bg-[#23215c] text-white text-[11px] font-bold rounded-xl border border-[#38bdf8]/30 transition-all cursor-pointer">
              <Plus className="w-3.5 h-3.5 text-[#38bdf8]" />
              Nuevo turno
            </button>
          </div>

          {turnos.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-500 space-y-2">
              <Calendar className="w-10 h-10 text-slate-700" />
              <p className="text-sm font-bold text-slate-600">Sin turnos para este día</p>
              <p className="text-xs text-slate-500">
                Seleccioná otro día o agregá un turno nuevo.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
              {turnos.map((t) => (
                <div
                  key={t.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all group
                    ${
                      t.estado === "libre"
                        ? "bg-slate-950/60 border-slate-800 border-dashed opacity-70"
                        : t.estado === "pago"
                        ? "bg-emerald-950/40 border-emerald-500/30"
                        : "bg-amber-950/30 border-amber-500/30"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-10 rounded-full shrink-0 ${
                        t.estado === "pago"
                          ? "bg-emerald-400"
                          : t.estado === "reservado"
                          ? "bg-amber-400"
                          : "bg-slate-700"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm font-black text-white">{t.horario}</span>
                      </div>
                      {t.estado !== "libre" ? (
                        <div className="text-xs text-slate-300 mt-0.5">
                          <span className="font-bold text-[#38bdf8]">{t.cliente}</span>
                          <span className="text-slate-500"> · {t.servicio}</span>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic mt-0.5">
                          Horario disponible
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {t.estado === "pago" && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/40 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {t.estadoLabel}
                      </span>
                    )}
                    {t.estado === "reservado" && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-extrabold text-[10px] border border-amber-500/40 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {t.estadoLabel}
                      </span>
                    )}
                    {t.estado === "libre" && (
                      <button className="px-2.5 py-1 rounded-lg bg-[#2f2c79]/50 text-[#38bdf8] font-extrabold text-[10px] border border-[#38bdf8]/30 hover:bg-[#2f2c79] transition-all cursor-pointer flex items-center gap-1">
                        <Plus className="w-3 h-3" />
                        Agendar
                      </button>
                    )}
                    {t.estado !== "libre" && (
                      <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Google Calendar Sync Status */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Google Calendar Sync Activo
          </span>
          <span className="text-xs text-slate-500">
            · Los turnos se sincronizan automáticamente
          </span>
        </div>
        <a
          href="https://calendar.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#38bdf8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          Ver todos los eventos <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

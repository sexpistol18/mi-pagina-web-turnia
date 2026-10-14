"use client";

import React, { useState } from "react";
import {
  Settings,
  Store,
  Bell,
  Clock,
  CreditCard,
  Pencil,
  Check,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  X,
} from "lucide-react";

interface HorarioItem {
  dia: string;
  desde: string;
  hasta: string;
  abierto: boolean;
}

const HORARIOS_INICIALES: HorarioItem[] = [
  { dia: "Lunes", desde: "09:00", hasta: "20:00", abierto: true },
  { dia: "Martes", desde: "09:00", hasta: "20:00", abierto: true },
  { dia: "Miércoles", desde: "09:00", hasta: "20:00", abierto: true },
  { dia: "Jueves", desde: "09:00", hasta: "20:00", abierto: true },
  { dia: "Viernes", desde: "09:00", hasta: "20:00", abierto: true },
  { dia: "Sábado", desde: "09:00", hasta: "14:00", abierto: true },
  { dia: "Domingo", desde: "09:00", hasta: "14:00", abierto: false },
];

export default function AjustesView() {
  const [nombreTienda, setNombreTienda] = useState("Barbería Patagonia Cuts - Argentina");
  const [editNombre, setEditNombre] = useState(false);
  const [telefono, setTelefono] = useState("+54 294 123-4567");
  const [email, setEmail] = useState("patagonia.cuts@gmail.com");
  const [direccion, setDireccion] = useState("Av. Alvear 840, Argentina");

  const [horarios, setHorarios] = useState<HorarioItem[]>(HORARIOS_INICIALES);
  const [duracionTurno, setDuracionTurno] = useState<"40 min" | "1 hora">("40 min");
  const [cancelacion24h, setCancelacion24h] = useState(true);
  const [recordatorioAuto, setRecordatorioAuto] = useState(true);
  const [mercadoPago, setMercadoPago] = useState(true);
  const [pagoTotal, setPagoTotal] = useState(true);
  const [pagoSena, setPagoSena] = useState(true);

  const [saved, setSaved] = useState(false);

  const toggleHorario = (dia: string) => {
    setHorarios((prev) =>
      prev.map((h) => (h.dia === dia ? { ...h, abierto: !h.abierto } : h))
    );
  };

  const updateHorario = (dia: string, campo: "desde" | "hasta", valor: string) => {
    setHorarios((prev) =>
      prev.map((h) => (h.dia === dia ? { ...h, [campo]: valor } : h))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#38bdf8]" />
            Ajustes del negocio
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configurá los datos, horarios y métodos de pago de tu barbería
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
        >
          {saved ? <Check className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          {saved ? "¡Guardado!" : "Guardar cambios"}
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-950 border border-emerald-500/50 text-emerald-300 p-3 rounded-2xl flex items-center gap-2 text-sm font-bold animate-pulse">
          <Check className="w-4 h-4 text-emerald-400" />
          Configuración guardada exitosamente.
        </div>
      )}

      {/* Info del negocio */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Store className="w-5 h-5 text-[#38bdf8]" />
          <h3 className="font-black text-white text-base">Información del negocio</h3>
        </div>

        <div className="space-y-4">
          {/* Nombre tienda */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">
              Nombre de la barbería
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={nombreTienda}
                onChange={(e) => setNombreTienda(e.target.value)}
                disabled={!editNombre}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm border transition-all ${
                  editNombre
                    ? "bg-slate-800 border-[#38bdf8] text-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                    : "bg-slate-800/50 border-slate-700 text-slate-300 cursor-not-allowed"
                }`}
              />
              <button
                onClick={() => setEditNombre(!editNombre)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-[#2f2c79] text-slate-400 hover:text-[#38bdf8] transition-all cursor-pointer border border-slate-700"
              >
                {editNombre ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                <Phone className="w-3 h-3" /> Teléfono
              </label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                <Mail className="w-3 h-3" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Dirección
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
            />
          </div>
        </div>
      </div>

      {/* Horarios de atención */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-amber-400" />
          <h3 className="font-black text-white text-base">Horarios de atención</h3>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold">Duración por turno:</span>
          <div className="flex gap-2">
            {(["40 min", "1 hora"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDuracionTurno(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  duracionTurno === d
                    ? "bg-[#2f2c79] text-[#38bdf8] border border-[#38bdf8]/40"
                    : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          {horarios.map((h) => (
            <div
              key={h.dia}
              className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                h.abierto ? "bg-slate-800/60 border-slate-700" : "bg-slate-900 border-slate-800 opacity-60"
              }`}
            >
              <button
                onClick={() => toggleHorario(h.dia)}
                className="cursor-pointer transition-colors"
              >
                {h.abierto ? (
                  <ToggleRight className="w-6 h-6 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-600" />
                )}
              </button>
              <span className="text-sm font-bold text-white w-24 shrink-0">{h.dia}</span>
              {h.abierto ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={h.desde}
                    onChange={(e) => updateHorario(h.dia, "desde", e.target.value)}
                    className="px-2 py-1 bg-slate-700 border border-slate-600 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#38bdf8]"
                  />
                  <span className="text-slate-500 text-xs">→</span>
                  <input
                    type="time"
                    value={h.hasta}
                    onChange={(e) => updateHorario(h.dia, "hasta", e.target.value)}
                    className="px-2 py-1 bg-slate-700 border border-slate-600 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#38bdf8]"
                  />
                </div>
              ) : (
                <span className="text-xs text-slate-500 italic">Cerrado</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notificaciones */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-[#38bdf8]" />
          <h3 className="font-black text-white text-base">Notificaciones automáticas</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div>
              <p className="text-sm font-bold text-white">Recordatorio automático (24 hs antes)</p>
              <p className="text-xs text-slate-400">Se notifica al cliente por Google Calendar</p>
            </div>
            <button onClick={() => setCancelacion24h(!cancelacion24h)} className="cursor-pointer">
              {cancelacion24h ? (
                <ToggleRight className="w-7 h-7 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-slate-600" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-bold text-white">Confirmación de turno instantánea</p>
              <p className="text-xs text-slate-400">El cliente recibe confirmación al agendar</p>
            </div>
            <button onClick={() => setRecordatorioAuto(!recordatorioAuto)} className="cursor-pointer">
              {recordatorioAuto ? (
                <ToggleRight className="w-7 h-7 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-[#009ee3]" />
          <h3 className="font-black text-white text-base">Métodos de pago</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#009ee3]/20 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-[#009ee3]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Mercado Pago</p>
                <p className="text-xs text-slate-400">Integración oficial con Mercado Pago</p>
              </div>
            </div>
            <button onClick={() => setMercadoPago(!mercadoPago)} className="cursor-pointer">
              {mercadoPago ? (
                <ToggleRight className="w-7 h-7 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-slate-600" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div>
              <p className="text-sm font-bold text-white">Permitir pago total</p>
              <p className="text-xs text-slate-400">El cliente puede pagar el 100% al agendar</p>
            </div>
            <button onClick={() => setPagoTotal(!pagoTotal)} className="cursor-pointer">
              {pagoTotal ? (
                <ToggleRight className="w-7 h-7 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-slate-600" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-bold text-white">Permitir seña (50%)</p>
              <p className="text-xs text-slate-400">El cliente puede abonar solo la mitad</p>
            </div>
            <button onClick={() => setPagoSena(!pagoSena)} className="cursor-pointer">
              {pagoSena ? (
                <ToggleRight className="w-7 h-7 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Política de cancelación */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-amber-400" />
          <h3 className="font-black text-white text-base">Política de cancelación</h3>
        </div>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            Los turnos se deben cancelar con 24 hs de anticipación.
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            Si el cliente no asiste y no avisa, el dinero no se devuelve.
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            El cliente puede pagar el total o abonar el 50% para guardar su turno.
          </li>
        </ul>
      </div>
    </div>
  );
}

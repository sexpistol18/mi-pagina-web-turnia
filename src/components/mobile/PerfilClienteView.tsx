"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Pencil,
  Check,
  Star,
  Calendar,
  LogOut,
  ToggleLeft,
  ToggleRight,
  Camera,
  Key,
  ChevronRight,
} from "lucide-react";

interface Turno {
  id: string;
  barberia: string;
  servicio: string;
  fecha: string;
  estado: "completado" | "cancelado";
  precio: number;
}

const HISTORIAL: Turno[] = [
  { id: "1", barberia: "Barbería Patagonia Cuts", servicio: "Corte normal", fecha: "Sáb 10 Oct", estado: "completado", precio: 8500 },
  { id: "2", barberia: "Cordillera Barber", servicio: "Corte + Barba", fecha: "Mié 7 Oct", estado: "completado", precio: 13000 },
  { id: "3", barberia: "Barbería La Posta", servicio: "Barba", fecha: "Lun 5 Oct", estado: "cancelado", precio: 5500 },
];

interface PerfilClienteViewProps {
  onLogout?: () => void;
}

export default function PerfilClienteView({ onLogout }: PerfilClienteViewProps) {
  const [nombre, setNombre] = useState("Juan Pérez");
  const [editNombre, setEditNombre] = useState(false);
  const [email] = useState("juan.perez@gmail.com");
  const [telefono, setTelefono] = useState("+54 294 456-7890");
  const [editTelefono, setEditTelefono] = useState(false);

  const [notifGCal, setNotifGCal] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditNombre(false);
    setEditTelefono(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalGastado = HISTORIAL.filter(t => t.estado === "completado").reduce((acc, t) => acc + t.precio, 0);
  const turnosCompletados = HISTORIAL.filter(t => t.estado === "completado").length;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <User className="w-6 h-6 text-[#38bdf8]" />
            Mi Perfil
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Administrá tu cuenta y preferencias
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Check className="w-4 h-4" />
          {saved ? "¡Guardado!" : "Guardar cambios"}
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-950 border border-emerald-500/50 text-emerald-300 p-3 rounded-2xl flex items-center gap-2 text-sm font-bold">
          <Check className="w-4 h-4 text-emerald-400" />
          Perfil actualizado correctamente.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna izquierda: Avatar + Stats */}
        <div className="flex flex-col gap-4">
          {/* Avatar Card */}
          <div className="bg-gradient-to-br from-[#2f2c79] via-[#262366] to-[#1c1a4e] rounded-3xl p-6 border border-[#38bdf8]/30 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#38bdf8]/10 rounded-full blur-2xl" />

            <div className="relative w-20 h-20 mx-auto mb-3">
              <div className="w-20 h-20 rounded-full bg-[#38bdf8] text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg border-4 border-[#2f2c79]">
                JP
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors">
                <Camera className="w-3.5 h-3.5 text-[#38bdf8]" />
              </button>
            </div>

            <h3 className="font-black text-white text-lg">{nombre}</h3>
            <p className="text-xs text-sky-300 mb-1">{email}</p>
            <span className="inline-block px-3 py-1 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] text-[10px] font-bold border border-[#38bdf8]/30">
              Cliente · Argentina
            </span>
          </div>

          {/* Stats */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
            <h4 className="font-black text-white text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Resumen de actividad
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 rounded-2xl p-3 text-center">
                <p className="text-2xl font-black text-[#38bdf8]">{turnosCompletados}</p>
                <p className="text-[10px] text-slate-400">Turnos realizados</p>
              </div>
              <div className="bg-slate-800 rounded-2xl p-3 text-center">
                <p className="text-xl font-black text-emerald-300">
                  ${(totalGastado / 1000).toFixed(1)}k
                </p>
                <p className="text-[10px] text-slate-400">ARS gastados</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center justify-center gap-2 w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold rounded-2xl text-sm border border-rose-500/30 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          )}
        </div>

        {/* Columna derecha: Info + Config */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* Datos personales */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-[#38bdf8]" />
              <h4 className="font-black text-white text-sm">Datos personales</h4>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">
                  Nombre completo
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    disabled={!editNombre}
                    className={`flex-1 px-3 py-2.5 rounded-xl text-sm border transition-all ${
                      editNombre
                        ? "bg-slate-800 border-[#38bdf8] text-white focus:outline-none"
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

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email (no editable)
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-3 py-2.5 bg-slate-800/40 border border-slate-700 rounded-xl text-sm text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Teléfono
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    disabled={!editTelefono}
                    className={`flex-1 px-3 py-2.5 rounded-xl text-sm border transition-all ${
                      editTelefono
                        ? "bg-slate-800 border-[#38bdf8] text-white focus:outline-none"
                        : "bg-slate-800/50 border-slate-700 text-slate-300 cursor-not-allowed"
                    }`}
                  />
                  <button
                    onClick={() => setEditTelefono(!editTelefono)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-[#2f2c79] text-slate-400 hover:text-[#38bdf8] transition-all cursor-pointer border border-slate-700"
                  >
                    {editTelefono ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-amber-400" />
              <h4 className="font-black text-white text-sm">Notificaciones</h4>
            </div>
            <div className="space-y-3">
              {[
                { label: "Recordatorios Google Calendar (24hs antes)", sublabel: "Recibís alerta 24 hs antes de tu turno", val: notifGCal, set: setNotifGCal },
                { label: "Push Notifications", sublabel: "Notificaciones en tiempo real en tu dispositivo", val: notifPush, set: setNotifPush },
                { label: "Notificaciones por Email", sublabel: "Resumen y confirmaciones por correo", val: notifEmail, set: setNotifEmail },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.sublabel}</p>
                  </div>
                  <button onClick={() => item.set(!item.val)} className="cursor-pointer shrink-0 ml-3">
                    {item.val ? (
                      <ToggleRight className="w-7 h-7 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-600" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Historial rápido */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-[#38bdf8]" />
              <h4 className="font-black text-white text-sm">Últimos turnos</h4>
            </div>
            <div className="space-y-2.5">
              {HISTORIAL.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-800 border border-slate-700"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{t.barberia}</p>
                    <p className="text-[10px] text-slate-400">{t.servicio} · {t.fecha}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#38bdf8]">
                      ${t.precio.toLocaleString("es-AR")}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold ${
                        t.estado === "completado"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      {t.estado === "completado" ? "Completado" : "Cancelado"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

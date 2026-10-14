"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Calendar,
  SlidersHorizontal,
  X,
  Clock,
  CheckCircle2,
  CreditCard,
  ChevronDown,
} from "lucide-react";

interface Barberia {
  id: string;
  nombre: string;
  rating: string;
  reviewsCount: number;
  precioRango: string;
  ubicacion: string;
  estado: string;
  imagen: string;
  tags: string[];
  descripcion: string;
}

const BARBERIAS: Barberia[] = [
  {
    id: "1",
    nombre: "Barbería Patagonia Cuts",
    rating: "4.9",
    reviewsCount: 128,
    precioRango: "$$ · $4.500 - $12.500 ARS",
    ubicacion: "Av. Alvear 840, Argentina",
    estado: "Abierto ahora",
    imagen: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=500&q=80",
    tags: ["Corte Clásico", "Barba Fade", "Mercado Pago"],
    descripcion: "La mejor barbería de Argentina con años de experiencia.",
  },
  {
    id: "2",
    nombre: "Cordillera Barber",
    rating: "4.8",
    reviewsCount: 94,
    precioRango: "$$ · $5.000 - $13.000 ARS",
    ubicacion: "San Martín 520, Argentina",
    estado: "Abierto ahora",
    imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80",
    tags: ["Degradado", "Perfilado", "Mercado Pago"],
    descripcion: "Especialistas en cortes degradados y perfilado de precisión.",
  },
  {
    id: "3",
    nombre: "Barbería La Posta",
    rating: "5.0",
    reviewsCount: 76,
    precioRango: "$$ · $4.000 - $11.000 ARS",
    ubicacion: "Rivadavia 1120, Argentina",
    estado: "Cerrado · Abre 14:00",
    imagen: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=500&q=80",
    tags: ["Estilo Urbano", "Lavar & Corte"],
    descripcion: "El estilo urbano más fresco de la ciudad, con ambiente relajado.",
  },
  {
    id: "4",
    nombre: "El Rincón del Barbero",
    rating: "4.7",
    reviewsCount: 53,
    precioRango: "$ · $3.500 - $9.000 ARS",
    ubicacion: "25 de Mayo 310, Argentina",
    estado: "Abierto ahora",
    imagen: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=500&q=80",
    tags: ["Económico", "Corte Rápido"],
    descripcion: "Servicio rápido y económico sin perder calidad.",
  },
];

const HORARIOS_DISPONIBLES = [
  "09:00 hs", "09:40 hs", "10:20 hs", "11:00 hs",
  "14:00 hs", "14:40 hs", "15:20 hs", "16:00 hs", "16:40 hs",
];

export default function BusquedaView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const [selectedBarberia, setSelectedBarberia] = useState<Barberia | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [metodoPago, setMetodoPago] = useState<"total" | "sena">("sena");

  const filtered = BARBERIAS.filter((b) => {
    const q = searchTerm.toLowerCase();
    return (
      b.nombre.toLowerCase().includes(q) ||
      b.ubicacion.toLowerCase().includes(q) ||
      b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }).filter((b) => !filtroAbierto || b.estado.startsWith("Abierto"));

  const handleReservar = () => {
    if (!selectedHorario) return;
    setBookingSuccess(true);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Search className="w-6 h-6 text-[#38bdf8]" />
          Buscar barbería
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Encontrá tu barbería favorita en Argentina y agendá tu turno
        </p>
      </div>

      {/* Search Bar + Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, dirección o estilo..."
            className="w-full pl-12 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent shadow-lg transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setFiltroAbierto(!filtroAbierto)}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-bold border transition-all cursor-pointer ${
            filtroAbierto
              ? "bg-[#2f2c79] text-[#38bdf8] border-[#38bdf8]/40"
              : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {filtroAbierto ? "Solo abiertas ✓" : "Solo abiertas"}
        </button>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
        <span>
          <strong className="text-white">{filtered.length}</strong> barberías encontradas en Argentina
        </span>
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-3xl border border-slate-800">
          <Search className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 font-bold">No se encontraron barberías</p>
          <p className="text-xs text-slate-600 mt-1">Probá con otro término de búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((shop) => (
            <div
              key={shop.id}
              className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-[#38bdf8]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 w-full relative bg-slate-800 overflow-hidden">
                  <img
                    src={shop.imagen}
                    alt={shop.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-black shadow-md ${
                        shop.estado.startsWith("Abierto")
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-amber-500 text-slate-950"
                      }`}
                    >
                      {shop.estado}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base group-hover:text-[#38bdf8] transition-colors">
                      {shop.nombre}
                    </h3>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/30">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {shop.rating}
                    </span>
                  </div>
                  <p className="text-xs text-[#38bdf8] font-bold">{shop.precioRango}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    {shop.ubicacion}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2">{shop.descripcion}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {shop.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#2f2c79]/50 text-[#38bdf8] text-[10px] font-semibold border border-[#38bdf8]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => {
                    setSelectedBarberia(shop);
                    setSelectedHorario(null);
                    setBookingSuccess(false);
                  }}
                  className="w-full py-2.5 bg-[#2f2c79] hover:bg-[#23215c] text-white font-bold rounded-2xl shadow-md border border-[#38bdf8]/30 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#38bdf8]" />
                  Ver horarios y agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedBarberia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-700 relative">
            <button
              onClick={() => setSelectedBarberia(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h4 className="font-black text-white text-xl">¡Turno Agendado!</h4>
                <p className="text-sm text-slate-400">
                  Tu turno en <strong className="text-[#38bdf8]">{selectedBarberia.nombre}</strong> a las{" "}
                  <strong className="text-white">{selectedHorario}</strong> fue confirmado.
                </p>
                <p className="text-xs text-slate-500">
                  Se enviará una confirmación y recordatorio automático 24 hs antes.
                </p>
                <button
                  onClick={() => setSelectedBarberia(null)}
                  className="mt-2 px-6 py-2.5 bg-[#2f2c79] hover:bg-[#23215c] text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            ) : (
              <>
                {/* Barbería info */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-700 shrink-0">
                    <img
                      src={selectedBarberia.imagen}
                      alt={selectedBarberia.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-base">{selectedBarberia.nombre}</h4>
                    <p className="text-xs text-[#38bdf8] font-semibold">{selectedBarberia.ubicacion}</p>
                    <span className="text-xs text-emerald-400 font-bold">{selectedBarberia.estado}</span>
                  </div>
                </div>

                {/* Horarios */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase block mb-2">
                    Seleccioná un horario disponible:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {HORARIOS_DISPONIBLES.map((h) => (
                      <button
                        key={h}
                        onClick={() => setSelectedHorario(h)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selectedHorario === h
                            ? "bg-[#38bdf8] text-slate-950 border-[#38bdf8] shadow-md"
                            : "bg-slate-800 text-slate-300 border-slate-700 hover:border-[#38bdf8]/40"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Método de pago */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase block mb-2">
                    Método de pago:
                  </span>
                  <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CreditCard className="w-4 h-4 text-[#009ee3]" />
                      <span className="font-semibold">Mercado Pago</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setMetodoPago("total")}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          metodoPago === "total"
                            ? "bg-[#2f2c79] text-[#38bdf8] border-[#38bdf8]/40"
                            : "bg-slate-700 text-slate-400 border-slate-600"
                        }`}
                      >
                        Pagar 100%
                      </button>
                      <button
                        onClick={() => setMetodoPago("sena")}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          metodoPago === "sena"
                            ? "bg-[#2f2c79] text-[#38bdf8] border-[#38bdf8]/40"
                            : "bg-slate-700 text-slate-400 border-slate-600"
                        }`}
                      >
                        Abonar seña 50%
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReservar}
                  disabled={!selectedHorario}
                  className={`w-full py-3 font-black rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    selectedHorario
                      ? "bg-[#2f2c79] hover:bg-[#23215c] text-white cursor-pointer"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <Calendar className="w-4 h-4 text-[#38bdf8]" />
                  Confirmar turno y pagar
                </button>
                {!selectedHorario && (
                  <p className="text-center text-xs text-slate-500 mt-2">
                    Seleccioná un horario para continuar
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

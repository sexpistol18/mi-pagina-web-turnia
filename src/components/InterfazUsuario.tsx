"use client";

import React, { useState } from "react";
import { Search, MapPin, Star, Clock, CheckCircle2, Scissors, Calendar, CreditCard, ShieldCheck } from "lucide-react";

interface BarberShop {
  id: string;
  nombre: string;
  direccion: string;
  abierto: boolean;
  horario: string;
  rating: number;
  reviewsCount: number;
  imagen: string;
  tags: string[];
}

export default function InterfazUsuario() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState<BarberShop | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const barberias: BarberShop[] = [
    {
      id: "1",
      nombre: "Patagonia Cuts Barbería",
      direccion: "Av. Alvear 840, Argentina",
      abierto: true,
      horario: "09:00 - 20:00",
      rating: 4.9,
      reviewsCount: 128,
      imagen: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=500&q=80",
      tags: ["Corte Clásico", "Barba Fade", "Mercado Pago"]
    },
    {
      id: "2",
      nombre: "Cordillera Barber",
      direccion: "San Martín 520, Argentina",
      abierto: true,
      horario: "10:00 - 21:00",
      rating: 4.8,
      reviewsCount: 94,
      imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80",
      tags: ["Degradado", "Perfilado", "Mercado Pago"]
    },
    {
      id: "3",
      nombre: "Barbería La Posta",
      direccion: "Rivadavia 1120, Argentina",
      abierto: false,
      horario: "Abre a las 14:00",
      rating: 5.0,
      reviewsCount: 76,
      imagen: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=500&q=80",
      tags: ["Estilo Urbano", "Lavar & Corte"]
    }
  ];

  // Reseñas de clientes
  const reseñasClientes = [
    {
      id: "1",
      autor: "Santiago R.",
      rol: "Cliente frecuente en Argentina",
      texto: "Es muy fácil de usar 10/10.",
      estrellas: 5
    },
    {
      id: "2",
      autor: "Gabriel M.",
      rol: "Cliente",
      texto: "Me gusta turnia porque es sencillo y se entiende lo que hay que hacer.",
      estrellas: 5
    },
    {
      id: "3",
      autor: "Damián V.",
      rol: "Barbero Profesional",
      texto: "Soy barbero y la verdad usar turnia es mejor que estar agendando turnos a cada rato, acá es todo automatizado y eso sirve un montón.",
      estrellas: 5
    }
  ];

  const filteredBarberias = barberias.filter((shop) =>
    shop.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8">
      
      {/* Header Interfaz Usuario */}
      <div className="mb-6">
        <span className="text-xs uppercase font-extrabold tracking-wider text-[#0284c7]">
          INTERFAZ CLIENTE
        </span>
        <h3 className="text-2xl font-black text-gray-900 mt-1">
          Locales virtuales y reserva de turnos
        </h3>
        <p className="text-sm text-[#4b5563] mt-1">
          Buscá tu barbería favorita en Argentina y agendá tu horario en segundos.
        </p>
      </div>

      {/* Buscador Funcional */}
      <div className="relative mb-8 max-w-xl">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar barbería por nombre en Argentina..."
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79] focus:bg-white transition-all shadow-xs"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-3.5 text-xs text-gray-400 hover:text-gray-600"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Barberías de la zona abiertas */}
      <div className="mb-12">
        <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-[#0284c7]" />
          <span>Barberías de la zona abiertas</span>
        </h4>

        {filteredBarberias.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-sm">No se encontraron barberías con &quot;{searchTerm}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBarberias.map((shop) => (
              <div
                key={shop.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-40 w-full relative bg-gray-100 overflow-hidden">
                    <img
                      src={shop.imagen}
                      alt={shop.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      {shop.abierto ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-xs">
                          Abierto ahora
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-xs">
                          Cerrado
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center space-x-1 text-amber-500 text-xs mb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{shop.rating}</span>
                      <span className="text-gray-400">({shop.reviewsCount} reseñas)</span>
                    </div>

                    <h5 className="font-bold text-gray-900 text-base group-hover:text-[#2f2c79] transition-colors">
                      {shop.nombre}
                    </h5>

                    <p className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                      <span>{shop.direccion}</span>
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {shop.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-sky-50 text-[#0284c7] text-[10px] font-semibold border border-sky-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      setSelectedShop(shop);
                      setBookingSuccess(false);
                    }}
                    className="w-full py-2.5 bg-[#2f2c79] hover:bg-[#23215c] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Ver horarios y agendar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reseñas de clientes (Exact text specified in context.md) */}
      <div className="pt-8 border-t border-gray-100">
        <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>Reseñas de clientes</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reseñasClientes.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-gray-50/90 border border-gray-200/70 shadow-2xs flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-3">
                  {[...Array(rev.estrellas)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-800 italic leading-relaxed">
                  &quot;{rev.texto}&quot;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#2f2c79] text-[#fbf1e9] flex items-center justify-center font-bold text-xs">
                  {rev.autor.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-900 block">{rev.autor}</span>
                  <span className="text-[10px] text-[#0284c7] font-semibold">{rev.rol}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal Simulation */}
      {selectedShop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setSelectedShop(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h4 className="font-bold text-gray-900 text-lg mb-1">{selectedShop.nombre}</h4>
            <p className="text-xs text-[#0284c7] font-semibold mb-4">{selectedShop.direccion}</p>

            {bookingSuccess ? (
              <div className="p-6 text-center bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h5 className="font-bold text-emerald-900 text-base">¡Turno Agendado con Éxito!</h5>
                <p className="text-xs text-emerald-700 mt-1">
                  Se ha enviado la confirmación y el recordatorio automático mediante nuestro sistema.
                </p>
                <button
                  onClick={() => setSelectedShop(null)}
                  className="mt-4 px-4 py-2 bg-[#2f2c79] text-white text-xs font-semibold rounded-xl"
                >
                  Entendido
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-700 block mb-2">Seleccionar Horario Disponible:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button className="py-2 px-3 bg-white border border-[#2f2c79] text-[#2f2c79] font-bold rounded-lg hover:bg-sky-50">
                      15:00 hs (40 min)
                    </button>
                    <button className="py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-[#2f2c79]">
                      16:00 hs (1 hora)
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200">
                  <span className="text-xs font-bold text-sky-900 block mb-1">Método de Pago:</span>
                  <div className="flex items-center space-x-2 text-xs text-sky-800">
                    <CreditCard className="w-4 h-4 text-[#009ee3]" />
                    <span>Mercado Pago (Pagar 100% o abona el 50%)</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingSuccess(true)}
                  className="w-full py-3 bg-[#2f2c79] hover:bg-[#23215c] text-white font-bold rounded-xl text-sm shadow-md transition-all"
                >
                  Confirmar Turno y Pagar Seña
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

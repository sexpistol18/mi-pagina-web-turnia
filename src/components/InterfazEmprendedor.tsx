"use client";

import React, { useState } from "react";
import { Plus, Scissors, Calendar as CalendarIcon, DollarSign, Store, Check, ExternalLink, Image as ImageIcon, X } from "lucide-react";

interface ServiceItem {
  id: string;
  nombre: string;
  precio: number; // en pesos argentinos
  imagen: string;
  duracion: string;
}

export default function InterfazEmprendedor() {
  const [nombreTienda, setNombreTienda] = useState("Barbería Patagonia Cuts - Argentina");
  const [servicios, setServicios] = useState<ServiceItem[]>([
    {
      id: "1",
      nombre: "Corte normal",
      precio: 8500,
      duracion: "40 min",
      imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "2",
      nombre: "Barba",
      precio: 5500,
      duracion: "40 min",
      imagen: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "3",
      nombre: "Corte + barba",
      precio: 12500,
      duracion: "1 hora",
      imagen: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80"
    }
  ]);

  // Modal State for adding service
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newPrecio, setNewPrecio] = useState("");
  const [newImagen, setNewImagen] = useState("");
  const [newDuracion, setNewDuracion] = useState("40 min");

  // Calculated total income
  const totalIngreso = servicios.reduce((acc, curr) => acc + curr.precio * 12, 420000); // Simulated month total

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre || !newPrecio) return;
    
    const newService: ServiceItem = {
      id: Date.now().toString(),
      nombre: newNombre,
      precio: parseFloat(newPrecio),
      duracion: newDuracion,
      imagen: newImagen || "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80"
    };

    setServicios([...servicios, newService]);
    setNewNombre("");
    setNewPrecio("");
    setNewImagen("");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        
        {/* Lado izquierdo: Nombre tienda */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2f2c79] text-[#fbf1e9] flex items-center justify-center shadow-md">
            <Store className="w-6 h-6 text-[#38bdf8]" />
          </div>
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#0284c7]">
              PANEL EMPRENDEDOR
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              {nombreTienda}
            </h3>
          </div>
        </div>

        {/* Total del dinero que ingresa en peso argentino */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            $
          </div>
          <div>
            <span className="text-xs text-emerald-800 font-semibold block">
              Total dinero ingresado este mes
            </span>
            <span className="text-xl font-black text-emerald-950">
              $ {totalIngreso.toLocaleString("es-AR")} ARS
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Cortes & Calendario */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* APARTADO DE CORTES (Left 7 Cols) */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                <Scissors className="w-5 h-5 text-[#2f2c79]" />
                <span>Apartado de cortes (Servicios)</span>
              </h4>
              <p className="text-xs text-[#4b5563]">
                Agregá y administrá los servicios de tu barbería.
              </p>
            </div>

            {/* BOTÓN: Agregar servicio */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#2f2c79] text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#23215c] transition-all flex items-center space-x-2 shadow-md"
            >
              <Plus className="w-4 h-4 text-[#38bdf8]" />
              <span>Agregar servicio</span>
            </button>
          </div>

          {/* List of Cortes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {servicios.map((srv) => (
              <div
                key={srv.id}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/80 hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Imagen ilustrativa */}
                <div className="h-32 w-full relative bg-gray-200 overflow-hidden">
                  <img
                    src={srv.imagen}
                    alt={srv.nombre}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#2f2c79] text-[#fbf1e9] text-[10px] font-bold">
                    {srv.duracion}
                  </span>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">{srv.nombre}</h5>
                    <span className="text-xs text-[#0284c7] font-semibold">
                      Turno automático
                    </span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Precio</span>
                    <span className="text-sm font-extrabold text-[#2f2c79]">
                      $ {srv.precio.toLocaleString("es-AR")} ARS
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CALENDARIO EMPRENDEDOR (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-sky-50/60 rounded-2xl p-5 border border-sky-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-[#0284c7]" />
              <h4 className="font-bold text-gray-900 text-base">
                Calendario de Turnos
              </h4>
            </div>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white text-[11px] font-bold text-[#0284c7] border border-sky-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Vinculado con Google Calendar</span>
            </span>
          </div>

          <p className="text-xs text-[#4b5563] mb-4">
            Turnos programados automáticamente cada 40 minutos o 1 hora.
          </p>

          {/* Simulated Calendar Day Schedule */}
          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            <div className="p-3 bg-white rounded-xl border-l-4 border-l-[#2f2c79] border-gray-200 shadow-2xs flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-gray-900 block">10:00 hs - 10:40 hs</span>
                <span className="text-gray-600">Juan Pérez (Corte normal)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Señado 50%
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border-l-4 border-l-[#0284c7] border-gray-200 shadow-2xs flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-gray-900 block">11:00 hs - 12:00 hs</span>
                <span className="text-gray-600">Lucas González (Corte + barba)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Pago 100%
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border-l-4 border-l-gray-300 border-gray-200 shadow-2xs flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-gray-900 block">12:00 hs - 12:40 hs</span>
                <span className="text-gray-400 italic">Horario disponible</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-semibold text-[10px]">
                Libre
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border-l-4 border-l-[#2f2c79] border-gray-200 shadow-2xs flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-gray-900 block">14:00 hs - 14:40 hs</span>
                <span className="text-gray-600">Mateo Rossi (Barba)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Señado 50%
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sky-200 flex items-center justify-between text-xs text-[#0284c7]">
            <span className="font-semibold">Google Calendar Sync Activo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Modal for Adding Service */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h4 className="font-bold text-gray-900 text-lg flex items-center space-x-2">
                <Plus className="w-5 h-5 text-[#2f2c79]" />
                <span>Agregar nuevo servicio</span>
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddService} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Nombre del servicio
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Perfilado de Cejas"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Precio (en Peso Argentino - ARS)
                </label>
                <input
                  type="number"
                  required
                  placeholder="Ej: 4000"
                  value={newPrecio}
                  onChange={(e) => setNewPrecio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Duración del turno
                </label>
                <select
                  value={newDuracion}
                  onChange={(e) => setNewDuracion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                >
                  <option value="40 min">40 minutos</option>
                  <option value="1 hora">1 hora</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  URL Imagen Ilustrativa (Opcional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newImagen}
                  onChange={(e) => setNewImagen(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2f2c79] text-white rounded-xl text-sm font-semibold hover:bg-[#23215c] shadow-md"
                >
                  Guardar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

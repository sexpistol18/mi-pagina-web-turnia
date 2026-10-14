"use client";

import React, { useState } from "react";
import {
  Scissors,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Clock,
  DollarSign,
} from "lucide-react";

interface Servicio {
  id: string;
  nombre: string;
  precio: number;
  duracion: string;
  imagen: string;
  descripcion: string;
}

const IMAGENES_PREDEFINIDAS = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80",
];

const SERVICIOS_INICIALES: Servicio[] = [
  {
    id: "1",
    nombre: "Corte normal",
    precio: 8500,
    duracion: "40 min",
    imagen: IMAGENES_PREDEFINIDAS[0],
    descripcion: "Corte clásico con lavado y peinado incluido.",
  },
  {
    id: "2",
    nombre: "Barba",
    precio: 5500,
    duracion: "40 min",
    imagen: IMAGENES_PREDEFINIDAS[1],
    descripcion: "Recorte, perfilado y toalla caliente para barba.",
  },
  {
    id: "3",
    nombre: "Corte + Barba",
    precio: 12500,
    duracion: "1 hora",
    imagen: IMAGENES_PREDEFINIDAS[2],
    descripcion: "Combo completo de corte de cabello y diseño de barba.",
  },
];

interface ModalProps {
  servicio: Partial<Servicio> | null;
  onClose: () => void;
  onSave: (s: Servicio) => void;
  isEdit: boolean;
}

function ServicioModal({ servicio, onClose, onSave, isEdit }: ModalProps) {
  const [nombre, setNombre] = useState(servicio?.nombre || "");
  const [precio, setPrecio] = useState(servicio?.precio?.toString() || "");
  const [duracion, setDuracion] = useState(servicio?.duracion || "40 min");
  const [descripcion, setDescripcion] = useState(servicio?.descripcion || "");
  const [imagen, setImagen] = useState(servicio?.imagen || IMAGENES_PREDEFINIDAS[0]);
  const [imagenIdx, setImagenIdx] = useState(
    IMAGENES_PREDEFINIDAS.indexOf(servicio?.imagen || IMAGENES_PREDEFINIDAS[0])
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !precio) return;
    onSave({
      id: servicio?.id || Date.now().toString(),
      nombre,
      precio: parseFloat(precio),
      duracion,
      descripcion,
      imagen,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#2f2c79] flex items-center justify-center">
            {isEdit ? <Pencil className="w-4 h-4 text-[#38bdf8]" /> : <Plus className="w-4 h-4 text-[#38bdf8]" />}
          </div>
          <h3 className="font-black text-white text-lg">
            {isEdit ? "Editar servicio" : "Nuevo servicio"}
          </h3>
        </div>

        {/* Preview de imagen */}
        <div className="mb-4 h-32 w-full rounded-2xl overflow-hidden border border-slate-700 relative">
          <img src={imagen} alt="preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <span className="absolute bottom-2 left-2 text-xs text-white font-bold bg-[#2f2c79]/80 px-2 py-0.5 rounded-md">
            Preview
          </span>
        </div>

        {/* Selector de imagen predefinida */}
        <div className="flex gap-2 mb-4">
          {IMAGENES_PREDEFINIDAS.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => { setImagen(img); setImagenIdx(idx); }}
              className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${imagenIdx === idx ? "border-[#38bdf8] scale-105" : "border-slate-700 hover:border-slate-500"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Nombre del servicio *
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Perfilado de Cejas"
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                Precio (ARS) *
              </label>
              <input
                type="number"
                required
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="8500"
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                Duración
              </label>
              <select
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              >
                <option value="40 min">40 minutos</option>
                <option value="1 hora">1 hora</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Descripción (opcional)
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Breve descripción del servicio..."
              rows={2}
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-700 text-slate-400 font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#2f2c79] hover:bg-[#23215c] text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 text-[#38bdf8]" />
              {isEdit ? "Guardar cambios" : "Agregar servicio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ServiciosView() {
  const [servicios, setServicios] = useState<Servicio[]>(SERVICIOS_INICIALES);
  const [modal, setModal] = useState<{ open: boolean; servicio: Partial<Servicio> | null; isEdit: boolean }>({
    open: false, servicio: null, isEdit: false,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const totalIngreso = servicios.reduce((acc, s) => acc + s.precio * 12, 0);

  const handleSave = (s: Servicio) => {
    if (modal.isEdit) {
      setServicios((prev) => prev.map((p) => (p.id === s.id ? s : p)));
    } else {
      setServicios((prev) => [...prev, s]);
    }
    setModal({ open: false, servicio: null, isEdit: false });
  };

  const handleDelete = (id: string) => {
    setServicios((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Scissors className="w-6 h-6 text-[#38bdf8]" />
            Servicios del negocio
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Administrá los servicios que ofrecés en tu barbería
          </p>
        </div>
        <button
          onClick={() => setModal({ open: true, servicio: null, isEdit: false })}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#2f2c79] hover:bg-[#23215c] text-white text-xs font-bold rounded-xl border border-[#38bdf8]/30 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#38bdf8]" />
          Agregar servicio
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2f2c79] flex items-center justify-center shrink-0">
            <Scissors className="w-5 h-5 text-[#38bdf8]" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Total servicios</span>
            <p className="text-xl font-black text-white">{servicios.length}</p>
          </div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-900/50 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Ingreso estimado/mes</span>
            <p className="text-xl font-black text-emerald-300">
              $ {totalIngreso.toLocaleString("es-AR")}
            </p>
          </div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-900/50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Duración promedio</span>
            <p className="text-xl font-black text-amber-300">50 min</p>
          </div>
        </div>
      </div>

      {/* Servicios Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {servicios.map((srv) => (
          <div
            key={srv.id}
            className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-[#38bdf8]/40 transition-all group flex flex-col"
          >
            {/* Imagen */}
            <div className="h-40 w-full relative bg-slate-800 overflow-hidden">
              <img
                src={srv.imagen}
                alt={srv.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-[#2f2c79]/90 text-[#fbf1e9] text-[10px] font-bold border border-[#38bdf8]/30">
                {srv.duracion}
              </span>
            </div>

            {/* Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-black text-white text-base mb-0.5">{srv.nombre}</h3>
                {srv.descripcion && (
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">{srv.descripcion}</p>
                )}
                <span className="text-xs text-[#38bdf8] font-semibold">Turno automático</span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Precio</span>
                  <span className="text-base font-black text-[#38bdf8]">
                    $ {srv.precio.toLocaleString("es-AR")} ARS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModal({ open: true, servicio: srv, isEdit: true })}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-[#2f2c79] text-slate-400 hover:text-[#38bdf8] transition-all cursor-pointer"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(srv.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card */}
        <button
          onClick={() => setModal({ open: true, servicio: null, isEdit: false })}
          className="bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-700 hover:border-[#38bdf8]/60 hover:bg-slate-900 transition-all flex flex-col items-center justify-center gap-3 p-8 cursor-pointer group min-h-[240px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#2f2c79]/50 group-hover:bg-[#2f2c79] flex items-center justify-center transition-all">
            <Plus className="w-6 h-6 text-[#38bdf8]" />
          </div>
          <p className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">
            Agregar nuevo servicio
          </p>
        </button>
      </div>

      {/* Modal */}
      {modal.open && (
        <ServicioModal
          servicio={modal.servicio}
          isEdit={modal.isEdit}
          onClose={() => setModal({ open: false, servicio: null, isEdit: false })}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl p-6 max-w-sm w-full border border-rose-500/30 shadow-2xl">
            <h4 className="font-black text-white text-lg mb-2">¿Eliminar servicio?</h4>
            <p className="text-sm text-slate-400 mb-5">
              Esta acción no se puede deshacer. El servicio será eliminado permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-slate-700 text-slate-400 font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

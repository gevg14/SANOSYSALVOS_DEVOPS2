import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard, PawPrint, Heart, MapPin, HandHeart, Bell, Stethoscope,
    Users, Search, ArrowUpRight, CheckCircle2, Clock, AlertCircle, LogOut,
    Edit3, Trash2, Plus, Save, Phone, Map, Check, ShieldCheck
} from "lucide-react";
import { toast } from "sonner";

const SECTIONS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "General" },
    { id: "mascotas", label: "Mascotas", icon: PawPrint, group: "Gestión" },
    { id: "adopciones", label: "Adopciones", icon: Heart, group: "Gestión" },
    { id: "coincidencias", label: "Coincidencias", icon: Search, group: "Gestión" },
    { id: "geo", label: "Geolocalización", icon: MapPin, group: "Operaciones" },
    { id: "donaciones", label: "Donaciones", icon: HandHeart, group: "Operaciones" },
    { id: "historial", label: "Historial médico", icon: Stethoscope, group: "Operaciones" },
    { id: "notif", label: "Notificaciones", icon: Bell, group: "Comunicación" },
];

const CLINICAS_PTO_MONTT = [
    { nombre: "Hospital Vet. Los Lagos", dir: "Av. Pres. Ibáñez 231", fono: "+56 65 225 4010", estado: "Urgencias 24h" },
    { nombre: "Clínica Veterinaria Del Mar", dir: "Calle Guillermo Gallardo 540", fono: "+56 65 231 8899", estado: "Abierto" },
    { nombre: "Veterinaria Petrohué", dir: "Av. Monseñor Almonacid 412", fono: "+56 65 228 1122", estado: "Abierto" },
];

const Usuarios = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [searchQuery, setSearchQuery] = useState("");

    // ====== ESTADOS DE INTERACCIÓN GLOBAL ======
    const [unreadNotifs, setUnreadNotifs] = useState(true);
    const [showNotifMenu, setShowNotifMenu] = useState(false);
    const [alertasHeader, setAlertasHeader] = useState([
        { id: 1, msg: "Nueva postulación de adopción para Copito", time: "Hace 5m", leida: false },
        { id: 2, msg: "Donación entrante procesada correctamente", time: "Hace 12m", leida: false },
        { id: 3, msg: "Alerta de cruce crítico IA: 92% similitud", time: "Hace 1h", leida: true },
    ]);

    // ====== BASE DE DATOS LOCAL FLUIDA (ESTADOS MUTABLES) ======
    const [mascotas, setMascotas] = useState([
        { id: "#482", nombre: "Toby", especie: "Perro", estado: "En refugio", zona: "Pelluco" },
        { id: "#483", nombre: "Luna", especie: "Gato", estado: "Adoptada", zona: "Centro" },
        { id: "#484", nombre: "Copito", especie: "Perro", estado: "Disponible", zona: "Alerce" },
        { id: "#485", nombre: "Mango", especie: "Gato", estado: "En refugio", zona: "Mirasol" },
        { id: "#486", nombre: "Rocco", especie: "Perro", estado: "Urgente", zona: "Costanera" },
    ]);

    const [adopciones, setAdopciones] = useState([
        { id: "#A12", mascota: "Luna", adoptante: "Familia Soto", estado: "Aprobada", fecha: "2026-04-19" },
        { id: "#A13", mascota: "Toby", adoptante: "M. Reyes", estado: "En proceso", fecha: "2026-04-20" },
        { id: "#A14", mascota: "Mango", adoptante: "C. Vega", estado: "En proceso", fecha: "2026-04-21" },
        { id: "#A15", mascota: "Copito", adoptante: "Familia Pérez", estado: "Rechazada", fecha: "2026-04-18" },
    ]);

    const [coincidencias, setCoincidencias] = useState([
        { id: "C-1024", a: "Reporte #482 — Perro café", b: "Reporte #501 — Perro encontrado Pelluco", pct: 92, estado: "Pendiente" },
        { id: "C-1025", a: "Reporte #470 — Gato negro y blanco", b: "Reporte #495 — Gatito Centro", pct: 78, estado: "Pendiente" },
    ]);

    const [fichasMedicas, setFichasMedicas] = useState([
        { id: 1, mascota: "Luna #483", diag: "Desnutrición leve", tto: "Dieta especial 30 días", chip: true },
        { id: 2, mascota: "Toby #482", diag: "Herida en pata", tto: "Antibiótico + curaciones", chip: false },
    ]);

    const toggleNotificaciones = () => {
        setShowNotifMenu(!showNotifMenu);
        setUnreadNotifs(false); // Apagamos el punto de aviso al abrir
    };

    const activeLabel = SECTIONS.find((s) => s.id === activeTab)?.label;

    return (
        <div className="min-h-screen flex bg-[#FFFDF9] font-sans antialiased text-slate-800 flex-col md:flex-row relative">

            {/* 1. SIDEBAR REDISEÑADO CON AZUL MARINO CORPORATIVO PROFUNDO */}
            <aside className="w-full md:w-64 bg-gradient-to-b from-[#1A365D] to-[#102444] text-slate-200 flex flex-col justify-between shrink-0 md:sticky md:top-0 md:h-screen z-20 shadow-xl border-r border-white/5">
                <div>
                    {/* Brand Logo Header */}
                    <div className="p-5 border-b border-white/10">
                        <Link to="/inicio" className="flex items-center gap-3">
                            <div className="bg-white p-1.5 rounded-xl text-sm font-bold shadow-md">🐶</div>
                            <div>
                                <p className="font-serif font-black text-white tracking-tight text-sm leading-none">Sanos y Salvos</p>
                                <p className="text-[9px] uppercase tracking-widest font-extrabold text-[#22C55E] mt-1">Panel Staff</p>
                            </div>
                        </Link>
                    </div>

                    {/* Menú de Opciones */}
                    <nav className="p-4 space-y-5 max-h-[calc(100vh-160px)] overflow-y-auto">
                        {["General", "Gestión", "Operaciones", "Comunicación"].map((grupo) => (
                            <div key={grupo} className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5">{grupo}</p>
                                <div className="space-y-0.5">
                                    {SECTIONS.filter((s) => s.group === grupo).map((item) => {
                                        const Icon = item.icon;
                                        const estaActivo = activeTab === item.id;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                                                    estaActivo
                                                        ? "bg-[#256944] text-white shadow-lg shadow-black/10 font-extrabold"
                                                        : "text-slate-300 hover:text-white hover:bg-white/5"
                                                }`}
                                            >
                                                <Icon className="h-4 w-4 shrink-0" />
                                                <span>{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Perfil del Staff */}
                <div className="p-4 border-t border-white/10 bg-black/10 space-y-2">
                    <div className="flex items-center gap-3 px-2 py-1">
                        <div className="h-8 w-8 rounded-xl bg-[#256944] text-white flex items-center justify-center font-bold text-xs shadow-sm">VL</div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">Vet. Gerardo Vera</p>
                            <p className="text-[10px] text-slate-400 font-medium truncate">Refugio Puerto Montt</p>
                        </div>
                    </div>
                    <Link to="/auth" className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-rose-400 rounded-xl text-xs font-bold hover:bg-white/5 transition-colors">
                        <LogOut className="h-4 w-4" />
                        <span>Cerrar Sesión</span>
                    </Link>
                </div>
            </aside>

            {/* 2. AREA DE CONTENIDO CENTRAL */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Cabecera con Notificaciones Popover */}
                <header className="bg-white border-b border-slate-100 sticky top-0 z-30 px-8 py-4 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mapeo de Control Administrativo</p>
                        <h2 className="font-serif text-2xl font-bold text-slate-800 capitalize tracking-tight">{activeLabel}</h2>
                    </div>

                    <div className="flex items-center gap-4 relative">
                        <div className="relative浏览 hidden md:block">
                            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar registros..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 w-64 bg-[#FFFDF9] border border-slate-200 rounded-full text-xs font-medium focus:outline-none focus:border-[#1A365D]"
                            />
                        </div>

                        {/* BOTÓN DE NOTIFICACIONES TOTALMENTE INTERACTIVO */}
                        <button
                            onClick={toggleNotificaciones}
                            className={`relative h-9 w-9 grid place-items-center rounded-full border shadow-sm transition-all ${showNotifMenu ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"}`}
                        >
                            <Bell className="h-4 w-4" />
                            {unreadNotifs && (
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                            )}
                        </button>

                        {/* POP-DOWN FLOTANTE DE NOTIFICACIONES */}
                        {showNotifMenu && (
                            <div className="absolute right-0 top-11 w-72 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-4 space-y-2.5 z-40 animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                    <p className="text-[11px] font-black text-[#1A365D] uppercase tracking-wider">Centro de Notificaciones</p>
                                    <button onClick={() => setShowNotifMenu(false)} className="text-[10px] text-slate-400 font-bold hover:text-slate-600">Cerrar</button>
                                </div>
                                <div className="space-y-1.5 max-h-56 overflow-y-auto">
                                    {alertasHeader.map((n) => (
                                        <div key={n.id} className="p-2 rounded-xl bg-[#FFFDF9] hover:bg-slate-50 border border-slate-100 flex flex-col gap-0.5">
                                            <p className="text-[11px] font-bold text-slate-700 leading-tight">{n.msg}</p>
                                            <span className="text-[9px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5"><Clock className="w-2.5 h-2.5" /> {n.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* 3. ENRUTADOR INTERNO CON DISEÑO MENOS BLANCO (TINTADO) */}
                <main className="p-8 flex-1">
                    {activeTab === "dashboard" && <DashboardSection familias={mascotas} adopciones={adopciones} />}
                    {activeTab === "mascotas" && <MascotasSection data={mascotas} setData={setMascotas} query={searchQuery} />}
                    {activeTab === "adopciones" && <AdopcionesSection data={adopciones} setData={setAdopciones} />}
                    {activeTab === "coincidencias" && <CoincidenciasSection data={coincidencias} setData={setCoincidencias} />}
                    {activeTab === "geo" && <GeoSection />}
                    {activeTab === "donaciones" && <DonacionesSection />}
                    {activeTab === "historial" && <HistorialSection data={fichasMedicas} setData={setFichasMedicas} />}
                    {activeTab === "notif" && <NotificacionesSection />}
                </main>
            </div>

        </div>
    );
};

/* ==================== SUB-VISTAS REFACTORIZADAS CON COLOR EN ENTORNO ==================== */

const DashboardSection = ({ familias, adopciones }) => (
    <div className="space-y-6">
        {/* Grid de Tarjetas Tintadas en lugar de blancas lisas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard icon={PawPrint} label="Mascotas registradas" value={familias.length.toString()} delta="+12%" color="bg-blue-100 border-blue-200/50 text-blue-700" />
            <StatCard icon={Heart} label="Adopciones activas" value={adopciones.filter(a => a.estado === "En proceso").length.toString()} delta="+5" color="bg-rose-100 border-rose-200/50 text-rose-700" />
            <StatCard icon={Search} label="Coincidencias hoy" value="8" delta="+3" color="bg-amber-100 border-amber-200/50 text-amber-700" />
            <StatCard icon={HandHeart} label="Donaciones mes" value="$2.4M" delta="+18%" color="bg-[#D1E7DD] border-[#A3CFBB] text-[#14452F]" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            {/* Actividades con Fondo Suave Cremoso */}
            <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-slate-800 mb-4 tracking-tight">Actividad reciente del cuadrante</h3>
                <div className="space-y-2">
                    {[
                        { icon: CheckCircle2, color: "text-[#256944] bg-[#EAF5ED]", t: "Toby fue aprobado en adopción", time: "Hace 12 min" },
                        { icon: Search, color: "text-[#1A365D] bg-blue-50", t: "Coincidencia 92% entre reportes #482 y #501", time: "Hace 35 min" },
                        { icon: AlertCircle, color: "text-rose-600 bg-rose-50", t: "Reporte de perro herido en Av. Costanera", time: "Hace 1 h" },
                    ].map((a, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#FFFDF9] border border-slate-100/50 hover:bg-white hover:shadow-sm transition-all">
                            <div className={`h-9 w-9 rounded-xl grid place-items-center ${a.color} shrink-0`}><a.icon className="h-4 w-4" /></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-slate-700 truncate">{a.t}</p>
                                <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" /> {a.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* REEMPLAZADO REQUISITO: PANEL DE CLÍNICAS VETERINARIAS DE PUERTO MONTT */}
            <div className="bg-[#FFFDF9] border-2 border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-[#256944]" />
                        <p className="text-[10px] font-black text-[#256944] uppercase tracking-wider">Red Asistencial Local</p>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-800 tracking-tight">Veterinarias Pto. Montt</h3>

                    <div className="mt-4 space-y-3">
                        {CLINICAS_PTO_MONTT.map((c, i) => (
                            <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-xs font-black text-slate-800 truncate">{c.nombre}</p>
                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${c.estado === 'Urgencias 24h' ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-[#EAF5ED] text-[#256944]'}`}>{c.estado}</span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1"><Map className="w-3 h-3 text-slate-300" /> {c.dir}</p>
                                <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><Phone className="w-3 h-3 text-slate-300" /> {c.fono}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => toast.success("Abriendo mapa de derivación rápida...")}
                    className="w-full bg-[#1A365D] hover:bg-[#102444] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition-colors mt-4"
                >
                    Derivar Caso Urgente
                </button>
            </div>
        </div>

        {/* Monitor AWS de Microservicios */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-slate-800 mb-4 tracking-tight">Ecosistema de Microservicios AWS</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {["ms-mascotas", "ms-adopciones", "ms-geolocalizacion", "api-gateway"].map((s) => (
                    <div key={s} className="flex items-center justify-between p-3.5 rounded-xl bg-[#FFFDF9] border border-slate-100">
                        <span className="text-xs font-mono font-bold text-slate-600">{s}</span>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-[#256944] bg-[#EAF5ED] px-2.5 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" /> activo
            </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const StatCard = ({ icon: Icon, label, value, delta, color }) => (
    <div className={`border rounded-2xl p-5 shadow-2xs ${color}`}>
        <div className="flex items-start justify-between">
            <div className="h-9 w-9 bg-white/70 rounded-xl grid place-items-center shadow-xs"><Icon className="h-4 w-4" /></div>
            <span className="text-[10px] font-black bg-white/60 px-2 py-0.5 rounded-full flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" /> {delta}</span>
        </div>
        <p className="font-serif text-3xl font-black mt-4 tracking-tight">{value}</p>
        <p className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-60">{label}</p>
    </div>
);

/* CRUD MASCOTAS */
const MascotasSection = ({ data, setData, query }) => {
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({ nombre: "", especie: "", estado: "", zona: "" });

    const guardarEdicion = (id) => {
        setData(data.map(m => m.id === id ? { ...m, ...editForm } : m));
        setEditId(null);
        toast.success("Mascota modificada con éxito.");
    };

    const filtrados = data.filter(m => m.nombre.toLowerCase().includes(query.toLowerCase()) || m.zona.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-[#FFFDF9] border-b border-slate-100 font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Nombre</th>
                    <th className="px-6 py-4">Especie</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Zona</th>
                    <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                {filtrados.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-400">{m.id}</td>
                        <td className="px-6 py-4">
                            {editId === m.id ? (
                                <input type="text" value={editForm.nombre} onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })} className="px-2 py-1 rounded border border-slate-200 text-xs w-24" />
                            ) : <span className="font-bold text-slate-800">{m.nombre}</span>}
                        </td>
                        <td className="px-6 py-4">
                            {editId === m.id ? (
                                <input type="text" value={editForm.especie} onChange={(e) => setEditForm({ ...editForm, especie: e.target.value })} className="px-2 py-1 rounded border border-slate-200 text-xs w-20" />
                            ) : m.especie}
                        </td>
                        <td className="px-6 py-4">
                            {editId === m.id ? (
                                <select value={editForm.estado} onChange={(e) => setEditForm({ ...editForm, estado: e.target.value })} className="px-2 py-1 rounded border border-slate-200 text-xs font-bold bg-white">
                                    <option value="En refugio">En refugio</option>
                                    <option value="Adoptada">Adoptada</option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="Urgente">Urgente</option>
                                </select>
                            ) : <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${m.estado === 'Adoptada' ? 'bg-[#EAF5ED] text-[#256944]' : m.estado === 'Urgente' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>{m.estado}</span>}
                        </td>
                        <td className="px-6 py-4">{m.zona}</td>
                        <td className="px-6 py-4 text-center">
                            {editId === m.id ? (
                                <button onClick={() => guardarEdicion(m.id)} className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-0.5"><Save className="w-3.5 h-3.5" /> Salvar</button>
                            ) : (
                                <button onClick={() => { setEditId(m.id); setEditForm({ ...m }); }} className="text-[#1A365D] hover:text-blue-800 font-bold flex items-center gap-0.5"><Edit3 className="w-3.5 h-3.5" /> Editar</button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

/* ADOPCIONES */
const AdopcionesSection = ({ data, setData }) => (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#FFFDF9] border-b border-slate-100 font-bold text-slate-400 uppercase tracking-wider">
            <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Mascota</th>
                <th className="px-6 py-4">Postulante</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-center">Modificar Decisión</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
            {data.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-400">{r.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{r.mascota}</td>
                    <td className="px-6 py-4 font-semibold">{r.adoptante}</td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${r.estado === 'Aprobada' ? 'bg-[#EAF5ED] text-[#256944]' : r.estado === 'Rechazada' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>{r.estado}</span></td>
                    <td className="px-6 py-4">
                        <div className="flex justify-center gap-1.5 font-bold text-[10px]">
                            <button onClick={() => { setData(data.map(a => a.id === r.id ? { ...a, estado: "Aprobada" } : a)); toast.success("Aprobada"); }} className="bg-[#256944] text-white px-2 py-1 rounded-lg">Aprobar</button>
                            <button onClick={() => { setData(data.map(a => a.id === r.id ? { ...a, estado: "Rechazada" } : a)); toast.error("Rechazada"); }} className="bg-rose-50 text-rose-600 px-2 py-1 rounded-lg">Rechazar</button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

/* COINCIDENCIAS IA */
const CoincidenciasSection = ({ data, setData }) => (
    <div className="space-y-4">
        {data.map((c) => (
            <div key={c.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">{c.id} · Estado: {c.estado}</span>
                    <p className="font-serif text-base font-bold text-slate-800 mt-1">{c.a}</p>
                    <p className="text-xs font-semibold text-slate-400">↔ {c.b}</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="font-serif text-3xl font-black text-[#256944]">{c.pct}%</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Similitud</p>
                    </div>
                    {c.estado === "Pendiente" && (
                        <div className="flex gap-2 text-[11px] font-bold">
                            <button onClick={() => { setData(data.map(x => x.id === c.id ? { ...x, estado: "Confirmado" } : x)); toast.success("Cruce validado"); }} className="bg-[#256944] text-white px-3 py-1.5 rounded-xl">Confirmar</button>
                        </div>
                    )}
                </div>
            </div>
        ))}
    </div>
);

/* GEOLOCALIZACION */
const GeoSection = () => (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div><h3 className="font-serif text-xl font-bold text-slate-800">Geolocalización por Cuadrantes</h3></div>
        <div className="w-full h-80 rounded-2xl bg-[#FFFDF9] border border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center space-y-2">
            <MapPin className="h-7 w-7 text-[#1A365D]" />
            <p className="text-xs font-bold text-slate-700">Mapeo Activo Incorporado</p>
            <p className="text-[10px] text-slate-400 max-w-xs font-medium">Filtra las alertas geográficas completas desde el menú general público.</p>
        </div>
    </div>
);

/* DONACIONES */
const DonacionesSection = () => (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#FFFDF9] border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <tr><th>Donante</th><th>Monto</th><th>Destino</th><th>Método</th><th>Fecha</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
            {[
                { d: "Anónimo", m: "$100.000", dest: "Refugio Sur", t: "Transferencia", f: "Hoy 14:32" },
                { d: "María C.", m: "$25.000", dest: "Atención urgencia", t: "Tarjeta", f: "Hoy 11:08" },
            ].map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">{r.d}</td>
                    <td className="px-6 py-4 font-serif font-bold text-[#256944] text-sm">{r.m}</td>
                    <td className="px-6 py-4 font-semibold text-slate-500">{r.dest}</td>
                    <td className="px-6 py-4 font-mono text-slate-400">{r.t}</td>
                    <td className="px-6 py-4 text-slate-400 font-semibold">{r.f}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

/* HISTORIAL MEDICO */
const HistorialSection = ({ data, setData }) => {
    const [nuevaFicha, setNuevaFicha] = useState({ mascota: "", diag: "", tto: "", chip: true });

    const agregarFichaMedica = (e) => {
        e.preventDefault();
        if (!nuevaFicha.mascota || !nuevaFicha.diag) {
            toast.error("Por favor completa los campos.");
            return;
        }
        setData([...data, { id: Date.now(), ...nuevaFicha }]);
        setNuevaFicha({ mascota: "", diag: "", tto: "", chip: true });
        toast.success("Expediente médico guardado.");
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
                {data.map((f) => (
                    <div key={f.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Expediente Médico Veterinario</p>
                                <h4 className="font-serif text-base font-bold text-slate-800 mt-0.5">{f.mascota}</h4>
                            </div>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${f.chip ? "bg-[#EAF5ED] text-[#256944]" : "bg-rose-50 text-rose-600"}`}>{f.chip ? "✓ Con chip" : "Sin chip"}</span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Diagnóstico</p><p className="text-slate-600 font-medium mt-0.5">{f.diag}</p></div>
                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Tratamiento</p><p className="text-slate-600 font-medium mt-0.5">{f.tto}</p></div>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={agregarFichaMedica} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-serif text-base font-bold text-[#1A365D]">Crear Ficha Médica</h3>
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mascota</label>
                    <input type="text" placeholder="Ej: Toby #482" value={nuevaFicha.mascota} onChange={(e) => setNuevaFicha({ ...nuevaFicha, mascota: e.target.value })} className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border-0 focus:outline-none focus:ring-1 focus:ring-[#1A365D]" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Diagnóstico</label>
                    <input type="text" placeholder="Ej: Control general" value={nuevaFicha.diag} onChange={(e) => setNuevaFicha({ ...nuevaFicha, diag: e.target.value })} className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border-0 focus:outline-none focus:ring-1 focus:ring-[#1A365D]" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tratamiento</label>
                    <input type="text" placeholder="Observaciones clínicas" value={nuevaFicha.tto} onChange={(e) => setNuevaFicha({ ...nuevaFicha, tto: e.target.value })} className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border-0 focus:outline-none focus:ring-1 focus:ring-[#1A365D]" />
                </div>
                <button type="submit" className="w-full bg-[#1A365D] text-white text-xs font-bold py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5"><Plus className="w-4 h-4" /> Indexar Registro</button>
            </form>
        </div>
    );
};

/* NOTIFICACIONES GENERALES */
const NotificacionesSection = () => (
    <div className="space-y-3">
        {[
            { tipo: "EMAIL", c: "bg-blue-50 text-blue-600", dest: "soto@email.cl", msg: "Tu solicitud de adopción fue procesada con éxito.", time: "Hace 12 min" },
            { tipo: "SMS", c: "bg-purple-50 text-purple-600", dest: "+56 9 1234 5678", msg: "Alerta de coincidencia biométrica procesada.", time: "Hace 35 min" },
        ].map((n, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black ${n.c}`}>{n.tipo}</span>
                    <div><p className="text-xs font-bold text-slate-700">{n.dest}</p><p className="text-xs text-slate-400 font-medium mt-0.5">{n.msg}</p></div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">{n.time}</span>
            </div>
        ))}
    </div>
);

export default Usuarios;
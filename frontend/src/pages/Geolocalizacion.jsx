import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, AlertCircle, Search as SearchIcon, PawPrint, Filter, Clock, Sparkles } from "lucide-react";
import { geolocalizacionService } from "../services/geolocalizacionService";
import InteractiveReportMap from "../components/reports/InteractiveReportMap";
import { toast } from "sonner";

const MOCK_REPORTES = [
    { id: "R-482", type: "urgente",    nombre: "Perro herido",  especie: "Perro", zona: "Av. Costanera",   fecha: "Hoy 10:24",   descripcion: "Mestizo café, herido en pata trasera. Necesita atención veterinaria urgente.", lat: -41.4689, lng: -72.9411 },
    { id: "R-483", type: "perdida",    nombre: "Toby",          especie: "Perro", zona: "Pelluco",         fecha: "Hoy 09:10",   descripcion: "Labrador dorado con collar rojo. Responde a su nombre.",                       lat: -41.4612, lng: -72.9203 },
    { id: "R-484", type: "encontrada", nombre: "Gatito blanco", especie: "Gato",  zona: "Centro",          fecha: "Ayer",        descripcion: "Encontrado cerca de la plaza, muy cariñoso, sin chip.",                        lat: -41.4717, lng: -72.9360 },
    { id: "R-486", type: "perdida",    nombre: "Copito",        especie: "Perro", zona: "Mirasol",         fecha: "Hoy 07:45",   descripcion: "Poodle blanco pequeño, salió por portón abierto.",                             lat: -41.4901, lng: -72.9580 },
    { id: "R-487", type: "encontrada", nombre: "Perrito negro", especie: "Perro", zona: "Puerto Varas",    fecha: "Hoy 11:30",   descripcion: "Encontrado en la costanera, dócil, parece haber estado perdido varios días.",  lat: -41.3197, lng: -72.9853 },
    { id: "R-488", type: "urgente",    nombre: "Camada gatos",  especie: "Gato",  zona: "Chinquihue",      fecha: "Hoy 08:00",   descripcion: "4 gatitos abandonados, necesitan refugio inmediato.",                          lat: -41.5102, lng: -73.0210 },
];

const TYPE_META = {
    urgente:    { label: "Urgente",    color: "#EF4444", icon: AlertCircle },
    perdida:    { label: "Perdida",    color: "#EF6C00", icon: SearchIcon },
    encontrada: { label: "Encontrada", color: "#256944", icon: PawPrint },
};

const Geolocalizacion = () => {
    const [reportes, setReportes] = useState([]);
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        urgente: true, perdida: true, encontrada: true,
    });

    useEffect(() => {
        const descargarCoordenadas = async () => {
            try {
                const datosConectados = await geolocalizacionService.obtenerUbicaciones();
                if (datosConectados && datosConectados.length > 0) {
                    setReportes(datosConectados);
                } else {
                    setReportes(MOCK_REPORTES);
                }
            } catch (error) {
                console.error("Error al conectar con la API:", error);
                // Fallback para mantener la app funcional si hay un bloqueo temporal de puerto o CORS
                setReportes(MOCK_REPORTES);
            }
        };
        descargarCoordenadas();
    }, []);

    const visibles = useMemo(() => {
        return reportes.filter((r) => {
            const cumpleFiltroTipo = filters[r.type];
            const cumpleBusqueda = query === "" ||
                r.nombre.toLowerCase().includes(query.toLowerCase()) ||
                r.zona.toLowerCase().includes(query.toLowerCase()) ||
                r.id.toString().toLowerCase().includes(query.toLowerCase());
            return cumpleFiltroTipo && cumpleBusqueda;
        });
    }, [filters, query, reportes]);

    const counts = useMemo(() => {
        const c = { urgente: 0, perdida: 0, encontrada: 0 };
        reportes.forEach((r) => {
            if (c[r.type] !== undefined) c[r.type] += 1;
        });
        return c;
    }, [reportes]);

    const toggleFiltro = (tipo) => {
        setFilters((f) => ({ ...f, [tipo]: !f[tipo] }));
    };

    return (
        <div className="min-h-screen bg-[#FFFDF9] font-sans overflow-x-hidden relative flex flex-col">

            {/* Esferas de luz ambientales (Ambient Glow) */}
            <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#EAF5ED] blur-[130px] pointer-events-none opacity-80" />
            <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FDF1E2] blur-[120px] pointer-events-none opacity-70" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-16 pb-8 px-12 z-10">
                <div className="container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EAF5ED] text-[#256944] font-bold text-[10px] uppercase tracking-wider mb-3">
            <Sparkles className="h-3 w-3" /> Mapa comunitario
          </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1E293B] leading-[1.1] tracking-tight">
                        Mapa de reportes en <span className="text-[#1E5F44] italic">tiempo real</span>
                    </h1>
                    <p className="mt-3 text-slate-400 text-sm max-w-2xl font-normal">
                        Visualiza mascotas perdidas, encontradas y casos urgentes cerca de ti. Cada punto representa una alerta activa de nuestra comunidad.
                    </p>
                </div>
            </section>

            {/* SECCIÓN INTERACTIVA */}
            <section className="container mx-auto max-w-6xl px-12 pb-16 z-10 flex-1">
                <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">

                    {/* ASIDE: CONTROLES Y FILTROS */}
                    <aside className="space-y-5">
                        <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100/80">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="h-4 w-4 text-[#1A365D]" />
                                <h2 className="font-serif text-lg font-bold text-slate-800">Filtrar reportes</h2>
                            </div>

                            {/* Input de Búsqueda */}
                            <div className="relative mb-4 flex items-center bg-[#FFFDF9] border border-slate-200/60 rounded-xl px-3 py-2.5">
                                <SearchIcon className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Buscar por zona, ID..."
                                    className="w-full bg-transparent border-0 focus:outline-none text-xs text-slate-700 placeholder-slate-400 font-medium"
                                />
                            </div>

                            {/* Botones */}
                            <div className="space-y-2.5">
                                {Object.keys(TYPE_META).map((t) => {
                                    const meta = TYPE_META[t];
                                    const active = filters[t];
                                    const Icon = meta.icon;
                                    return (
                                        <button
                                            key={t}
                                            onClick={() => toggleFiltro(t)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl border transition-all bg-white ${
                                                active
                                                    ? "border-slate-100 shadow-[0_10px_25px_rgba(0,0,0,0.01)] opacity-100"
                                                    : "border-dashed border-slate-200 opacity-40 hover:opacity-70"
                                            }`}
                                        >
                      <span
                          className="h-8 w-8 rounded-xl grid place-items-center text-white shrink-0 shadow-sm"
                          style={{ backgroundColor: meta.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-slate-700">{meta.label}</p>
                                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{counts[t]} reporte{counts[t] !== 1 ? "s" : ""}</p>
                                            </div>
                                            <span className={`h-2 w-2 rounded-full ${active ? "bg-[#22C55E]" : "bg-slate-200"}`} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-[#1A365D] text-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/40 space-y-3">
                            <PawPrint className="h-6 w-6 text-[#F5A524]" />
                            <h3 className="font-serif text-lg font-bold leading-tight">¿Viste o perdiste una mascota?</h3>
                            <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                                Crea un reporte desde el módulo principal y aparecerá geolocalizado en el mapa para el rastreo comunitario.
                            </p>
                            <Link to="/reportar" className="block text-center bg-[#F5A524] text-slate-900 text-xs font-bold py-2.5 rounded-xl transition-transform hover:scale-[1.02] mt-2">
                                Crear reporte
                            </Link>
                        </div>
                    </aside>

                    {/* CONTENEDOR FÍSICO DEL MAPA */}
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resultados en el cuadrante</p>
                                <p className="font-serif text-xl font-bold text-slate-800">
                                    {visibles.length} reporte{visibles.length !== 1 ? "s" : ""}
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" /> Sincronizado en vivo
                            </div>
                        </div>

                        {/* Caja del mapa con dimensiones explícitas e inyección CSS controlada */}
                        <div className="w-full h-[540px] relative block clear-both z-10 bg-slate-50">
                            <InteractiveReportMap reportes={visibles} typeMeta={TYPE_META} />
                        </div>
                    </div>

                </div>
            </section>

            {/* RECUADROS DE REPORTES RECIENTES */}
            <section className="container mx-auto max-w-6xl px-12 pb-24 z-10">
                <h2 className="font-serif text-2xl font-bold mb-6 text-[#1A365D] tracking-tight">Reportes recientes en la zona</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibles.map((r) => {
                        const meta = TYPE_META[r.type];
                        const Icon = meta.icon;
                        return (
                            <article key={r.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between gap-3">
                    <span
                        className="h-9 w-9 rounded-xl grid place-items-center text-white shrink-0 shadow-sm"
                        style={{ backgroundColor: meta.color }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-300">ID: #{r.id}</span>
                                    </div>
                                    <p className="font-serif text-lg font-bold mt-3 text-slate-800 tracking-tight">{r.nombre}</p>
                                    <p className="text-[11px] font-bold text-[#22C55E] mt-0.5">{r.especie} · {r.zona}</p>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed font-normal line-clamp-3">{r.descripcion}</p>
                                </div>
                                <p className="text-[10px] text-slate-400 font-semibold mt-4 border-t border-slate-50 pt-3 flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-300" /> {r.fecha}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>
            {/* ================= BARRA DE FOOTER CORPORATIVO UNIFICADO ================= */}
            <footer className="bg-[#1A365D] text-slate-300 py-12 px-8 md:px-12 mt-auto border-t border-white/5 shadow-inner w-full font-sans z-10">
                <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-10 border-b border-white/10 pb-10">

                    {/* Columna 1: Identidad Visual */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-xl shadow-sm flex items-center justify-center">
                                <span className="text-xl">🐶</span>
                            </div>
                            <div>
                                <h2 className="font-bold text-white text-base leading-none tracking-tight">Sanos y Salvos</h2>
                                <p className="text-[9px] text-[#22C55E] font-extrabold tracking-widest uppercase mt-1">Cuidado Animal</p>
                            </div>
                        </div>
                        <p className="text-xs leading-relaxed max-w-sm text-slate-300 font-normal">
                            Reunimos mascotas perdidas con sus familias, gestionamos adopciones responsables y velamos por la salud animal en cada barrio.
                        </p>
                    </div>

                    {/* Columna 2: Enlaces de Navegación Directos */}
                    <div>
                        <h3 className="text-white font-bold mb-4 font-serif text-base tracking-tight">Servicios</h3>
                        <div className="flex flex-col space-y-2 text-xs text-slate-400 font-semibold">
                            <a href="/adopciones" className="hover:text-white transition-colors w-fit">Adopciones</a>
                            <a href="/reportar" className="hover:text-white transition-colors w-fit">Reportar mascota</a>
                            <a href="/donaciones" className="hover:text-white transition-colors w-fit">Donar</a>
                        </div>
                    </div>

                    {/* Columna 3: Información de Contacto Regional */}
                    <div>
                        <h3 className="text-white font-bold mb-4 font-serif text-base tracking-tight">Contacto</h3>
                        <ul className="space-y-3 text-xs text-slate-400 font-semibold">
                            <li className="flex items-center gap-2">
                                {/* Icono de Ubicación SVG Nativo */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A524" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                <span className="text-slate-300">Puerto Montt, Chile</span>
                            </li>
                            <li className="flex items-center gap-2">
                                {/* Icono de Correo SVG Nativo */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A524" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                </svg>
                                <span className="text-slate-300">hola@sanosysalvos.cl</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Fila Inferior de Créditos y Tecnologías */}
                <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center text-[10px] font-bold pt-6 text-slate-400/80 tracking-wide">
                    <p>© 2026 Sanos y Salvos. Todos los derechos reservados.</p>
                    <p className="mt-2 md:mt-0 flex items-center gap-1">
                        Hecho con 💛 para los AWS microservices
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Geolocalizacion;
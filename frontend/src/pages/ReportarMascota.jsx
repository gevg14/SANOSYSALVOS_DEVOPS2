import React, { useState, useRef } from "react";

export default function ReportarMascota() {
    // 1. Estados para la selección de tipo de reporte (Activo por defecto: AVISTAMIENTO)
    const [tipo, setTipo] = useState("AVISTAMIENTO");

    // 2. Estados para los campos de texto del formulario
    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");
    const [color, setColor] = useState("");
    const [tamano, setTamano] = useState("");
    const [ubicacion, setUbicacion] = useState(""); // Campo inferior de tu pantalla
    const [foto, setFoto] = useState(null);
    const [nombreFoto, setNombreFoto] = useState("");

    // Referencia para abrir el explorador de la PC al hacer clic en el cuadro gris
    const fileInputRef = useRef(null);

    const handleZonaClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoto(file);
            setNombreFoto(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("tipo", tipo); // Envía: PERDIDO, ENCONTRADO o AVISTAMIENTO
        formData.append("nombre", nombre);
        formData.append("especie", especie);
        formData.append("color", color);
        formData.append("tamano", tamano);
        formData.append("ubicacion", ubicacion);
        formData.append("foto", foto);

        try {
            const response = await fetch("http://localhost:8080/api/reportes", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert(`¡Reporte de ${tipo} publicado con éxito!`);
                // Limpieza del formulario
                setNombre(""); setEspecie(""); setColor(""); setTamano(""); setUbicacion(""); setFoto(null); setNombreFoto("");
            } else {
                alert("Error en el servidor al procesar el reporte.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el microservicio.");
        }
    };

    // Estilos dinámicos para los botones/tarjetas de selección
    const getTabStyle = (tabName) => {
        const isActive = tipo === tabName;
        return {
            flex: 1,
            padding: "20px",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textAlign: "center",
            backgroundColor: "#fff",
            border: isActive ? "2px solid #2e7d32" : "1px solid #e0e0e0",
            boxShadow: isActive ? "0 4px 12px rgba(46, 125, 50, 0.15)" : "none",
            transform: isActive ? "scale(1.02)" : "scale(1)"
        };
    };

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', padding: '40px', maxWidth: '900px', margin: '0 auto', color: '#2c3e50' }}>

            {/* ENCABEZADO */}
            <span style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                🐾 MÓDULO DE REPORTES
            </span>
            <h1 style={{ fontSize: '36px', margin: '15px 0 5px 0', fontWeight: '700' }}>
                Cada minuto cuenta. <span style={{ color: '#2e7d32', fontStyle: 'italic' }}>Comencemos.</span>
            </h1>
            <p style={{ color: '#7f8c8d', margin: '0 0 30px 0', fontSize: '14px' }}>
                Tu reporte se publica al instante y nuestro motor de coincidencias compara automáticamente con todas las mascotas registradas en la base de datos.
            </p>

            {/* TABS INTERACTIVOS (Cambian el estado 'tipo' al hacer clic) */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                <div onClick={() => setTipo("PERDIDO")} style={getTabStyle("PERDIDO")}>
                    <span style={{ fontSize: '20px' }}>⚠️</span>
                    <h4 style={{ margin: '10px 0 5px 0', fontWeight: '600' }}>Perdí a mi mascota</h4>
                    <small style={{ color: '#95a5a6' }}>Quiero registrar una desaparición</small>
                </div>

                <div onClick={() => setTipo("ENCONTRADO")} style={getTabStyle("ENCONTRADO")}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <h4 style={{ margin: '10px 0 5px 0', fontWeight: '600' }}>Encontré una mascota</h4>
                    <small style={{ color: '#95a5a6' }}>Quiero ayudar a regresarla a casa</small>
                </div>

                <div onClick={() => setTipo("AVISTAMIENTO")} style={getTabStyle("AVISTAMIENTO")}>
                    <span style={{ fontSize: '20px' }}>👁️</span>
                    <h4 style={{ margin: '10px 0 5px 0', fontWeight: '600' }}>Avistamiento</h4>
                    <small style={{ color: '#95a5a6' }}>La vi en la calle pero no la tengo</small>
                </div>
            </div>

            {/* FORMULARIO PRINCIPAL */}
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #f0f0f0' }}>

                {/* CUADRO PARA CARGAR FOTO DESDE PC */}
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Foto de la mascota</label>
                <div
                    onClick={handleZonaClick}
                    style={{
                        border: '2px dashed #dcdde1',
                        borderRadius: '12px',
                        padding: '40px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: '#fafafa',
                        marginBottom: '25px'
                    }}
                >
                    <span style={{ fontSize: '30px', color: '#95a5a6' }}>📤</span>
                    <p style={{ margin: '10px 0 0 0', fontWeight: '500', fontSize: '15px' }}>
                        {nombreFoto ? `Seleccionada: ${nombreFoto}` : "Arrastra una foto o haz clic"}
                    </p>
                    <small style={{ color: '#b2bec3' }}>PNG, JPG hasta 5MB</small>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                        required
                    />
                </div>

                {/* FILA 1: NOMBRE Y ESPECIE */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Nombre (si lo sabes)</label>
                        <input type="text" placeholder="Ej: Toby" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', fontSize: '14px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Especie</label>
                        <input type="text" placeholder="Perro / Gato / Otro" value={especie} onChange={(e) => setEspecie(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', fontSize: '14px' }} />
                    </div>
                </div>

                {/* FILA 2: COLOR Y TAMAÑO */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Color</label>
                        <input type="text" placeholder="Ej: Café con manchas blancas" value={color} onChange={(e) => setColor(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', fontSize: '14px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Tamaño</label>
                        <input type="text" placeholder="Pequeño / Mediano / Grande" value={tamano} onChange={(e) => setTamano(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', fontSize: '14px' }} />
                    </div>
                </div>

                {/* FILA 3: UBICACIÓN (Tu input final) */}
                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Última ubicación conocida o avistada</label>
                    <input type="text" placeholder="Ej: Calle Regimiento / Sede Puerto Montt" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', fontSize: '14px' }} />
                </div>

                {/* BOTÓN ENVIAR */}
                <button type="submit" style={{ padding: '14px 28px', backgroundColor: '#1b5e20', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', display: 'block', marginLeft: 'auto' }}>
                    Publicar Reporte
                </button>
            </form>
        </div>
    );
}
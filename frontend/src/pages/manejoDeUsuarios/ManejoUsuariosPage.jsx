// src/pages/admin/ManejoUsuariosPage.jsx
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PAGE_SIZE = 5;

export default function ManejoUsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [orden, setOrden] = useState("desc");
    const [pagina, setPagina] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { token, user } = useAuth();
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await api.get("/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsuarios(response.data);
                console.log(response.data);

            } catch (err) {
                setError("Error al cargar los usuarios");
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    // filtrar por nombre
    const filtrados = usuarios.filter((u) =>
        u.Nombre.toLowerCase().includes(filtro.toLowerCase()),
    );

    // ordenar por Total
    const ordenados = [...filtrados].sort((a, b) =>
        orden === "desc" ? b.Total - a.Total : a.Total - b.Total,
    );

    // paginar
    const totalPaginas = Math.ceil(ordenados.length / PAGE_SIZE);
    const paginados = ordenados.slice(
        (pagina - 1) * PAGE_SIZE,
        pagina * PAGE_SIZE,
    );

    // resetear página al filtrar
    const handleFiltro = (e) => {
        setFiltro(e.target.value);
        setPagina(1);
    };

    if (loading)
        return <p className="text-neutral-400">Cargando usuarios...</p>;
    if (error) return <p className="text-tertiary">{error}</p>;

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-white">
                Manejo de usuarios
            </h2>

            {/* Controles */}
            <div className="flex items-center gap-4 flex-wrap">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={filtro}
                    onChange={handleFiltro}
                    className="bg-neutral-800 border border-neutral-700 text-white text-sm rounded px-4 py-2 w-64 focus:outline-none focus:border-primary"
                />
                <button
                    onClick={() => setOrden(orden === "desc" ? "asc" : "desc")}
                    className="text-sm px-4 py-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
                >
                    Portfolio:{" "}
                    {orden === "desc" ? "Mayor → Menor" : "Menor → Mayor"}
                </button>
            </div>

            {/* Tabla */}
            <div className="rounded-lg border border-neutral-800 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-neutral-800 text-neutral-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">#</th>
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-right">
                                Portfolio total
                            </th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {paginados.map((usuario, index) => {
                            const posicionGlobal =
                                (pagina - 1) * PAGE_SIZE + index;
                            const esPrimero =
                                posicionGlobal === 0 &&
                                orden === "desc" &&
                                !filtro;

                            return (
                                <tr
                                    key={usuario.id}
                                    className={`transition-colors ${
                                        esPrimero
                                            ? "bg-primary-950 border-l-2 border-l-primary"
                                            : "bg-neutral-900 hover:bg-neutral-800"
                                    }`}
                                >
                                    <td className="px-6 py-4 text-neutral-400">
                                        {esPrimero ? "🏆" : posicionGlobal + 1}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">
                                        {usuario.Nombre}
                                        {esPrimero && (
                                            <span className="ml-2 text-xs text-primary font-semibold">
                                                Mejor portfolio
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-primary">
                                        $
                                        {Number(usuario.Total).toLocaleString(
                                            "es-AR",
                                            { minimumFractionDigits: 2 },
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/usuarios/${usuario.id}/editar`,
                                                )
                                            }
                                            className="text-xs px-3 py-1.5 rounded bg-secondary hover:bg-secondary-600 text-white transition-colors"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {paginados.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-8 text-center text-neutral-500"
                                >
                                    No se encontraron usuarios
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginado */}
            {totalPaginas > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPagina((p) => p - 1)}
                        disabled={pagina === 1}
                        className="text-sm px-3 py-1.5 rounded bg-neutral-800 text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Anterior
                    </button>

                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                        (n) => (
                            <button
                                key={n}
                                onClick={() => setPagina(n)}
                                className={`text-sm w-8 h-8 rounded transition-colors ${
                                    n === pagina
                                        ? "bg-primary text-white font-semibold"
                                        : "bg-neutral-800 text-neutral-400 hover:text-white"
                                }`}
                            >
                                {n}
                            </button>
                        ),
                    )}

                    <button
                        onClick={() => setPagina((p) => p + 1)}
                        disabled={pagina === totalPaginas}
                        className="text-sm px-3 py-1.5 rounded bg-neutral-800 text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Siguiente →
                    </button>
                </div>
            )}
        </div>
    );
}

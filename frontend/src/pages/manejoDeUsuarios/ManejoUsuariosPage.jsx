// src/pages/admin/ManejoUsuariosPage.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import FilaUsuario from "./components/FilaUsuarios";
import { validarDatos } from "../../utils/validarDatos";

const PAGE_SIZE = 5;

export default function ManejoUsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [orden, setOrden] = useState("desc");
    const [pagina, setPagina] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingUserId, setEditingUserId] = useState(null);
    const [nombreEditado, setNombreEditado] = useState("");
    const [passwordEditado, setPasswordEditado] = useState("");
    const [repeatPasswordEditado, setRepeatPasswordEditado] = useState("");
    const [editErrors, setEditErrors] = useState([]);
    const [editSuccess, setEditSuccess] = useState("");
    const [saving, setSaving] = useState(false);

    const { token, logout } = useAuth();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await api.get("/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsuarios(response.data);
            } catch {
                setError("Error al cargar los usuarios");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUsuarios();
        } else {
            setLoading(false);
            setError("No hay sesión activa");
        }
    }, [token]);

    const filtrados = usuarios.filter((u) =>
        String(u.Nombre ?? "").toLowerCase().includes(filtro.toLowerCase()),
    );

    const ordenados = [...filtrados].sort((a, b) =>
        orden === "desc"
            ? Number(b.Total) - Number(a.Total)
            : Number(a.Total) - Number(b.Total),
    );

    const totalPaginas = Math.ceil(ordenados.length / PAGE_SIZE);
    const paginados = ordenados.slice(
        (pagina - 1) * PAGE_SIZE,
        pagina * PAGE_SIZE,
    );

    const handleFiltro = (e) => {
        setFiltro(e.target.value);
        setPagina(1);
    };

    const resetEditState = () => {
        setNombreEditado("");
        setPasswordEditado("");
        setRepeatPasswordEditado("");
        setEditErrors([]);
        setEditSuccess("");
    };

    function cancelarEdicion() {
        setEditingUserId(null);
        resetEditState();
    }

    function handleEditarClick(usuario) {
        if (editingUserId === usuario.id) {
            cancelarEdicion();
            return;
        }

        setEditingUserId(usuario.id);
        resetEditState();
    }

    async function handleGuardarUsuario(usuarioId) {
        const errors = validarDatos({
            username: nombreEditado,
            password: passwordEditado,
            repeatPassword: repeatPasswordEditado,
            requireEmail: false,
            requireUsername: false,
            requirePassword: false,
            requireAtLeastOneField: true,
        });

        if (errors.length > 0) {
            setEditErrors(errors);
            setEditSuccess("");
            return;
        }

        const nombreLimpio = nombreEditado.trim();
        const data = {};

        if (nombreLimpio) {
            data.name = nombreLimpio;
        }

        if (passwordEditado) {
            data.password = passwordEditado;
        }

        try {
            setSaving(true);
            setEditErrors([]);
            setEditSuccess("");

            await api.put(`/users/${usuarioId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsuarios((prev) =>
                prev.map((u) =>
                    u.id === usuarioId
                        ? {
                              ...u,
                              Nombre: nombreLimpio || u.Nombre,
                          }
                        : u,
                ),
            );

            setEditSuccess("Cambio realizado correctamente");
            setEditingUserId(null);
            setNombreEditado("");
            setPasswordEditado("");
            setRepeatPasswordEditado("");
            setEditErrors([]);
        } catch (err) {
            const apiMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "No se pudo actualizar el usuario";

            if (err?.response?.status === 401) {
                logout();
            }

            setEditErrors([apiMessage]);
            setEditSuccess("");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <p className="text-neutral-400">Cargando usuarios...</p>;
    }

    if (error) {
        return <p className="text-tertiary">{error}</p>;
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-white">
                Manejo de usuarios
            </h2>

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
                                <FilaUsuario
                                    key={usuario.id}
                                    usuario={usuario}
                                    posicionGlobal={posicionGlobal}
                                    esPrimero={esPrimero}
                                    isEditing={editingUserId === usuario.id}
                                    onEditClick={() => handleEditarClick(usuario)}
                                    onCancel={cancelarEdicion}
                                    onSave={() => handleGuardarUsuario(usuario.id)}
                                    nombreEditado={nombreEditado}
                                    setNombreEditado={setNombreEditado}
                                    passwordEditado={passwordEditado}
                                    setPasswordEditado={setPasswordEditado}
                                    repeatPasswordEditado={repeatPasswordEditado}
                                    setRepeatPasswordEditado={setRepeatPasswordEditado}
                                    validationErrors={editErrors}
                                    successMessage={editSuccess}
                                    isSaving={saving}
                                />
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

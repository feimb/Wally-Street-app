export default function UsuarioEditForm({
    onCancel,
    onSave,
    nombreEditado,
    setNombreEditado,
    passwordEditado,
    setPasswordEditado,
    repeatPasswordEditado,
    setRepeatPasswordEditado,
    validationErrors = [],
    successMessage = "",
    isSaving = false,
}) {
    return (
        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">
                    Editar usuario
                </h3>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-xs text-neutral-400 hover:text-white"
                >
                    Cancelar
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <label className="text-sm text-neutral-300">
                    <span className="block mb-1">Nombre</span>
                    <input
                        type="text"
                        value={nombreEditado}
                        onChange={(e) => setNombreEditado(e.target.value)}
                        placeholder="Nuevo nombre"
                        className="w-full bg-neutral-800 border border-neutral-700 text-white rounded px-3 py-2 focus:outline-none focus:border-primary"
                    />
                </label>

                <label className="text-sm text-neutral-300">
                    <span className="block mb-1">Contraseña</span>
                    <input
                        type="password"
                        value={passwordEditado}
                        onChange={(e) => setPasswordEditado(e.target.value)}
                        placeholder="Nueva contraseña"
                        className="w-full bg-neutral-800 border border-neutral-700 text-white rounded px-3 py-2 focus:outline-none focus:border-primary"
                    />
                </label>

                <label className="text-sm text-neutral-300 md:col-span-2">
                    <span className="block mb-1">Repetir contraseña</span>
                    <input
                        type="password"
                        value={repeatPasswordEditado}
                        onChange={(e) => setRepeatPasswordEditado(e.target.value)}
                        placeholder="Repetir contraseña"
                        className="w-full bg-neutral-800 border border-neutral-700 text-white rounded px-3 py-2 focus:outline-none focus:border-primary"
                    />
                </label>
            </div>

            {validationErrors.length > 0 && (
                <div className="mt-4 rounded-lg border border-red-400 bg-red-50 p-3 text-red-700">
                    <ul className="list-disc pl-5">
                        {validationErrors.map((error, idx) => (
                            <li key={`${error}-${idx}`} className="list-disc">
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {successMessage && (
                <div className="mt-4 rounded-lg border border-green-400 bg-green-50 p-3 text-green-700">
                    {successMessage}
                </div>
            )}

            <div className="flex gap-2 mt-4">
                <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                    className="text-sm px-4 py-2 rounded bg-primary text-white hover:bg-primary-600 disabled:opacity-50 transition-colors"
                >
                    {isSaving ? "Guardando..." : "Guardar cambios"}
                </button>
            </div>
        </div>
    );
}
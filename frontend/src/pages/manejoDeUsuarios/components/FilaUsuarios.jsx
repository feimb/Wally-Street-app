import UsuarioEditForm from "./UsuarioEditForm";

export default function FilaUsuarios({
    usuario,
    posicionGlobal,
    esPrimero,
    isEditing,
    onEditClick,
    onCancel,
    onSave,
    nombreEditado,
    setNombreEditado,
    passwordEditado,
    setPasswordEditado,
    repeatPasswordEditado,
    setRepeatPasswordEditado,
    validationErrors,
    successMessage,
    isSaving,
}) {
    return (
        <>
            <tr
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
                    {Number(usuario.Total).toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                    })}
                </td>
                <td className="px-6 py-4 text-center">
                    <button
                        type="button"
                        onClick={onEditClick}
                        className="text-xs px-3 py-1.5 rounded bg-secondary hover:bg-secondary-600 text-white transition-colors"
                    >
                        {isEditing ? "Cerrar" : "Editar"}
                    </button>
                </td>
            </tr>

            {isEditing && (
                <tr>
                    <td colSpan={4} className="px-6 py-4 bg-neutral-950">
                        <UsuarioEditForm
                            onCancel={onCancel}
                            onSave={onSave}
                            nombreEditado={nombreEditado}
                            setNombreEditado={setNombreEditado}
                            passwordEditado={passwordEditado}
                            setPasswordEditado={setPasswordEditado}
                            repeatPasswordEditado={repeatPasswordEditado}
                            setRepeatPasswordEditado={setRepeatPasswordEditado}
                            validationErrors={validationErrors}
                            successMessage={successMessage}
                            isSaving={isSaving}
                        />
                    </td>
                </tr>
            )}
        </>
    );
}
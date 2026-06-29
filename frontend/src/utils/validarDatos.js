const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function validarDatos({ email, username, password }) {
    const errors = [];

    if (!emailRegex.test(email.trim())) {
        errors.push("El email debe tener un formato válido.");
    }

    if (!username.trim()) {
        errors.push("El nombre de usuario no puede ser vacío.");
    } else if (username.trim().length > 30) {
        errors.push("El nombre de usuario no puede superar los 30 caracteres.");
    }

    if (!passwordRegex.test(password)) {
        errors.push(
            "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.",
        );
    }

    return errors;
}
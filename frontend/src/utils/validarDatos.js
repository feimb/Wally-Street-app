const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function validarDatos({
    email = "",
    username = "",
    password = "",
    repeatPassword = "",
    requireEmail = true,
    requireUsername = true,
    requirePassword = true,
    requireAtLeastOneField = false,
}) {
    const errors = [];

    const emailValue = (email ?? "").trim();
    const usernameValue = (username ?? "").trim();
    const passwordValue = password ?? "";
    const repeatPasswordValue = repeatPassword ?? "";

    const hasAnyValue =
        emailValue || usernameValue || passwordValue || repeatPasswordValue;

    if (requireAtLeastOneField && !hasAnyValue) {
        errors.push("Debes introducir al menos un cambio.");
    }

    if (requireEmail) {
        if (!emailValue) {
            errors.push("El email no puede ser vacío.");
        } else if (!emailRegex.test(emailValue)) {
            errors.push("El email debe tener un formato válido.");
        }
    } else if (emailValue && !emailRegex.test(emailValue)) {
        errors.push("El email debe tener un formato válido.");
    }

    if (requireUsername) {
        if (!usernameValue) {
            errors.push("El nombre de usuario no puede ser vacío.");
        } else if (usernameValue.length > 30) {
            errors.push(
                "El nombre de usuario no puede superar los 30 caracteres.",
            );
        }
    } else if (usernameValue && usernameValue.length > 30) {
        errors.push("El nombre de usuario no puede superar los 30 caracteres.");
    }

    if (requirePassword) {
        if (!passwordValue) {
            errors.push("La contraseña no puede ser vacía.");
        } else if (!passwordRegex.test(passwordValue)) {
            errors.push(
                "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.",
            );
        }
    } else if (passwordValue) {
        if (!passwordRegex.test(passwordValue)) {
            errors.push(
                "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.",
            );
        }
    }

    if (
        passwordValue &&
        repeatPasswordValue &&
        passwordValue !== repeatPasswordValue
    ) {
        errors.push("Las contraseñas deben ser iguales.");
    }

    return errors;
}
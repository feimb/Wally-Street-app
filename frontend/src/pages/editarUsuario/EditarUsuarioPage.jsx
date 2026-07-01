import React, { useState } from "react";
import { InputText } from "../../components/common/InputText";
import { User } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import { validarDatos } from "../../utils/validarDatos";

export const EditarUsuarioPage = () => {
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    const { token, logout } = useAuth();

    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : {};
    const { usuario } = decodedToken;

    async function handleSubmit(e) {
        e.preventDefault();

        setErrors([]);
        setSuccessMessage("");

        const validationErrors = validarDatos({
            username: nombre,
            password,
            repeatPassword,
            requireEmail: false,
            requireUsername: false,
            requirePassword: false,
            requireAtLeastOneField: true,
        });

        if (password && !repeatPassword) {
            validationErrors.push("Debes repetir la contraseña.");
        }

        if (!password && repeatPassword) {
            validationErrors.push(
                "No puedes repetir una contraseña sin escribirla.",
            );
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const nombreLimpio = nombre.trim();
        const data = {};

        if (nombreLimpio) {
            data.name = nombreLimpio;
        }

        if (password) {
            data.password = password;
        }

        try {
            await api.put(`/users/${usuario}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccessMessage("Cambio realizado correctamente");
            setNombre("");
            setPassword("");
            setRepeatPassword("");
        } catch (err) {
            const apiMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "No se pudo actualizar el usuario";

            if (err?.response?.status === 401) {
                logout();
            }

            setErrors([apiMessage]);
        }
    }

    return (
        <form
            className="w-xl p-8 my-12 mx-auto bg-neutral flex flex-col gap-8 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col mx-auto items-center">
                <div className="p-1.5 bg-primary rounded-lg text-neutral">
                    <User size={30} />
                </div>
                <h2 className="mt-2">Cambio de nombre o Contraseña</h2>
            </div>

            <InputText
                name="name"
                value={nombre}
                setValue={setNombre}
                placeholder="Nombre"
            />

            <div className="flex gap-8">
                <InputText
                    name="password"
                    type="password"
                    value={password}
                    setValue={setPassword}
                    placeholder="Contraseña"
                />
                <InputText
                    name="repeatPassword"
                    type="password"
                    value={repeatPassword}
                    setValue={setRepeatPassword}
                    placeholder="RepetirContraseña"
                />
            </div>

            {errors.length > 0 && (
                <div className="mt-4 rounded-lg border border-red-400 bg-red-50 p-3 text-red-700">
                    <ul className="list-disc pl-5">
                        {errors.map((error, index) => (
                            <li key={`${error}-${index}`} className="list-disc">
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

            <button className="h-12 text-neutral bg-primary rounded-lg font-bold text-lg cursor-pointer">
                Cambiar
            </button>
        </form>
    );
};

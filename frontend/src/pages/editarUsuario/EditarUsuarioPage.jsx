import React, { useState } from "react";
import { InputText } from "../../components/common/InputText";
import { User } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

export const EditarUsuarioPage = () => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    const { token, login, logout } = useAuth();
    const { usuario } = JSON.parse(atob(token.split(".")[1]));
    async function handleSubmit(e) {
        e.preventDefault();

        const err = [];
        if (!password && !nombre) {
            err.push("rellena la contraseña o el nombre para cambiarlo");
            setErrors(err);
            return;
        }
        if (password) {
            if (password !== repeatPassword) {
                err.push("las contraseñas deben ser iguales");
            }
            if (!passwordRegex.test(password)) {
                err.push(
                    "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.",
                );
            }
        }
        if (nombre) {
            if (nombre.trim().length > 30) {
                err.push(
                    "El nombre de usuario no puede superar los 30 caracteres.",
                );
            }
        }

        if (err.length > 0) {
            setErrors(err);
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
            setUsername("");
        } catch (err) {
            const apiMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error
            if (err.response === 401) {
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
                setValue={setNombre}
                placeholder={"Nombre"}
            />

            <div className="flex gap-8">
                <InputText
                    name="password"
                    type="password"
                    setValue={setPassword}
                    placeholder={"Contraseña"}
                />
                <InputText
                    name="ReapetPassword"
                    type="password"
                    setValue={setRepeatPassword}
                    placeholder={"RepetirContraseña"}
                />
            </div>
            {errors.length > 0 && (
                <div className="mt-4 rounded-lg border border-red-400 bg-red-50 p-3 text-red-700">
                    <ul className="list-disc pl-5 ">
                        {errors.map((error) => {
                            return <li className="list-disc">{error}</li>;
                        })}
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

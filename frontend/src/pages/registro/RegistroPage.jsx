import React, { useState } from "react";
import { InputText } from "../../components/common/InputText";
import { Wallet } from "lucide-react";
import { validarDatos } from "../../utils/validarDatos";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

export const RegistroPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const { token, login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setSuccessMessage("");

        const validationErrors = validarDatos({ email, username, password });
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await api.post("/users", {
                email: email.trim(),
                nombre: username.trim(),
                password,
            });

            setSuccessMessage("Usuario registrado correctamente.");
            login(email,password)
            setEmail("");
            setUsername("");
            setPassword("");
            navigation();
        } catch (error) {
            const apiMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "No se pudo completar el registro.";

            if (
                error?.response?.status === 409 ||
                apiMessage.toLowerCase().includes("email")
            ) {
                setErrors(["El email ya está en uso."]);
                return;
            }

            setErrors([apiMessage]);
        }
    }

    return (
        <form
            className="mb-16 p-8 bg-neutral flex flex-col w-lg mt-8 mx-auto rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center gap-2 mb-4">
                <Wallet className="w-8 h-8 p-1 text-neutral bg-primary rounded-lg" />
                <h2 className="text-primary text-xl font-bold">WallyStreet</h2>
                <p className="text-lg">Registro de Usuario</p>
            </div>

            <div className="flex flex-col gap-8">
                <InputText
                    type="email"
                    name="email"
                    placeholder="Email"
                    setValue={setEmail}
                    isReq={true}
                />
                <InputText
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    setValue={setUsername}
                    isReq={true}
                />
                <InputText
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    setValue={setPassword}
                    isReq={true}
                />
            </div>
            {successMessage && (
                <div className="mt-4 rounded-lg border border-green-400 bg-green-50 p-3 text-green-700">
                    {successMessage}
                </div>
            )}
            {errors.length > 0 && (
                <div className="mt-4 rounded-lg border border-red-400 bg-red-50 p-3 text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button className="mt-12 h-12 text-neutral bg-primary rounded-lg font-bold text-lg cursor-pointer">
                Registrarse
            </button>
        </form>
    );
};

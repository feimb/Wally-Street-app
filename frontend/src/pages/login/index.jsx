import React, { useState } from "react";
import { InputText } from "../../components/common/InputText";
import { Wallet, Gamepad2 } from "lucide-react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
export const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { token, login, logout } = useAuth();
    function handleSubmit(e) {
        e.preventDefault();
        login(email, password);
    }
    return (
        <form
            className="p-8 bg-neutral flex flex-col w-lg mt-8 mx-auto rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center gap-2 mb-4">
                <Wallet className="w-8 h-8 p-1 text-neutral bg-primary rounded-lg" />
                <h2 className="text-primary text-xl font-bold ">WallyStreet</h2>
                <p className="text-lg">Inicio de Sesion</p>
            </div>
            <div className="flex flex-col gap-8">
                <InputText
                    type="email"
                    name={"email"}
                    placeholder={"Email"}
                    setValue={setEmail}
                    isReq={true}
                />
                <InputText
                    type="password"
                    name={"password"}
                    placeholder={"constraseña"}
                    setValue={setPassword}
                    isReq={true}
                />
            </div>
            <button className="mt-12 h-12 text-neutral bg-primary rounded-lg font-bold text-lg cursor-pointer">
                Ingresar
            </button>
        </form>
    );
};

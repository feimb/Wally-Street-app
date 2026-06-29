import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";
function useAuth() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    async function login(email, password) {
        try {
            const response = await api.post("/login", { email, password });

            let payload = response.data;

            if (typeof payload === "string") {
                const cleanPayload = payload.replace(/^seminariophp/, "").trim();
                payload = JSON.parse(cleanPayload);
            }

            const authToken = payload?.token ?? payload?.data?.token;

            if (!authToken) {
                throw new Error("No se recibió un token válido");
            }

            localStorage.setItem("token", authToken);
            setToken(authToken);
            navigate("/");
        } catch (error) {
            console.error("Error en login:", error);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

    return { token, login, logout };
}

export default useAuth;
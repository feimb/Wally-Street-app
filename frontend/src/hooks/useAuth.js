import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
function useAuth() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const decoded = jwtDecode(token);
                const id = decoded.usuario
                const response = await api.get(`/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error al obtener usuario:", error);
                logout();
            } finally {
                console.log(user)
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);
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
            window.location.href = "/"
        } catch (error) {
            console.error("Error en login:", error);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate("/login");
    }

    return { token, login, logout, user, loading };
}

export default useAuth;
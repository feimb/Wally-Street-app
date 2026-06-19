import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";
function useAuth() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    async function login(email, password) {
        try {
            const response = await api.post("/login", { email, password });
            const token = response.data;

            localStorage.setItem("token", token);
            navigate("/")
            setToken(token);
        } catch (error) {
            console.error(error);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login")
    }

    return { token, login, logout };
}

export default useAuth;
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function isTokenValid(token) {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        const expDate = new Date(decoded.token_expired_at);
        return expDate > new Date();
    } catch {
        return false;
    }
}

export function AdminRoute() {
    const token = localStorage.getItem("token");

    if (!isTokenValid(token)) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    const decoded = jwtDecode(token);
    if (decoded.isAdmin) return <Navigate to="/" replace />;

    return <Outlet />;
}

import { Routes, Route, BrowserRouter } from "react-router";
import { ProtectedRoute } from "./protectRoute/ProtectedRoute";
import { Login } from "../pages/login";
import { Portfolio } from "../pages/portafolio/Index";
import { RegistroPage } from "../pages/registro/RegistroPage";
import { EditarUsuarioPage } from "../pages/editarUsuario/EditarUsuarioPage";
function WallyRoutes() {
    return (
        <Routes>
            {/* Públicas */}
            {/* <Route path="/" element={<Stat />} /> */}
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/login" element={<Login />} />

            {/* Privadas */}
            <Route element={<ProtectedRoute />}>
             <Route path="/portfolio" element={<Portfolio />} />
             {/* <Route path="/operaciones" element={<Operaciones />} />
                <Route path="/panel" element={<Panel />} /> */}
                <Route path="/editar" element={<EditarUsuarioPage />} /> 
            </Route>

            {/* Admin */}
            {/* <Route element={<AdminRoute />}>
          <Route path="/usuarios" element={<ManejoUsuarios />} />
          <Route path="/usuarios/:id/editar" element={<EditarUsuario />} />
          </Route> */}
        </Routes>
    );
}

export default WallyRoutes;

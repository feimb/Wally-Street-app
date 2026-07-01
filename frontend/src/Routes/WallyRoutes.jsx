import { Routes, Route } from "react-router";
import { ProtectedRoute } from "./protectRoute/ProtectedRoute";
import { Login } from "../pages/login";
import { Portfolio } from "../pages/portafolio/PortfolioPage";
import { RegistroPage } from "../pages/registro/RegistroPage";
import { EditarUsuarioPage } from "../pages/editarUsuario/EditarUsuarioPage";
import StatPage from "../pages/stat/StatPage";
import { AssetsComponent } from "../components/AssetsComponent";
import { MainLayout } from "../layouts/MainLayout";
import TransactionsComponent from "../components/TransactionsComponent";
import ManejoUsuariosPage from "../pages/manejoDeUsuarios/ManejoUsuariosPage";

function WallyRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                {/* Públicas */}
                <Route path="/registro" element={<RegistroPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<StatPage />} />

                {/* Privadas */}
                {/* element={<ProtectedRoute />} */}
                <Route >
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/editar" element={<EditarUsuarioPage />} />
                    <Route path="/panel" element={<AssetsComponent />} />
                    <Route path="/operaciones" element={<TransactionsComponent />} />

                </Route>
                {/* Admin */}
                <Route path="/manejoUsuarios" element={<ManejoUsuariosPage />}>
                    
                </Route>

    
            </Route>
        </Routes>
    );
}

export default WallyRoutes;

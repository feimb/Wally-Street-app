import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout"

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <MainLayout>
                <App />
            </MainLayout>
        </BrowserRouter>
    </StrictMode>,
);

import React from "react";
import { HeaderComponent } from "../components/HeaderComponent";
import { NavBarComponent } from "../components/NavBarComponent";
import { FooterComponent } from "../components/FooterComponent";
import { Outlet } from "react-router";
import axios from "axios";

export const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComponent />
            <NavBarComponent />
            <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-8">
                <Outlet />
            </main>
            <FooterComponent />
        </div>
    );
};

import React from "react";
import { HeaderComponent } from "../components/HeaderComponent";
import { NavBarComponent } from "../components/NavBarComponent";
import { FooterComponent } from "../components/FooterComponent";
import axios from "axios";

export const MainLayout = ({ children }) => {
    const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvIjo1LCJ0b2tlbl9leHBpcmVkX2F0IjoiMjAyNi0wNi0wMyAxOTo0NDoxOSJ9.CvykQs4L3h4_9_XWhHz1NgKocJ5m-Viblsk52twhh9U";
    const userId = window.atob(token.split(".")[1]);

    // const [nonbre,email, saldo] = axios
    return (
        <>
            <header className="grid py-4 px-12 bg-neutral grid-cols-6 sticky top-0">
                <HeaderComponent />
                <NavBarComponent />
            </header>
            {children}
            <footer className="w-full fixed bottom-0 py-2 px-6 bg-neutral">
                <FooterComponent />
            </footer>
        </>
    );
};

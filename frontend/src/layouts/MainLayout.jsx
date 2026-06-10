import React from "react";
import { HeaderComponent } from "../components/HeaderComponent";
import { NavBarComponent } from "../components/NavBarComponent";
import { FooterComponent } from "../components/FooterComponent";

export const MainLayout = ({ child }) => {
    return (
        <>
            <header className="grid py-4 px-12 bg-neutral grid-cols-6 sticky top-0">
                <HeaderComponent />

                <NavBarComponent />
            </header> 
            <footer className="w-full fixed bottom-0 py-2 px-6 bg-neutral">
              <FooterComponent />
            </footer>
        </>
    );
};

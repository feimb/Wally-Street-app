import React from "react";
import { HeaderComponent } from "../components/HeaderComponent";
import { NavBarComponent } from "../components/NavBarComponent";
import { FooterComponent } from "../components/FooterComponent";
import axios from "axios";
import { AssetsComponent } from "../components/AssetsComponent";

export const MainLayout = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <NavBarComponent />

      <AssetsComponent />

      {children}

      <FooterComponent />
    </>
  );
};
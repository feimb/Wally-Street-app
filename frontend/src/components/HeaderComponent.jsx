import React from "react";
import logo from "../assets/logo.png";

import { Link } from "react-router";

export const HeaderComponent = () => {
    return (
        <Link to="/home" 
        className="flex items-center gap-2 col-span-2"
        >
            <img src={logo} alt="" width={32} />
            <p className="text-lg font-bold text-primary-400">WallyStreet</p>
        </Link>
    );
};
    
import React from "react";
import logo from "../assets/logo.png";

import { Link, useNavigate } from "react-router";

export const HeaderComponent = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-neutral-900 border-b border-neutral-800 px-8 py-4">
            <div
                className="flex items-center gap-3 w-fit cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate("/")}
            >
                <img
                    src={logo}
                    alt="WallyStreet logo"
                    className="h-10 w-auto"
                />
                <h1 className="text-2xl font-bold text-primary">WallyStreet</h1>
            </div>
        </header>
    );
};

// import { useNavigate } from 'react-router-dom'

// export default function HeaderComponent() {
//   const navigate = useNavigate()

//   return (
//     <header className="bg-neutral-900 border-b border-neutral-800 px-8 py-4">
//       <div
//         className="flex items-center gap-3 w-fit cursor-pointer hover:opacity-80 transition-opacity"
//         onClick={() => navigate('/')}
//       >
//         <img src="/logo.png" alt="WallyStreet logo" className="h-10 w-auto" />
//         <h1 className="text-2xl font-bold text-primary">WallyStreet</h1>
//       </div>
//     </header>
//   )
// }

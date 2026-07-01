import React, { useState } from "react";
import { CircleUser } from "lucide-react";
import { Link } from "react-router";

export const Profile = ({ nombre, saldo }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className=" relative">
            <div
                className="flex gap-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="select-none">hola, {nombre}</p>
                <CircleUser />
            </div>
            {isOpen && (
                <div className="absolute bg-neutral p-4 border border-neutral-800 rounded-lg text-nowrap right-4 top-6 ">
                    <p className="border-b border-neutral-600 mb-1">
                        Saldo: {`$${saldo}`}
                    </p>
                    <ul>
                        <li className="cursor-pointer">
                            <Link to={"user"}>Editar Usuario</Link>
                        </li>

                        <li className="cursor-pointer">
                            <Link to={"home"}>Cerrar Sesion</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

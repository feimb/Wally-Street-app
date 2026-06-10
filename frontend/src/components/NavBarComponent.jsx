import React from "react";
import { Link } from "react-router";
import { useState } from "react";
import { Profile } from "./common/Profile";

export const NavBarComponent = () => {
    const [estaLoguiado, setEstaLoguiado] = useState(true);
    const buttonsSinLogin = ["Panel", "registro", "login"];
    const buttonsLogin = ["Panel", "Portfolio", "Operaciones"];
    return (
        <nav className="flex justify-between col-span-4 text-neutral-400 text-md font-bold">
            <ul className="flex gap-12">
                {estaLoguiado
                    ? buttonsLogin.map((item) => {
                          return (
                              <li className="">
                                  <Link to={item.toLowerCase()}>{item}</Link>
                              </li>
                          );
                      })
                    : buttonsSinLogin.map((item) => {
                          return (
                              <li className="">
                                  <Link to={item.toLowerCase()}>{item}</Link>
                              </li>
                          );
                      })}
            </ul>
            <Profile nombre="Fei" saldo="1000"/>
        </nav>
    );
};

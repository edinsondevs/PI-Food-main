import React from "react";
import Search from "../Search/Search";
import { NavLink } from "react-router-dom";
import "../../Styles/Nav.css";

function navigation() {
    return (
        <>
            <div className="navbar">
                <div className="container flex">
                    <h1 className="logo">
                        <NavLink to="/home">Home</NavLink>
                    </h1>
                    <nav>
                        <ul>
                        <li className="nav">
                            </li>
                                <NavLink to="/create"> Crear Receta </NavLink>
                            <li className="nav">
                                <NavLink to="/"> Exit </NavLink>
                            </li>
                            <li className="nav cmp-nav_search">
                                <input
                                    type="text"
                                    name="search"
                                    className="nav cmp-container-nav_search"
                                    placeholder="Ingresa ingrediente..."
                                />
                            </li>
                            <li className="nav">
                                <a href=" #" className="cmp-container-nav_btn button">
                                    Buscar Receta
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default navigation;

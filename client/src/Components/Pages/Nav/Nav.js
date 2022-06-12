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
                            <NavLink className="button" to="/create"> Crear Receta </NavLink>
                            <NavLink className="button" to="/ordering" > Ordena de Z - A </NavLink>
                            <NavLink className="button" to="/"> Exit </NavLink>
                            
                            <input
                                type="text"
                                name="search"
                                className="nav cmp-container-nav_search "
                                placeholder="Ingresa ingrediente..."
                            />
                            <NavLink to="/#" className="button"> Buscar Receta </NavLink>
                            
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default navigation;

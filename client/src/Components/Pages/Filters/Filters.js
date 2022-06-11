import React from "react";
import "../../Styles/Filter.css";
import { NavLink } from "react-router-dom";

function filters() {
  return (
    <>
      <div className="sidebar">
        <NavLink to="/">Filtrar por Recetas</NavLink>
        <NavLink to="/create"> Crear Receta </NavLink>
        
      </div>
    </>
  );
}

export default filters;

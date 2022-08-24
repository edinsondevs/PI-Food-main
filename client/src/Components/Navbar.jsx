import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { useDispatch } from "react-redux";
import { getRecipes } from "../Actions/index";

export const Navbar = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    return (
        <nav className="navbar bg-dark ">
            <div className="container-fluid ">
                <NavLink className="navbar-brand text-light" exact to="/home" >Home</NavLink>
                <NavLink className="navbar-brand text-light" to="/create" >Create Recipes</NavLink>
                <SearchBar />
            </div>
        </nav>
    );
}
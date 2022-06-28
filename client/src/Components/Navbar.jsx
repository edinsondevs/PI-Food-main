import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import './Styles/Navbar.css';
import { useDispatch } from "react-redux";
import { getRecipes } from "../Actions/index";

export const Navbar = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li><NavLink exact to="/home" >Home</NavLink></li>
                <li><NavLink to="/create" >Create Recipes</NavLink></li>
                <li><SearchBar /></li>
            </ul>
        </nav>
    );
}
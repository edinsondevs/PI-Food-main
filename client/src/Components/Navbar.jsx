import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import './Styles/Navbar.css';
import { useDispatch } from "react-redux";
import { getRecipes } from "../Actions/index";

export const Navbar = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/create" >Crear Recetas</Link>
                </li>
                <li>
                    <SearchBar />
                </li>
            </ul>
        </nav>
    );
}
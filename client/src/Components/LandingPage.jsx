import React from "react";
import { Link } from "react-router-dom";
import './Styles/LandingPage.css';

// export default function LandingPage() {
export const LandingPage = () => {
    return (
        <div className="LandingPage">
            <h1>Landing Page</h1>
            <Link to="/home">
                <button>Ingresar a la Pagina</button>
            </Link>
        </div>
    )
}
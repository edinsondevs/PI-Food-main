import React from "react";
import { Link } from "react-router-dom";
import './Styles/LandingPage.css';

// export default function LandingPage() {
export const LandingPage = () => {
    return (
        <div className="LandingPage">
            <p className="neon-text">Cocinar con amor <br/> te Alimenta el Alma</p>
            <Link to="/home">
                <button className="cmp-LandingPage">Ingresar a la Pagina</button>
            </Link>

        </div>
    )
}
import React from "react";
import { Link } from "react-router-dom";

// export default function LandingPage() {
export const LandingPage = () => {
    return (
        <div>
            <h1>Landing Page</h1>
            <Link to="/home">
                <button>Ingresar a la Pagina</button>
            </Link>
        </div>
    )
}
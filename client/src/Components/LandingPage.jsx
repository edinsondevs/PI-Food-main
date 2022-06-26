import React from "react";
import { Link } from "react-router-dom";
import './Styles/LandingPage.css';

// export default function LandingPage() {
export const LandingPage = () => {
    return (
        <div className="LandingPage">
            <p className="neon-text">&hearts; Cooking with Love <br/> Feeds your Soul &hearts; </p>
            <Link to="/home">
                <button className="cmp-LandingPage">View Recipes</button>
            </Link>

        </div>
    )
}
import React from "react"
import '../Components/Styles/Card.css'
import { Link } from "react-router-dom";

export const Card = ({ title, id, image, typeDiets, aggregateLikes }) => {
    // console.log(typeDiets);
    return (
        <main className="grid">
            <article>
                <img src={image} alt="not found" />
                <div className="cmp-text" >
                    <div>
                        <h3 className="cmp-title">{title}</h3>
                    </div>
                    <div>
                    <div>
                        <h4 className="cmp-text-title">Type of diets</h4>
                        <p className="cmp-text-ref">{(typeDiets).join(', ')}</p>
                    </div>
                        <h4 className="cmp-text-title">Likes:</h4>
                        <p className="cmp-text-num">{aggregateLikes}</p>
                    </div>
                </div>
                <Link to={`/recipes/${id}`} key={id} >
                    <button className="btn-link"> Detail  </button>
                </Link>
            </article>
        </main>
    )
}
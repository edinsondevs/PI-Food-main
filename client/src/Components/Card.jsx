import React from "react"
import '../Components/Styles/Card.css'
import { Link } from "react-router-dom";

export const Card = ({ title, id, image, typeDiets, aggregateLikes }) => {
    // console.log(typeDiets);
    return (
        <main className="grid">
            <article>
                <img src={image} alt="not found" />
                <div className="text" >
                    <div>
                        <h3>{title}</h3>
                    </div>
                    <div>
                        <p className="text-title">Likes:</p>
                        <p className="text-num">{aggregateLikes}</p>
                    </div>
                    <div className="text-title">Tipo de Dietas
                        <p className="text-ref">{(typeDiets).join(', ')}</p>
                    </div>
                </div>
                <Link to={`/recipes/${id}`} key={id} >
                    <button className="btn-link"> Detalle  </button>
                </Link>
            </article>
        </main>
    )
}
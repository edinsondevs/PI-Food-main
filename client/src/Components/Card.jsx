import React from "react"
import '../Components/Styles/Card.css'
import { Link } from "react-router-dom";

export const Card = ({ title, id, image, typeDiets, aggregateLikes }) => {
    console.log(typeDiets);
    return (
        <main className="grid">
            <article>
                <img src={image} alt="not found" />
                <div className="text" >
                    <h3>{title}</h3>
                    <p>Likes: {aggregateLikes}</p>
                    <div className="tooltip">Tipo de Dietas
                    
                    { typeDiets.length === 0 ? <p> N/A</p> :
                        <p className="tooltiptext">{(typeDiets).join(', ')}</p>
                    }
                    </div>
                </div>
                <Link to={`/recipes/${id}`} key={id} >
                    <button className="btn-link"> Detalle  </button>
                </Link>
            </article>
        </main>
    )
}
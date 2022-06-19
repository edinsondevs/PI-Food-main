import React from "react"
import '../Components/Styles/Card.css'

export const Card = ({title, id, image, typeDiets}) => {    
    return (
        <div className="container">
            <div key={id} className="cmp-card">
                <h3>{title}</h3>
                <img className="img-card" src={image} alt="not found" />
                <h4>Tipo de Dieta: </h4>
                <p>{typeDiets}</p>
            </div>
        </div>
    )
}
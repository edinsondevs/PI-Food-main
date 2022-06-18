import React from "react"
import '../Components/Styles/Card.css'

export const Card = ({title, id, image, typeDiets}) => {
// {console.log(typeDiets)}
    // {console.log(props.typeDiets)}
    return (
        <div className="container">
            <div key={id} className="cmp-card">
                <h3>{title}</h3>
                <img className="img-card" src={image} alt="not found" />
                {/* <p>{typeDiets}</p> */}
            </div>
        </div>
    )
}
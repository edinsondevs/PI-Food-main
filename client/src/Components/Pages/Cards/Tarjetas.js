import React from 'react'
import {  useSelector } from 'react-redux';
import "../../Styles/Cards.css"


function Cards() {
    // const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes);
    // console.log(recipes);
    
    let display;
    if (recipes) {
        display = recipes.map((result) => {
            let { id, name, title, image, glutenFree, vegan } = result;
            
    return (

                <div className="container_cards" key={id}>
                    <div className="card">
                        <img src={image} alt="" />
                        <div>
                            <div>{name}</div>
                            <div>
                                <div>Titulo: {title}</div>
                                <div>Tipo de Dieta: {glutenFree}</div>
                                <div>{vegan}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                        
            );
        });
    } else {
        <div>{display = "No Characters Found :/"}</div>
    }

    return <>{display}</>;


    // )
}

export default Cards
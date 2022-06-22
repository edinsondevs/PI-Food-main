import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Styles/DetailRecipe.css'
import { getRecipesById } from '../Actions'


const DetailRecipe = (props) => {
    console.log(props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipesById(props.match.params.id));
    }, [dispatch]);

    const details = useSelector((state) => state.details);
    // console.log(details);

    function createMarkup(xtext) {
        return { __html: xtext }
    }

    return (
        <main className="cmp-container-detail">
                                    
            {details ?
                <div>
                    <img className="cmp-detail-img" src={details.image} alt=" " />
                    <h1>{details.title}</h1>
                    {details.dishTypes ? (
                        <label ><b>Dish Types:&nbsp; </b>{(details.dishTypes).join(', ')}</label>
                    ) : null}
                    {details.typeDiets ? (
                        <label><b>Diets:&nbsp;</b>{(details.typeDiets).join(', ')}</label>
                    ) : null}
                    <h2>Resumen: </h2>
                    <p dangerouslySetInnerHTML={createMarkup(details.summary)} />
                    <h2>Likes: </h2>
                    <p> {details.aggregateLikes}</p>
                    <h2>Nivel Salud:  </h2>
                    <p>{details.healthScore}</p>
                    <h2>Paso a Paso: </h2>
                    <p dangerouslySetInnerHTML={createMarkup(details.instructions)} />
                    <div>
                        <Link to="/home">
                            <button>Volver</button>
                        </Link>
                    </div>
                </div>
                : <h1>No se encontron resultados</h1>
            }

        </main>
    )
}

export default DetailRecipe
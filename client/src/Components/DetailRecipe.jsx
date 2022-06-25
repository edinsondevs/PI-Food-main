import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Styles/DetailRecipe.css'
import { getRecipesById } from '../Actions'


const DetailRecipe = (props) => {
    const dispatch = useDispatch();
    // console.log(props);
    
    useEffect(() => {
        dispatch(getRecipesById(props.match.params.id));
    }, [dispatch]);
    
    const details = useSelector((state) => state.details);
    console.log(details);

    function createMarkup(xtext) {
        return { __html: xtext }
    }
    let diets = (details.typeDiets)
    console.log(diets)
    return (
        <main className="cmp-container-detail">

            {details ?
                <div className="card-container">
                    <div className="card u-clearfix">
                        <div className="card-body">
                            {/* <span className="card-number card-circle subtle">01</span>
                            <span className="card-author subtle">John Smith</span> */}
                            <h2 className="card-title">{details.title}</h2>
                            <div className="card-read">Summary</div>
                            <span className="card-description subtle" ><p dangerouslySetInnerHTML={createMarkup(details.summary)} /> </span>
                            <div className="card-read">Instruccions</div>
                            <span className="card-description subtle" ><p dangerouslySetInnerHTML={createMarkup(details.instructions)} /> </span>
                            <div className="card-read">Types Diets</div>
                            <span className="card-description subtle">{diets}</span>
                            <br />
                            <br />
                            <div className="card-read">Likes</div>
                            <span className="card-tag card-circle subtle">{details.aggregateLikes}</span>
                        </div>
                        <div>
                        <img src={details.image} alt="" className="card-media" />
                            </div>
                    </div>
                    <div className="card-shadow"></div>
                             <Link to="/home">
                                 <button>Volver</button>
                             </Link>
                </div>
                // <div className="cmp-container-detail">
                //     <img className="cmp-detail-img" src={details.image} alt=" " />
                
                //     <h1>{details.title}</h1>
                //     {details.dishTypes ? (
                //         <label ><b>Dish Types:&nbsp; </b>{(details.dishTypes).join(', ')}</label>
                //     ) : null}
                //     {details.typeDiets ? (
                //         <label><b>Diets:&nbsp;</b>{(details.typeDiets).join(', ')}</label>
                //     ) : null}
                //     <h2>Resumen: </h2>
                //     <p dangerouslySetInnerHTML={createMarkup(details.summary)} />
                //     <h2>Likes: </h2>
                //     <p> {details.aggregateLikes}</p>
                //     <h2>Nivel Salud:  </h2>
                //     <p>{details.healthScore}</p>
                //     <h2>Paso a Paso: </h2>
                //     <p dangerouslySetInnerHTML={createMarkup(details.instructions)} />
                //     <div>
                //     </div>
                // </div>
                : <h1>No se encontron resultados</h1>
            }

        </main>
    )
}

export default DetailRecipe
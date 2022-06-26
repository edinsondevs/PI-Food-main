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


            <div className="cmp-card-container">
                <div className="card u-clearfix">
                    <div className="cmp-card-body">
                        <h2 className="cmp-card-title">{details.title}</h2>
                        <div className="cmp-card-read">Summary</div>
                        <span className="cmp-card-description subtle" ><p dangerouslySetInnerHTML={createMarkup(details.summary)} /> </span>
                        <div className="cmp-card-read">Instruccions</div>
                        <span className="cmp-card-description subtle" ><p dangerouslySetInnerHTML={createMarkup(details.instructions)} /> </span>
                        <div className="cmp-card-read">Types Diets</div>
                        <span className="cmp-card-description subtle">{diets}</span>
                        <br />
                        <br />
                        <div className="cmp-card-read">Likes</div>
                        <span className="cmp-card-tag cmp-card-circle subtle">{details.aggregateLikes}</span>
                    </div>
                    <div>
                        <img src={details.image} alt="" className="cmp-card-media" />
                    </div>
                </div>
                <Link to="/home">
                    <button className="cmp-card-button">Volver</button>
                </Link>
                
            </div>



        </main>
    )
}

export default DetailRecipe
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


    return (
        <main className="cmp-container-detail">


            <div className="cmp-card-container">
                <div className="card u-clearfix">
                    <div className="cmp-card-body">
                        <h2 className="cmp-card-title">{details.title}</h2>
                        <div className="cmp-card-read">Summary</div>
                        <span className="cmp-card-description subtle" ><p dangerouslySetInnerHTML={createMarkup(details.summary)} /> </span>
                        <div className="cmp-card-read">
                            Types Diets
                            <p className="cmp-card-diets subtle">{diets + " "}</p>
                        </div>
                        <div className="cmp-card-read">
                            Types of dishes
                            <p className="cmp-card-diets subtle">{details.dishTypes}</p>
                        </div>
                        <div className="cmp-card-read">
                            Health Score
                            <p className="cmp-card-tag cmp-card-circle subtle">{details.healthScore}</p>
                        </div>
                        <div className="cmp-card-read">
                            Likes
                            <p className="cmp-card-tag cmp-card-circle subtle">{details.aggregateLikes}</p>
                        </div>
                    </div>
                    <div className="cmp-card-body">
                        <img src={details.image} alt="" className="cmp-card-media" />
                        <div className="cmp-card-read">Instruccions</div>
                        <span className="cmp-card-description subtle" ><p dangerouslySetInnerHTML={createMarkup(details.instructions)} /> </span>

                    </div>
                    <br />
                    <br />
                </div>
                <Link to="/home">
                    <button className="cmp-card-button">Back to</button>
                </Link>

            </div>



        </main>
    )
}

export default DetailRecipe
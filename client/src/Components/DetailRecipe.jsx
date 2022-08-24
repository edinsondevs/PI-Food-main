import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Styles/DetailRecipe.css'
import { getRecipesById } from '../Actions'

const DetailRecipe = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecipesById(props.match.params.id));
    }, [dispatch]);

    const details = useSelector((state) => state.details);
    function createMarkup(xtext) {
        return { __html: xtext }
    }
    let diets = (details.typeDiets)
    // console.log(diets)
    return (
        /*        // <main className="cmp-container-detail">
                //     <div className="cmp-card-container">
                //         <div className="card u-clearfix">
                //             <div className="cmp-card-body">
                 //                 <h2 className="cmp-card-title">{details.title}</h2>
                //                 <div className="cmp-card-read">Summary</div>
                //                 <span className="cmp-card-description subtle" ><p dangerouslySetInnerHTML={createMarkup(details.summary)} /> </span>
                //                 <div className="cmp-card-read">
                //                     Types Diets
                //                     <p className="cmp-card-diets subtle" >
                //                     { diets ? 
                //                         diets.map((el, index) => (
                //                         <ul key={index}>{el}</ul>
                //                         )) : null
                //                     }
                //                     </p>
                //                 </div> 
        //                 <div className="cmp-card-read">
        //                     Types of dishes
        //                     <p className="cmp-card-diets subtle">{details.dishTypes}</p>
        //                 </div>*/
        //                 <div className="cmp-card-read">
        //                     Health Score
        //                     <p className="cmp-card-tag cmp-card-circle subtle">{details.healthScore}</p>
        //                 </div>
        //                 <div className="cmp-card-read">
        //                     Likes
        //                     <p className="cmp-card-tag cmp-card-circle subtle">{details.aggregateLikes}</p>
        //                 </div>
        //             </div>
        //             <div className="cmp-card-body">
        //                 <img src={details.image} alt="" className="cmp-card-media" />
        //                 <div className="cmp-card-read">Instruccions</div>
        //                 <span className="cmp-card-description subtle" ><p dangerouslySetInnerHTML={createMarkup(details.instructions)} /> </span>
        //             </div>
        //             <br />
        //             <br />
        //         </div>
        //         <Link to="/home">
        //             <button className="cmp-card-button">Back to</button>
        //         </Link>
        //     </div>
        // </main>
        <div className="card mb-4" >
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={details.image} className="img-fluid rounded-start" alt="..." style={{ width: '100%', height: '70%' }} />
                </div>
                <div className="col-md-6">
                    <div className="card-body  ">
                        <h5 className="card-title ">{details.title}</h5>
                        <div className="cmp-card-read">Summary</div>
                        <p className="card-text" dangerouslySetInnerHTML={createMarkup(details.summary)} />
                        <div className="cmp-card-read">
                            Types Diets
                            <p className="cmp-card-diets subtle d-flex" >
                                {diets ?
                                    diets.map((el, index) => (
                                        <ul key={index}>{el}</ul>
                                    )) : null
                                }
                            </p>
                        </div>
                        <div className="cmp-card-read">
                            Types of dishes
                            <p className="cmp-card-diets subtle">{details.dishTypes}</p>
                        </div>
                        <div className="cmp-card-read">
                            Health Score
                            <p className="cmp-card-tag cmp-card-circle subtle">{details.healthScore}</p>
                        </div>
                        <Link to="/home">
                            <button className="btn btn-danger" >Back to</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailRecipe
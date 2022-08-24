import React from "react"
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteRecipesById, getRecipes } from "../Actions";


export const Card = ({ title, id, image, typeDiets, aggregateLikes }) => {
    // console.log(typeDiets);
    const dispatch = useDispatch();

    const Delete = (id) => {
        dispatch(deleteRecipesById(id))
        dispatch(getRecipes())
    }

    const verifId = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
    let isRecipe = false;
    if (verifId.test(id)) {
        isRecipe = true
    }
    return (
        <div className="col">
            <div className="card " style={{ height: "400px" }}>
                <img src={image} className="card-img-top" alt="..." />
                
                <div className="card-body" >
                    <div className="d-flex flex-column " style={{ height: "180px" }}>

                        <h4 className="card-title ">{title}</h4>
                        <h6 className="cmp-text-read">Type of diets</h6>
                        <p className="cmp-text-ref">{(typeDiets).join(', ')}</p>
                    </div>

                    <div className="d-flex justify-content-between ">
                        <h6 className="cmp-text-title">Likes:
                            <p className="cmp-text-num">{aggregateLikes}</p>
                        </h6>
                        <Link to={`/recipes/${id}`} key={id} >
                            <button className="btn btn-warning btn-sm"> Detail  </button>
                        </Link>
                    </div>
                </div>
                    {
                    isRecipe ?
                        <div className="cmp-div-delete">
                            <div >
                                <button onClick={() => Delete(id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </button>
                            </div>
                        </div> : null
                }
            </div>
        </div>

    )
}
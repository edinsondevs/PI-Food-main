import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchTypes } from "../../Actions";


const Card = () => {   
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    useEffect(() => {
        dispatch(searchTypes());
    }, []);

    return (
        <>
            
            <h1>Estoy en Card</h1>
        </>
    )
}

export default Card;
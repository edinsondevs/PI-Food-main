import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getNameRecipes } from "../Actions/index"
import './Styles/SearchBar.css'
import { Link } from 'react-router-dom';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputName(e) {
        e.preventDefault();
        setName(e.target.value);   
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameRecipes(name)); 
        setName('')   ;
        // console.log(name)    
    }
    return (
        <div className="cmp-searchbar">
            <input className="cmp-searchbar" type="text" placeholder="Ingrese ingrediente..." value={name}  onChange={handleInputName} />
            {/* {console.log(name)}; */}
            <button className="btn-searchbar" onClick={handleSubmit}>Buscar</button>
        </div>
    )
}
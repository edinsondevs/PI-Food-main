import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getNameRecipes } from "../Actions/index"

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
    }
    return (
        <div>
            <input type="text" placeholder="Buscar" value={name}  onChange={handleInputName} />
            {/* {console.log(name)}; */}
            <button type="submit" onClick={handleSubmit}>Buscar</button>
        </div>
    )
}
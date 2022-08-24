import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getNameRecipes } from "../../Actions/index"


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
        setName('');
    }
    return (
            <div className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" value={name}  onChange={handleInputName} aria-label="Search" />
                <button className="btn btn-outline-success" type="submit" onClick={handleSubmit}>Search</button>
            </div>
    )
}
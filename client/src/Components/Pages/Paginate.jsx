import React from "react"
import '../Styles/Pagginate.css'
import { Pagination } from '@nextui-org/react';


const Pagginate = ({ recipesPerPage, allRecipes, pagginate }) =>
{
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(allRecipes.length / recipesPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav id="cmp-pagginate">
            <ul className="pagginate">
                {pageNumber &&
                    pageNumber.map(number => (
                        <li key={number}>
                            <button className="btn-pagginate" onClick={() => pagginate(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>

    )
}

export default Pagginate
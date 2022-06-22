import React from "react"
import '../Components/Styles/Pagginate.css'

const Pagginate = ({recipesPerPage, allRecipes, pagginate}) => {
    const pageNumber=[]
    // console.log(allRecipes);
    for (let i = 1; i <= Math.ceil(allRecipes.length/recipesPerPage); i++) {
        pageNumber.push(i) 
    }
    
    return (
        <nav>
        <ul className="pagginate">
            { pageNumber &&             
            pageNumber.map(number => (
                    <li key={number}>                        
                        <button className="btn-pagginate"  onClick={()=>pagginate(number)}>{number}</button>
                    </li>                
            ))
            }
        </ul>
    </nav>
    )
}

export default Pagginate
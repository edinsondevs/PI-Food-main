import React, { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getNewRecipe } from "../Actions";
import '../Components/Styles/RecipeCreate.css'


export const RecipeCreate = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);


    const [input, setInput] = useState({
        title: '',
        summary: '',
        aggregateLikes: '',
        healthScore: '',
        instructions: '',
        image: '',
        typeDiets: []
    })

    // useEffect(() => {
    //     dispatch(getNewRecipe());
    // })
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    function validateName(value) {
        if (/[^A-Za-z]/.test(value)) {
            setError('El nombre no debe poseer numeros ni caracteres especiales');
        } else {
            setError('');
        }
        setName(value);
    }

    return (
        <div>
            <Link to="/home">Volver</Link>
            <h1>Crear una Receta</h1>
            {/* <div className="cmp-form-container"> */}
            <form className="cmp-form" action="">
                <label for="title">Titulo</label>
                <input type="text" id="title" name="title" onChange={(e) => validateName(e.target.value)} placeholder="Ingrese nombre de la receta" />
                {!error ? null :
                    <span>{error}</span>
                }
                {/* <div> */}
                <label for="summary">Resumen</label>
                <textarea name="summary" id="" cols="30" rows="10"></textarea>
                {/* </div> */}
                <label for="instructions">Instrucciones</label>
                <textarea name="instructions" id="" cols="30" rows="10"></textarea>
                <label for="aggregateLikes">Puntuacion del plato</label>
                <input type="number" name="aggregateLikes" placeholder="Puntuacion máx 9" />
                
                <label for="healthScore">Puntuacion de la salud</label>
                <input type="number" name="healthScore" />
                
                <label for="typeRecipe">Tipo de Dieta</label>
                <select name="typeRecipe" id="typeRecipe">
                    <option value="vegan">Vegana</option>
                    <option value="vegetarian">Vegetariana</option>
                    <option value="glutenFree">Sin gluten</option>
                </select >

                <label for="image">Imagen</label>
                <input type="text" name="image" placeholder="Ingrese url de la imagen..."/>
                <button type="submit">Crear</button>               
            </form>
            {/* </div> */}
        </div>
    )
}

/*******************************
 * Puntuación
Nivel de "comida saludable"
Paso a paso
[ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
[ ] Botón/Opción para crear una nueva receta
*******************************/
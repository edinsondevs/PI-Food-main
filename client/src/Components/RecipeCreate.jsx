import React, { useEffect, useState } from "react"
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

            <form action="">
                <div>
                    <label>Titulo</label>
                    <input type="text" name="title" onChange={(e) => validateName(e.target.value)}/>
                    {!error ? null : <span>{error}</span>}
                </div>
                <div>
                    <label>Resumen del plato</label>
                    <textarea name="summary" id="" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <label htmlFor="">Puntuacion del plato</label>
                    <input type="number" name="aggregateLikes" />
                </div>
                <div>
                    <label htmlFor="">Puntuacion de la salud</label>
                    <input type="number" name="healthScore" />
                </div>
                <div>
                    <label htmlFor="">Instrucciones</label>
                    <textarea name="instructions" id="" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <label>Seleccione el tipo de Dieta</label>
                    <select name="typeRecipe" id="">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type="text" name="image" />
                </div>
                <button type="submit">Crear</button>
            </form>
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
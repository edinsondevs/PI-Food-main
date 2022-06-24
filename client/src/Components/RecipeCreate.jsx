import React, { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getNewRecipe, getTypeRecipes } from "../Actions";
import '../Components/Styles/RecipeCreate.css'


export const RecipeCreate = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    const typeDiets = useSelector(state => state.typeDiets);

    console.log(typeDiets)

    const [input, setInput] = useState({
        title: '',
        summary: '',
        aggregateLikes: '',
        healthScore: '',
        instructions: '',
        image: '',
        typeDiets: []
    })

    useEffect(() => {
        dispatch(getTypeRecipes())
    }, [dispatch])

    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [likes, setLikes] = useState('');
    const [range, setRange] = useState('');


    function validateName(value) {
        if (/[^A-Za-z]/.test(value)) {
            setError('El nombre no debe poseer numeros ni caracteres especiales');
        }
        setName(value);
    }

    function validateLikes(value) {
        if (/[1-9]/.test(value)) {
            setError('El numero debe ser entre 1-9');
        } else {
            setError('');
        }
        setLikes(value);
    }

    function validateRange(value) {
        if (/[^A-Za-z]/.test(value)) {
            setError('El nombre no debe poseer numeros ni caracteres especiales');
        } else {
            setError('');
        }
        setRange(value);
    }
    // console.log(typeDiets.map(e=>e.title))

    return (
        <div>
            <Link to="/home">Volver</Link>
            <h1>Crear una Receta</h1>
            {/* <div className="cmp-form-container"> */}
            <form className="cmp-form" action="">
                <label htmlFor="title">Titulo</label>
                <input type="text" id="title" value={input.title} name="title" onChange={(e) => validateName(e.target.value)} placeholder="Ingrese nombre de la receta" />
                {!error ? null :
                    <span>{error}</span>
                }
                <label htmlFor="summary">Resumen</label>

                {/* <input type="text" name="summary" id="summary" value={input.summary}/> */}

                <label htmlFor="instructions">Instrucciones</label>
                <textarea name="instructions" id="instructions" cols="30" rows="10"></textarea>

                <label htmlFor="aggregateLikes">Puntuacion del plato</label>
                <input type="range" id="aggregateLikes" name="aggregateLikes" placeholder="Puntuacion máx 9" onChange={(e) => validateLikes(e.target.value)} />

                <label htmlFor="healthScore">Puntuacion de la salud</label>
                <input class="slider" type="range" id="healthScore" min={0} max={10} name="healthScore" onChange={(e) => validateRange(e.target.value)} />


                <label htmlFor="typeRecipe">Tipo de Dieta</label>
                <select name="typeRecipe" id="typeRecipe">
                    {/* <p>{typeDiets.title}</p> */}
                    {typeDiets.map((e) => {
                        return <option value={e.id} key={e.id} >{e.title}</option>
                    })}
                </select >

                <label htmlFor="image">Imagen</label>
                <input type="text" name="image" id="image" placeholder="Ingrese url de la imagen..." />
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
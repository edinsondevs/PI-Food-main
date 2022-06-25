import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewRecipe, postNewRecipe } from "../Actions";
import "../Components/Styles/RecipeCreate.css";

export const RecipeCreate = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    aggregateLikes: "",
    healthScore: "",
    instructions: "",
    image: "",
    typeDiets: [],
  });

  // useEffect(() => {
  //     dispatch(getNewRecipe());
  // })

  const handleSubmit = () => {
    dispatch(postNewRecipe(input));
    setInput({
      title: "",
      summary: "",
      aggregateLikes: "",
      healthScore: "",
      instructions: "",
      image: "",
      typeDiets: [],
    });
  };

  const handleChange = (e) => {

    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    //  console.log(input)
}

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [errorName, setErrorName] = useState(" ");
  const [errorLikes, setErrorLikes] = useState(" ");
  const [errorRange, setErrorRange] = useState(" ");
  const [range, setRange] = useState(" ");
  //   const [error, setError] = useState('');

  function validateName(value) {
    if (/[^A-Za-z]/.test(value)) {
      setError("El nombre no debe poseer numeros ni caracteres especiales");
    } else {
      setError("");
    }
    setName(value);
  }

  function validateLikes(value) {
    if (/[1-9]/.test(value)) {
      setErrorLikes("El numero debe ser entre 1-9");
    } else {
      setErrorLikes("");
    }
    setName(value);
  }

  return (
    <div className="cmp-container">
      <h1 className="cmp-form_title">Crear una Receta</h1>
      {/* <div className="cmp-form-container"> */}
      <form className="cmp-form" action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          id="title"
          name="title"
          value={input.value}
          // onChange={(e) => validateName(e.target.value)}
          onChange={handleChange}
          placeholder="Ingrese nombre de la receta"
        />
        {!error ? null : <span>{error}</span>}
        {/* <div> */}
        <label htmlFor="summary">Resumen</label>
        <input type="text" name="summary" id="" value={input.summary} onChange={handleChange}></input>
        {/* </div> */}
        <label htmlFor="instructions">Instrucciones</label>
        <input type="text" name="instructions" id="" value={input.instructions} onChange={handleChange}></input>
        <label htmlFor="aggregateLikes">Puntuacion del plato</label>
        <input
          type="number"
          name="aggregateLikes"
          placeholder="Puntuacion máx 9"
          // onChange={(e) => validateLikes(e.target.value)}
          value={input.aggregateLikes} 
          onChange={handleChange}
        />
        {/* {!setErrorLikes ? null : <span>{setErrorLikes}</span>} */}

        <label htmlFor="healthScore">Puntuacion de la salud</label>
        <input type="number" name="healthScore" value={input.healthScore} onChange={handleChange}/>

        <label htmlFor="typeRecipe">Tipo de Dieta</label>
        <select name="typeRecipe" id="typeRecipe">
          <option value="vegan">Vegana</option>
          <option value="lacto ovo vegetarian">Vegetariano</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="lacto ovo vegetarian">Lacto-Vegetarian</option>
          <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
          <option value="pescatarian">Pescetarian</option>
          <option value="paleolithic">Paleo</option>
          <option value="primal">Primal</option>
          <option value="fodmap friendly">Low FODMAP</option>
          <option value="whole 30">Whole30</option>
          <option value="dairy free">Dairy Free</option>
        </select>

        <label htmlFor="image">Imagen</label>
        <input
          type="text"
          name="image"
          value={input.image}
          onChange={handleChange}
          placeholder="Ingrese url de la imagen..."
        />
        <button type="submit">Crear</button>
        <button>
          <Link to="/home">Volver</Link>
        </button>
      </form>
      {/* </div> */}
    </div>
  );
};

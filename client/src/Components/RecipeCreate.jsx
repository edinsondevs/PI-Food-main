import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewRecipe, getTypeRecipes, postNewRecipe } from "../Actions";
import "../Components/Styles/RecipeCreate.css";

export const RecipeCreate = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allTypes = useSelector((state) => state.typeDiets)
  // console.log(allTypes)

  const [input, setInput] = useState({
    title: "",
    summary: "",
    aggregateLikes: "",
    healthScore: "",
    instructions: "",
    image: "",
    typeDiets: [],
  });

  useEffect(() => {
    dispatch(getTypeRecipes());
  }, [dispatch])

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

  const handleSelect = (e) => {

    if (input.typeDiets.includes(e.target.value)) {
      return 'Diet Type exists'
    } else {
      setInput({
        ...input,
        typeDiets: [...input.typeDiets, e.target.value]
      })
    }
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
      <h1 className="cmp-form_title">Create a Recipe</h1>
      {/* <div className="cmp-form-container"> */}
      <form className="cmp-form" action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input className="cmp-form_input"
          type="text"
          id="title"
          name="title"
          value={input.value}
          // onChange={(e) => validateName(e.target.value)}
          onChange={handleChange}
          placeholder="Enter recipe name"
        />
        {!error ? null : <span>{error}</span>}
        {/* <div> */}
        <label htmlFor="summary">Summary</label>
        <input className="cmp-form_input" type="text" name="summary" id="" value={input.summary} onChange={handleChange}></input>
        {/* </div> */}
        <label htmlFor="instructions">Instructions</label>
        <input className="cmp-form_input" type="text" name="instructions" id="" value={input.instructions} onChange={handleChange}></input>
        <label htmlFor="aggregateLikes">Dish score</label>
        <input className="cmp-form_input"
          type="number"
          name="aggregateLikes"
          placeholder="Max. score 9"
          // onChange={(e) => validateLikes(e.target.value)}
          value={input.aggregateLikes}
          onChange={handleChange}
        />
        {/* {!setErrorLikes ? null : <span>{setErrorLikes}</span>} */}

        <label htmlFor="healthScore">Health score</label>
        <input className="cmp-form_input" type="number" placeholder="Max. score 9" name="healthScore" value={input.healthScore} onChange={handleChange} />

        <label htmlFor="typeDiets">Type of Diet</label>

        <select name="typeDiets" id="typeDiets" multiple onChange={handleSelect}>
          <option value={input.typeDiets} name="typeDiets"></option>
          {allTypes?.map((e, i) => {

            return <option value={e} key={i} >{e}</option>
          })
          }
        </select>

        <label htmlFor="image">Image</label>
        <input className="cmp-form_input"
          type="text"
          name="image"
          value={input.image}
          onChange={handleChange}
          placeholder="URL Img..."
        />
        <button type="submit">Create</button>
        <button>
          <Link to="/home">Back to</Link>
        </button>
      </form>
    </div>
  );
};

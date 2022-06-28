import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypeRecipes, postNewRecipe } from "../Actions";
import "../Components/Styles/RecipeCreate.css";

export const RecipeCreate = () => {
  const dispatch = useDispatch();
  // const allRecipes = useSelector((state) => state.recipes);
  const allTypes = useSelector((state) => state.typeDiets);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    aggregateLikes: "",
    healthScore: "",
    instructions: "",
    image: "",
    typeDiets: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTypeRecipes());
  }, [dispatch]);


  //****************      SUBMIT     *****/
  const handleSubmit = (e) => {
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


  //****************      ACTUALIZACION DE ESTADOS     *****/

  const handleSelect = (e) => {
    if (input.typeDiets.includes(e.target.value)) {
      return "Diet Type exists";
    } else {
      setInput({
        ...input,
        typeDiets: [...input.typeDiets, e.target.value],
      });
    }
  };

  //****************      VALIDACION     *****/
  function validateForm(input) {
    let err = {}
    if (/[^ A-Za-z]/.test(input.title)) {  // NO PERMITE NUMEROS NI CARACTERES ESPECIALES      
      err = { title: "Special characters are not allowed" }
    } else if (input.title.length <= 5) {
      err = { title: "You must enter at least 5 characters" }
    }
    else if (input.summary.length <= 20) {
      err = { summary: "You must enter at least 20 characters" }
    }
    else if (input.aggregateLikes.length > 2) {
      err = { aggregateLikes: "Max Score 99" }
    }
    else if (input.healthScore.length > 2) {
      err = { healthScore: "Max Score 99" }
    }


    else {
      err = {
        title: "",
        summary: "",
        aggregateLikes: "",
        image: ""
      }
    }
    return err
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validateForm({
      ...input,
      [e.target.name]: e.target.value,
    }))
  };

  //****************      RENDERIZACION DEL COMPONENTE     *****/
  return (
    <div className="cmp-container">
      <h1 className="cmp-form_title">Create a Recipe</h1>
      <form className="cmp-form" action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input
          className="cmp-form_input"
          type="text"
          id="title"
          name="title"
          value={input.title}
          onChange={handleChange}
          placeholder="Enter recipe name"
        />
        {!errors.title ? null : <span className="cmp-form-valid_title">{errors.title}</span>}
        <label htmlFor="summary">Summary</label>
        <input
          className="cmp-form_input"
          type="text"
          name="summary"
          id=""
          value={input.summary}
          onChange={handleChange}
        />
        {!errors.summary ? null : <span className="cmp-form-valid_summary">{errors.summary}</span>}
        {/* </div> */}
        <label htmlFor="instructions">Instructions</label>
        <input
          className="cmp-form_input"
          type="text"
          name="instructions"
          id=""
          value={input.instructions}
          onChange={handleChange}
        ></input>

        <label htmlFor="aggregateLikes">Dish score</label>
        <input
          className="cmp-form_input"
          type="number"
          name="aggregateLikes"
          placeholder="Max. score 99"
          min={1}
          max={99}
          value={input.aggregateLikes}
          onChange={handleChange}
        /> {!errors.aggregateLikes ? null : <span className="cmp-form-valid_likes">{errors.aggregateLikes}</span>}

        <label htmlFor="healthScore">Health score</label>
        <input
          className="cmp-form_input"
          type="number"
          placeholder="Max. score 99"
          name="healthScore"
          min={1}
          max={99}
          value={input.healthScore}
          onChange={handleChange}
        />
        {!errors.healthScore ? null : <span className="cmp-form-valid_score">{errors.healthScore}</span>}
        <label htmlFor="typeDiets">Type of Diet</label>

        <select
          name="typeDiets"
          id="typeDiets"
          multiple
          onChange={handleSelect}
        >
          <option value={input.typeDiets} name="typeDiets"></option>
          {allTypes?.map((e, i) => {
            return (
              <option value={e} key={i}>
                {e}
              </option>
            );
          })}
        </select>

        <label htmlFor="image">Image</label>
        <input
          className="cmp-form_input"
          type="text"
          name="image"
          value={input.image}
          onChange={handleChange}
          placeholder="URL Img..."
        />

        <button type="submit" >Create</button>
        <button>
          <Link to="/home">Back to</Link>
        </button>
      </form>
    </div>
  );
};

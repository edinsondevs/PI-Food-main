import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypeRecipes, postNewRecipe } from "../../Actions";
import "../../Components/Styles/Create.css";

export const RecipeCreate = () => {
  const dispatch = useDispatch();
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


  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };



  //****************      RENDERIZACION DEL COMPONENTE     *****/
  return (
    <div className="container-md ">
      <div className="row ">
        <form className="row gx-3 gy-2 bg-dark bg-opacity-75 needs-validation text-white p-4 mt-5 " action="" onSubmit={(e) => handleSubmit(e)}>
          <p className="fs-3"> Create a Recipe
          </p>
          {/* ***************  FILA  **************************** */}
          <div className="row mb-3">
            <div className="col-sm-6 ">
              <label
                htmlFor="title"
                className="form-label">Title</label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                value={input.title}
                onChange={handleChange}
                placeholder="Enter recipe name"
                required
              />
              <div className="valid-feedback">
                ¡Se ve bien!
              </div>
            </div>
            <div className="col-md-6">
              <label
                htmlFor="summary"
                className="form-label">Summary</label>
              <input
                className="form-control"
                type="text"
                name="summary"
                id="summary"
                value={input.summary}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* ***************  FILA  **************************** */}
          <div className="row mb-3">
            <div className="form-floating-input-padding-t">
              <label htmlFor="exampleFormControlTextarea1">Instructions</label>
              <textarea
                className="form-control"
                placeholder="Type the instructions here"
                id="exampleFormControlTextarea1"
                style={{ height: "100px" }}
                name="instructions"
                value={input.instructions}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ***************  FILA  **************************** */}
          <div className="row mb-3">
            <div className="col-sm  ">
              <label htmlFor="customRange2" className="form-label">Dish score</label>
              <input
                type="range"
                className="form-range"
                min={0}
                max={5}
                id="customRange2"
                name="aggregateLikes"
                value={input.aggregateLikes}
                onChange={handleChange}
              />
              <label htmlFor="healthScore" className="form-label">Health score</label>
              <input
                type="range"
                className="form-range"
                min={0}
                max={5}
                id="customRange3"
                name="healthScore"
                value={input.healthScore}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="typeDiets">Type of Diet</label>
              <select
                className="form-select"
                size="4"
                aria-label="Ejemplo de multiple select"
                name="typeDiets"
                id="typeDiets"
                multiple
                onChange={handleSelect}
              >
                {allTypes?.map((e, i) => {
                  return (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          {/* ***************  FILA  **************************** */}
          <div className="col-md-12">
            <label htmlFor="basic-url" className="form-label">Your Image</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon3">https://static-sevilla.abc.es/</span>
              <input
                value={input.image}
                type="text"
                name="image"
                className="form-control"
                id="basic-url"
                onChange={handleChange}
                aria-describedby="basic-addon3"
              />
            </div>

          </div>
          <div className="col-sm-12 d-flex justify-content-center ">
            <div className="col-sm-4">
              <button className="btn btn-success " type="submit">Create</button>
            </div>
            <div className="col-sm-4">
              <Link to="/home">
                <button className="btn btn-danger" >Back to</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

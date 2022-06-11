import { Routes, Route, BrowserRouter } from "react-router-dom";
import LeadingPage from "./Components/Pages/LeadingPage/LeadingPage";
import Home from "./Components/Pages/Home/Home";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRecipes } from "../src/Components/Actions/index";
import './App.css';



function App() {

  const dispatch = useDispatch();
  // const recipes = useSelector((state) => state);

  useEffect(() => {
    //fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=f55675efd94440d29172e34f9afb5760&number=2')
    fetch("http://localhost:3001/types")
      .then((response) => response.json())
      .then((data) => dispatch(addRecipes(data)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div >
      <BrowserRouter>
        {/* ACA VA EL COMPONENTE QUE SE RENDERIZA EN TODA LA PAGINA */}
        <Routes>
          <Route path="/" element={<LeadingPage />} exact />

          <Route path="/*" element={<Home />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

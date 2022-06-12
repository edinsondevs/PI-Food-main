import Nav from "../Nav/Nav";
import "../../Styles/Home.css";
import Cards from "../Cards/Cards.jsx";  //OJO con este componente que no es el ultimo
import Create from "../Create/Create";
import Ordering from "../Filters/Ordering.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
// import { useState } from "react";
import Card  from '../Card/Card.jsx'; //

const Home = () => {
  const datos_Api = useSelector((state) => state.recipes);
  const ordering = datos_Api

  /*************** Constante para el paginador  ********************************/
  const numberPage = 9; //Cantidad de recetas que se muestran por pagina
/*************** ****************************** ********************************/

  return (
    <>
      <nav>
        <Nav />
      </nav>
      <section >
        <article className="home-section">
          <Routes>
            <Route path="/home" element={<Cards datosApi={datos_Api} numberPage={numberPage} />} exact /> 
            <Route path="/ordering" element={<Ordering ordering={ordering} numberPage={numberPage} />} exact />
            <Route path="/create" element={<Create />} exact />
          </Routes>
        </article>
      </section>
    </>
  );
};

export default Home;

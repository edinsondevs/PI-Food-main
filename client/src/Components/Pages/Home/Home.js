import Nav from "../Nav/Nav";
import "../../Styles/Home.css";
import Cards from "../Cards/Cards.jsx";  //OJO con este componente que no es el ultimo
import Create from "../Create/Create";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const datos_Api = useSelector((state) => state.recipes);
  

  /*************** FUNCIONES PARA EL PAGINADO ********************************/
  const numberPage = 9;
  // const [datosApi, setDatosApi] = useState(datos_Api);
  
  // const [itemsApi, setItemsApi] = useState([...datos_Api].splice(0, ITEM_PER_PAGE));
  //  const [currentPage, setCurrentPage] = useState(0);
  // console.log(datosApi);
  
  // const next_Page = () => {
  //   const totalRecipes = datosApi.length;
  //   const next_Page = currentPage + 1;
  //   const firstIndex = next_Page * ITEM_PER_PAGE;

  //   if (firstIndex >= totalRecipes) return
    
  //   setItemsApi ([...datosApi].splice(firstIndex, ITEM_PER_PAGE));
  //   setCurrentPage(next_Page);

  //   console.log("firstIndex: "+ firstIndex);
  //   console.log("totalRecipes: "+ totalRecipes);
  //   console.log("next_Page ");
  // }
  // const previousPage = () => {
  //   const previousPage = currentPage - 1;
  //   if (previousPage < 0) return;
  //   const firstIndex = previousPage * ITEM_PER_PAGE;

  //   setItemsApi ([...datosApi].splice(firstIndex, ITEM_PER_PAGE));
  //   setCurrentPage(previousPage);

    // console.log("previousPage ");
  // }
/*************** ****************************** ********************************/

  return (
    <div className="home">
      <nav>
        <Nav />
      </nav>
      <section >
        <article className="home-section">
          <Routes>
            {/* <Route path="/home" element={<Cards ITEM_PER_PAGE={ITEM_PER_PAGE} items={itemsApi} currentPage={currentPage} nextPage={next_Page} previousPage={previousPage}/>} exact /> */}
            <Route path="/home" element={<Cards datosApi={datos_Api} numberPage={numberPage} />} exact /> 
            <Route path="/create" element={<Create />} exact />
          </Routes>
        </article>
      </section>
    </div>
  );
};

export default Home;

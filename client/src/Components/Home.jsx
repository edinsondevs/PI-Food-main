import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getTypeRecipes, orderByName, getNameRecipes } from '../Actions/index';
import { Link } from 'react-router-dom';
import { Card } from '../Components/Card';
import Pagginate from '../Components/Paginado.jsx';
import { SearchBar } from '../Components/SearchBar'
import { RecipeCreate } from '../Components/RecipeCreate.jsx';
import { Loading } from '../Components/Loading.jsx';
import '../Components/Styles/Home.css';


export const Home = () => {

    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipes = currentPage * recipesPerPage;
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes);



    const pagginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
        // console.log(e.target.id);
    }

    function handleFilter(e) {
        e.preventDefault();
        dispatch(getTypeRecipes(e.target.value));
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
console.log(allRecipes);
    return (
        <>
            <div>
                {/* <Link to="/recipes">Ver recetas</Link> */}
                {/* <h1>Pagina de Recetas</h1> */}
                <Link to="/create" >Crear Recetas</Link>
                <button onClick={(e) => handleClick(e)}>
                    Volver a Cargar todas las Recetas
                </button>
                <div>
                    <SearchBar />
                </div>
                <div className="cmp-home-container">
                    <div>
                    <h3>Ordena por Alfabeto: </h3>
                    <select onChange={(e) => handleSort(e)}>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    </div>
                    <div>
                        <h3>Tipo de Dieta: </h3>
                    <select onChange={(e) => handleFilter(e)}>
                        <option value="vegan">Vegana</option>
                        <option value="vegetarian">Vegetariano</option>
                        <option value="glute free">Gluten Free</option>
                        <option value="vetogenic">Ketogenic</option>
                        <option value="lacto">Lacto-Vegetarian</option>
                        <option value="ovo">Ovo-Vegetarian</option>
                        <option value="pescetarian">Pescetarian</option>
                        <option value="paleo">Paleo</option>
                        <option value="primal">Primal</option>
                        <option value="low">Low FODMAP</option>
                        <option value="whole30">Whole30</option>
                    </select>
                    </div>
                    <div>
                    <h3>Ordena por Puntuacion: </h3>
                    <select onChange={(e) => handleSort(e)}>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    </div>
                </div>
              
            </div>
            <div >
                <Pagginate recipesPerPage={recipesPerPage} allRecipes={allRecipes} pagginate={pagginate} />
                {currentRecipes.length === 0 &&
                    <Loading />
                }
                <div className="cmp-cards">
                    {currentRecipes &&
                        currentRecipes.map((e) => {
                            return (
                                <Link to={`/recipes/${e.id}`} key={e.id}>
                                    <Card key={e.id} title={e.title} image={e.image} typeDiets={e.typeDiets} />
                                </Link>
                            )                            
                        })
                    }
                </div>
            </div>
        </>
    );

}
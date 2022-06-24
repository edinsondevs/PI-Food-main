import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getTypeRecipes, orderByName, getNameRecipes, orderByLikes } from '../Actions/index';
import { Link } from 'react-router-dom';
import { Card } from '../Components/Card';
import Pagginate from './Paginate.jsx';
import { SearchBar } from '../Components/SearchBar'
import { RecipeCreate } from '../Components/RecipeCreate.jsx';
import { Loading } from '../Components/Loading.jsx';
import '../Components/Styles/Home.css';


export const Home = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    const [orden, setOrden] = useState('')
    const [recipesOrderLikes, setRecipesOrderLikes] = useState('')
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

    function handleLikes(e) {
        e.preventDefault();
        dispatch(orderByLikes(e.target.value));
        setCurrentPage(1)
        setRecipesOrderLikes(`Ordenado ${e.target.value}`)
    }

    return (
        <>
            <div>
                {/* <Link to="/recipes">Ver recetas</Link> */}
                {/* <h1>Pagina de Recetas</h1> */}
                {/* <Link to="/create" >Crear Recetas</Link> */}
                {/* <div>
                    <SearchBar />
                </div> */}
                <div className="cmp-home-filter-container">
                <div>
                <button onClick={(e) => handleClick(e)}>
                    Cargar todas las Recetas
                </button>
                </div>
                    <div>
                        <h3>Ordena por Alfabeto: </h3>
                        <select onChange={(e) => handleSort(e)}>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>
                    <div>
                        <h3>Tipo de Dieta: </h3>
                        <select onChange={(e) => handleFilter(e)}>
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
                    </div> 
                    <div>
                        <h3>Ordena por Puntuacion: </h3>
                        <select onChange={(e) => handleLikes(e)}>
                            <option value="asc">Min-Max</option>
                            <option value="desc">Max-Min</option>
                        </select>
                    </div>
                </div>

            </div>
            <div >
                <Pagginate recipesPerPage={recipesPerPage} allRecipes={allRecipes} pagginate={pagginate} />
                {currentRecipes.length === 0 &&
                    <Loading />
                }
                <div className="cmp-home-card-container">                    
                    {currentRecipes && 
                        currentRecipes.map((e) => {
                            return (
                                // <Link to={`/recipes/${e.id}`} key={e.id}>
                                    <Card id={e.id} key={e.id} title={e.title} image={e.image} typeDiets={e.typeDiets} aggregateLikes={e.aggregateLikes} />
                                // </Link>
                            )
                        }) 
                    } 
                </div>
            </div>
        </>
    );

}
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getRecipes,
    getTypeRecipes,
    orderByName,
    getNameRecipes,
    orderByLikes,
} from "../Actions/index";
import { Card } from "../Components/Card";
import Pagginate from "./Paginate.jsx";
import { Loading } from "../Components/Loading.jsx";
import "../Components/Styles/Home.css";

export const Home = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [orden, setOrden] = useState("");
    const [recipesOrderLikes, setRecipesOrderLikes] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipes = currentPage * recipesPerPage;
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
    const currentRecipes = allRecipes.slice(
        indexOfFirstRecipes,
        indexOfLastRecipes
    );

    const [inputDietas, setInputDietas] = useState("all");

    const [refresh, setRefresh] = useState(true);

    const show = () => {
        // setRefresh(!refresh)
        if (inputDietas === "all") {
            return allRecipes;
        } else {
            return allRecipes.filter((e) => e.typeDiets.includes(inputDietas));
        }
    };

    const pagginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function handleSort(e) {
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleLikes(e) {
        dispatch(orderByLikes(e.target.value));
        setCurrentPage(1);
        setRecipesOrderLikes(`Ordenado ${e.target.value}`);
    }

    return (
        <>
            <div className="cmp-container-home">
                <div className="cmp-home-filter-container">
                    <div>
                        <h3>Ordena por Alfabeto: </h3>
                        <select onChange={(e) => handleSort(e)}>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>
                    <div>
                        <h3>Tipo de Dieta: </h3>
                        <select onChange={(e) => setInputDietas(e.target.value)}>
                            <option value="all">Todas</option>
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
            <div>
                <Pagginate
                    recipesPerPage={recipesPerPage}
                    allRecipes={show()}
                    pagginate={pagginate}
                />
                {currentRecipes.length === 0 && <Loading />}
                <div className="cmp-home-card-container">
                    {currentRecipes &&
                        show()
                            .slice(indexOfFirstRecipes, indexOfLastRecipes)
                            .map((e) => {
                                return (
                                    <Card
                                        id={e.id}
                                        key={e.id}
                                        title={e.title}
                                        image={e.image}
                                        typeDiets={e.typeDiets}
                                        aggregateLikes={e.aggregateLikes}
                                    />
                                );
                            })}
                </div>
            </div>
        </>
    );
};

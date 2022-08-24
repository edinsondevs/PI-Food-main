import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Home } from "./Components/Pages/Home";
import { RecipeCreate } from "./Components/Pages/RecipeCreate.jsx";
import { Navbar } from './Components/Pages/Navbar';
import './App.css';
import { Card } from './Components/Pages/Card';
import DetailRecipe from './Components/Pages/DetailRecipe';


function Init() {
    return (
        <BrowserRouter>
            <div >
                <Navbar />
                <Switch >
                    <Route path="/home" component={Home} />
                    <Route path="/create" component={RecipeCreate} />
                    <Route exact path="/recipes" component={Card} />
                    <Route path="/recipes/:id" component={DetailRecipe} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Init;

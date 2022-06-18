// import React from "react";
import { Routes, Route, BrowserRouter, Switch } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage";
import {Home} from "./Components/Home";
import {About} from "./Components/About.jsx";
import {RecipeCreate} from "./Components/RecipeCreate.jsx";
// import {DetailRecipe} from "./Components/DetailRecipe.jsx";
import './App.css';




function App() {


  return (
    <BrowserRouter>
      <div >
        {/* <h1> Api Food</h1> */}
        <Switch >
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/create" component={RecipeCreate} />
          {/* <Route path="/home/:id" component={DetailRecipe} /> */}
        </Switch>
        
        
      </div>
    </BrowserRouter>
  );
}

export default App;

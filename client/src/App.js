import { Routes, Route, BrowserRouter, Switch } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage";
import {Home} from "./Components/Home";
import {About} from "./Components/About.jsx";
import {RecipeCreate} from "./Components/RecipeCreate.jsx";
import { Navbar } from './Components/Navbar.jsx';
import './App.css'; 
import { Card } from './Components/Card';
import DetailRecipe  from './Components/DetailRecipe.jsx';


function App() {
  return (
    <BrowserRouter>
      <div >
        <Navbar />
        <Switch >
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home}  />
          <Route path="/about" component={About} />
          <Route path="/create" component={RecipeCreate} />
          <Route exact path="/recipes"  component={Card} />
          <Route path="/recipes/:id" component={DetailRecipe}  />
          {/* <Route path="/home/:id" component={DetailRecipe} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

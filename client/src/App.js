import { Routes, Route, BrowserRouter, Switch } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage";
import './App.css'; 
import Init from './Init';


function App() {
  return (
    <BrowserRouter>
      <div >
        <Switch >
          <Route exact path="/" component={LandingPage} />
          <Route path="/*" component={Init}  />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

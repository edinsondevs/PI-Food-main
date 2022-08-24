import { Route, BrowserRouter, Switch } from "react-router-dom";
import { LandingPage } from "./Components/Pages/LandingPage";
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

import './App.scss';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Main from "./components/Main";
import Card from "./components/Card";

function App() {
  return (
      <BrowserRouter>
        <div className="wrapper clear">
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/card/:username/:repoName" component={Card}/>
                <Redirect to="/" />
            </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;

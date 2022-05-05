import "./App.css";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import Favourites from "./Components/Favourites";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Banner />
            <Movies />
          </Route>
          <Route exact path="/favourites">
            <Favourites />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

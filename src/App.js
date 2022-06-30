import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navbar";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/Homepage";
import FavoriteLocationsContextWrapper from "./state/FavoriteLocationsContextWrapper";
import SingleLocationPage from "./pages/SingleLocationPage";

function App() {
  return (
    <div>
      <NavBar />

      <div className="container pt-3">
        <FavoriteLocationsContextWrapper>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/my-locations">
              <FavoritesPage />
            </Route>
            <Route exact path="/my-locations/:id">
              <SingleLocationPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </FavoriteLocationsContextWrapper>
      </div>
    </div>
  );
}

export default App;

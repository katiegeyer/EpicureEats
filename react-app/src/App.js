import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import RecipePage from "./components/RecipePage";
import Search from "./components/Search";
import MyRecipes from "./components/MyRecipes";

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import RecipeDetails from "./components/GetOneRecipe";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/recipes/:id">
            <RecipeDetails />
          </Route>
          <Route path="/recipes">
            <RecipePage />
          </Route>
          <Route path="/myrecipes">
            <MyRecipes />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import FoodG from "./components/FoodG/FoodG.jsx";
import FoodDetail from "./components/FoodDetail/FoodDetail.jsx";
import NewRecipe from "./components/NewRecipe/NewRecipe";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/recipes">
        <FoodG />
      </Route>
      <Route exact path="/recipes/:id">
        <FoodDetail />
      </Route>
      <Route exact path="/recipe">
        <NewRecipe />
      </Route>
    </div>
  );
}

export default App;

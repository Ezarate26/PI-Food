import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import FoodG from "./components/FoodG/FoodG.jsx";
import FoodDetail from "./components/FoodDetail/FoodDetail.jsx";
// import { getAllRecipes } from "./redux/actions/index.js";

function App() {
  return (
    <div className="App">
      <Route exact path="/recipes">
        <FoodG />
      </Route>
      <Route exact path="/recipes/:id">
        <FoodDetail />
      </Route>
    </div>
  );
}

export default App;

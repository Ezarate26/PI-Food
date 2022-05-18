import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import FoodG from "./components/FoodG/FoodG.jsx";
// import { getAllRecipes } from "./redux/actions/index.js";

function App() {
  return (
    <div className="App">
      <Route path="/recipes">
        <FoodG />
      </Route>
    </div>
  );
}

export default App;

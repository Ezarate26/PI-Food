import { getAllRecipes } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import CardsFood from "../CardsFood/CardsFood.jsx";

const FoodG = () => {
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(getAllRecipes());
    }
  }, []);

  console.log("recipes", recipes);

  return (
    <div>
      {recipes.length === 0 ? <h1>LOADING...</h1> : <h3>Recipes</h3>}

      {recipes.map((recipe) => (
        <CardsFood
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          image={recipe.image}
          dietType={recipe.diets}
        />
      ))}
    </div>
  );
};

export default FoodG;

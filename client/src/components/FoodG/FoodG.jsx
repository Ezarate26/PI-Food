import { getAllRecipes } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CardsFood from "../CardsFood/CardsFood.jsx";
import Search from "../Search/Search.jsx";
import styles from "./FoodG.module.css";

const FoodG = () => {
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(getAllRecipes());
    }
  }, []);

  return (
    <div>
      {recipes.length === 0 ? (
        <h1>LOADING...</h1>
      ) : (
        <>
          <h1>Recipes</h1>
          <Search />
          <Link to="/recipe">Create Recipe</Link>
          <div className={styles.foodGrid}>
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
        </>
      )}
    </div>
  );
};

export default FoodG;

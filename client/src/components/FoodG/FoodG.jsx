import { getAllRecipes } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardsFood from "../CardsFood/CardsFood.jsx";
import Search from "../Search/Search.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import imageF from "../../assets/raspberries-2023404_1920.jpg";
import styles from "./FoodG.module.css";

const FoodG = () => {
  const arrayRecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState({
    arrayRecipes: arrayRecipes,
    pageOfRecipes: [],
  });
  const onChangePage = (pageOfRecipes) => {
    setRecipes({
      pageOfRecipes: pageOfRecipes,
    });
  };

  useEffect(() => {
    if (arrayRecipes.length === 0) {
      dispatch(getAllRecipes());
    }
  }, []);

  return (
    <div>
      {arrayRecipes.length === 0 ? (
        <h1>LOADING...</h1>
      ) : (
        <div>
          <div className={styles.encabezado}>
            <Link className={styles.newRecipe} to="/recipe">
              Create Recipe
            </Link>
            <h1 className={styles.tittle}>Recipes</h1>
            <div>
              <Search />
            </div>
          </div>
          <div className={styles.pagination}></div>
          <div className={styles.foodGrid}>
            {arrayRecipes.map((recipe) => (
              <CardsFood
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                image={recipe.image}
                dietType={recipe.diets}
                healthScore={recipe.healthscore}
              />
            ))}
            <Pagination
              items={recipes.arrayRecipes}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodG;

import { getAllRecipes, getAllTypes } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardsFood from "../CardsFood/CardsFood.jsx";
import Search from "../Search/Search.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import FilteredByOrder from "../Filtered/FilteredByAlpha.jsx";

import imageF from "../../assets/raspberries-2023404_1920.jpg";
import styles from "./FoodG.module.css";
import FilteredByType from "../Filtered/Filtered.jsx";

const FoodG = () => {
  const currentPage = useSelector((state) => state.currentPage);
  const itemsperPage = useSelector((state) => state.itemsperPage);
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const dispatch = useDispatch();
  const lastIndex = currentPage * itemsperPage;
  const startIndex = lastIndex - itemsperPage;

  const arrayRecipesperPage = filteredRecipes.slice(startIndex, lastIndex);

  useEffect(() => {
    if (filteredRecipes.length === 0) {
      dispatch(getAllRecipes());
      dispatch(getAllTypes());
    }
  }, []);

  return (
    <div>
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

        <div className={styles.buttons}>
          <div className={styles.pagination}>
            <Pagination />
          </div>
          <div className={styles.filters}>
            <FilteredByType />

            <FilteredByOrder />
          </div>
        </div>

        <div className={styles.foodGrid}>
          {arrayRecipesperPage.map((recipe) => (
            <CardsFood
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              image={recipe.image}
              dietType={recipe.diets}
              healthScore={recipe.healthscore}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodG;

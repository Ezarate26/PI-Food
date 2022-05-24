import { getAllRecipes, getAllTypes } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import CardsFood from "../CardsFood/CardsFood.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import FilteredByOrder from "../Filtered/FilteredByAlpha.jsx";
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
    dispatch(getAllRecipes());
    dispatch(getAllTypes());
  }, []);

  return (
    <div>
      <div>
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
          {arrayRecipesperPage.map((recipe, i) => (
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

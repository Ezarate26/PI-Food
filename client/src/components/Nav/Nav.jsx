import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import styles from "./Nav.module.css";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../../redux/actions";

const Nav = () => {
  const dispatch = useDispatch();
  const toHome = () => {
    dispatch(getAllRecipes());
  };

  return (
    <div className={styles.encabezado}>
      <Link className={styles.newRecipe} to="/recipe">
        Create Recipe
      </Link>
      <Link to="/recipes" className={styles.tittle}>
        <h1 onClick={toHome}>Recipes</h1>
      </Link>
      <div>
        <Search />
      </div>
    </div>
  );
};

export default Nav;

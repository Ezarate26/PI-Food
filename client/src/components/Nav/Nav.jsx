import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.encabezado}>
      <Link className={styles.newRecipe} to="/recipe">
        Create Recipe
      </Link>
      <Link to="/recipe" className={styles.tittle}>
        <h1>Recipes</h1>
      </Link>
      <div>
        <Search />
      </div>
    </div>
  );
};

export default Nav;

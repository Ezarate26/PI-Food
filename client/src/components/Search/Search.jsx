import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRecipesByName } from "../../redux/actions/index.js";
import { useHistory } from "react-router-dom";

import styles from "./Search.module.css";

const Search = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    if (name) {
      history.push(`/recipes?name=${name}`);
      dispatch(getAllRecipesByName(name));
    }
  };

  return (
    <div className={styles.searchCon}>
      <input
        className={styles.input}
        type="text"
        placeholder="search your recipe"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <a className={styles.search} onClick={searchHandler}></a>
    </div>
  );
};

export default Search;

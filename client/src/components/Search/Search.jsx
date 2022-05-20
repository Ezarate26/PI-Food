import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipesByName } from "../../redux/actions/index.js";
import { useHistory } from "react-router-dom";

import styles from "./Search.module.css";

const Search = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <div className={styles.searchCon}>
      <input
        className={styles.input}
        type="text"
        placeholder="search your favorite recipe"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <a
        onClick={(e) => {
          e.preventDefault();
          history.push(`/recipes?name=${name}`);
          dispatch(getAllRecipesByName(name));
        }}
      >
        Search
      </a>
    </div>
  );
};

export default Search;

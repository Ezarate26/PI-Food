import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onChangePage } from "../../redux/actions/index";
import styles from "./Pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const itemsPerPage = useSelector((state) => state.itemsperPage);
  const currentPage = useSelector((state) => state.currentPage);

  const cards = Math.ceil(filteredRecipes.length / itemsPerPage);
  const numPage = [];

  for (let i = 0; i < cards; i++) {
    numPage.push(i + 1);
  }
  const onChangeP = (page) => {
    dispatch(onChangePage(page));
  };

  return (
    <ul className={styles.numPages}>
      {numPage.map((page) => (
        <li
          onClick={() => onChangeP(page)}
          className={page == currentPage ? styles.currentPage : ""}
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;

import React from "react";
import { filterByDiet, onChangePage } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Filtered.module.css";

const FilteredByType = () => {
  const filterTypes = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const onFilterByType = (diet) => {
    if (diet === "---- diet types ----") dispatch(filterByDiet(diet));

    dispatch(filterByDiet(diet))
    dispatch(onChangePage(1));
  };

  return (
    <div className={styles.selector}>
      <select onChange={(e) => onFilterByType(e.target.value.toLowerCase())}>
        <option default> ---- Diet Types ---- </option>

        {filterTypes.map((item, i) => (
          <option key={i}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default FilteredByType;

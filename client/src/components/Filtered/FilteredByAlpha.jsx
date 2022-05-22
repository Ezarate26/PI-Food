import React from "react";
import { order } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import styles from "./Filtered.module.css";

const FilteredByOrder = () => {
  const dispatch = useDispatch();

  const onFilterByA = (value) => {
    if (value === "ORDER BY...") {
      dispatch(order(value));
    }

    dispatch(order(value));
  };

  return (
    <div className={styles.selector}>
      <select onChange={(e) => onFilterByA(e.target.value.toUpperCase())}>
        <option default>Order By...</option>

        <option>Alphabet_ASC</option>
        <option>Alphabet_DSC</option>
        <option>HealthScore_ASC</option>
        <option>HealthScore_DSC</option>
      </select>
    </div>
  );
};

export default FilteredByOrder;

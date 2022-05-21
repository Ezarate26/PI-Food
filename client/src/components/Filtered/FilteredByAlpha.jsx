import React, { useEffect } from "react";
import { order } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";

const FilteredByAlpha = () => {
  const dispatch = useDispatch();

  const filtereds = useSelector((state) => state.filteredRecipes);
  const statefilter = useSelector((state) => state.order);

  useEffect(() => {
    console.log(statefilter);
    dispatch(order(statefilter));
  }, []);

  const onFilterByA = (value) => {
    dispatch(order(value));
  };

  return (
    <div>
      <center>
        <select onChange={(e) => onFilterByA(e.target.value)}>
          <option default> ---- Alphabetical Order ---- </option>

          <option>FILTER_A</option>
          <option>FILTER_D</option>
        </select>
      </center>
    </div>
  );
};

export default FilteredByAlpha;

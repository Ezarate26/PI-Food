import React from "react";
import { filterByDiet } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";

const FilteredByType = () => {
  const filterTypes = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const onFilterByType = (diet) => {
    dispatch(filterByDiet(diet));
  };

  return (
    <div>
      <center>
        <select
          onChange={(e) => onFilterByType(e.target.value.toLocaleLowerCase())}
        >
          <option default> ---- Diet Types ---- </option>

          {filterTypes.map((item) => (
            <option>{item.name}</option>
          ))}
        </select>
      </center>
    </div>
  );
};

export default FilteredByType;

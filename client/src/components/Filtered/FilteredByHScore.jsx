import React from "react";

import { useDispatch } from "react-redux";

const FilteredByScore = () => {
  const dispatch = useDispatch();

  const onFilterByScore = (value) => {};

  return (
    <div>
      <center>
        <select onChange={(e) => onFilterByScore(e.target.value)}>
          <option default> ---- HealthScore Order ---- </option>

          <option>---- MIN-MAX ----</option>
          <option>---- MAX-MIN ----</option>
        </select>
      </center>
    </div>
  );
};

export default FilteredByScore;

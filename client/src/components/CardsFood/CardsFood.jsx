import React from "react";
import { Link } from "react-router-dom";

const CardsFood = (props) => {
  return (
    <Link to={`/recipes/${props.id}`}>
      <div>
        <h3>{props.name}</h3>
        <img src={props.image} alt={props.name} />
        <p>{props.dietType}</p>
      </div>
    </Link>
  );
};

export default CardsFood;

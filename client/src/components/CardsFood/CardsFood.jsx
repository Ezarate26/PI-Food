import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardsFood.module.css";

const CardsFood = (props) => {
  return (
    <div className={styles.FoodCard}>
      <img src={props.image} alt={props.name} className={styles.image} />
      <h3>{props.name}</h3>

      <h3>Diet Types:</h3>

      <ul className={styles.diets}>
        {props.dietType.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
      <Link to={`/recipes/${props.id}`} className={styles.details}>
        Details
      </Link>
    </div>
  );
};

export default CardsFood;

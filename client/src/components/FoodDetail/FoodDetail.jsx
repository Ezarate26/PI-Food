import React, { useEffect } from "react";
import { getRecipeDetail } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./FoodDetail.module.css";

const FoodDetail = () => {
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, []);

  return (
    <div className={styles.recipeDetails}>
      <img
        className={styles.col}
        src={recipeDetail?.image}
        alt={recipeDetail?.name}
      />

      <div className={styles.col}>
        <h3>{recipeDetail?.name}</h3>
        <p>
          <strong>Summary: </strong> {recipeDetail?.dish_summary}
        </p>
        <p>
          <strong>Dishtypes: {recipeDetail?.dishTypes} </strong>
        </p>
        {/* <h4>
        <strong>Score: </strong>
        {recipeDetail?.score}
      </h4> */}
        <p>
          <strong>Diets: </strong>
          {recipeDetail?.diets}
        </p>
        <p>
          <strong>HealthScore: {recipeDetail?.healthScore}</strong>
        </p>
        <p>
          <strong>Steps: </strong>
          <ol>
            {recipeDetail?.steps[0][1].map((step, index) => (
              <li key={index}>{step[1]}</li>
            ))}
          </ol>
        </p>
      </div>
    </div>
  );
};

export default FoodDetail;

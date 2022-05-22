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
      {recipeDetail ? (
        <div className={styles.info}>
          <h1>{recipeDetail.name}</h1>
          <div className={styles.img_diets}>
            <img
              className={styles.image}
              src={recipeDetail.image}
              alt={recipeDetail.name}
            />
          </div>

          <div className={styles.subtitle}>DISH TYPES: </div>
          <ul>
            {recipeDetail.dishTypes?.map((e, i) => (
              <li key={i}>{e} </li>
            ))}
          </ul>

          <div className={styles.subtitle}>DIET TYPES: </div>
          <div>
            <ul>
              {recipeDetail.diets.map((e, i) => (
                <li key={i}>{e} </li>
              ))}
            </ul>
          </div>
          <div className={styles.subtitle}>SUMMARY :</div>
          <div className={styles.text_p}>{recipeDetail.summary}</div>
          <div className={styles.subtitle}>SCORE: </div>
          <div className={styles.text}>{recipeDetail.score}</div>

          <div className={styles.subtitle}>NIVEL DE COMIDA SALUDABLE :</div>
          <div className={styles.text}>{recipeDetail.healthscore}</div>

          <div className={styles.subtitle}>Steps: </div>
          {recipeDetail.steps[0][1].length === 0 ? (
            "sin instrucciones"
          ) : (
            <ol className={styles.text}>
              {recipeDetail.steps[0][1].map((step, index) => (
                <li key={index}>{step[1]}</li>
              ))}
            </ol>
          )}
        </div>
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
};

export default FoodDetail;

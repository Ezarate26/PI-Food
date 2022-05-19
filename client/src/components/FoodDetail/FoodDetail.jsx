import React, { useEffect } from "react";
import { getRecipeDetail } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FoodDetail = () => {
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, []);

  return (
    <div>
      <h3> {recipeDetail?.name} </h3>

      <img src={recipeDetail?.image} alt={recipeDetail?.name} />
      <p>{recipeDetail?.dish_summary}</p>
      <h4>{recipeDetail?.dishTypes}</h4>
      <h4>{recipeDetail?.score}</h4>
      <p>{recipeDetail?.diets}</p>
      <h4>{recipeDetail?.healthScore}</h4>
      <p>{recipeDetail?.steps}</p>
    </div>
  );
};

export default FoodDetail;

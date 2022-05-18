import { getAllRecipes } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function FoodG() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  });

  const recipes = useSelector((state) => state.recipes);
  console.log("recipes", recipes);

  return (
    <div>
      <h3>Recipes</h3>
    </div>
  );
}

export default FoodG;

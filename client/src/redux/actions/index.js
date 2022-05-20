import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_RECIPES_BY_NAME = "GET_ALL_RECIPES_BY_NAME";
export const GET_RECIPES_BY_ID = "GET_RECIPES_BY_ID";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_ALL_TYPES = "GET_ALL_TYPES";

export const getAllRecipes = () => {
  try {
    return async function (dispatch) {
      let response = await axios.get("http://localhost:3001/recipes");
      return dispatch({
        type: GET_ALL_RECIPES,
        payload: response.data,
      });
    };
  } catch (err) {
    console.log(err);
  }
};

export const getAllRecipesByName = (name) => {
  try {
    return async function (dispatch) {
      let response = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: GET_ALL_RECIPES_BY_NAME,
        payload: response.data,
      });
    };
  } catch (err) {
    console.log(err);
  }
};

export const getRecipeDetail = (id) => {
  try {
    return async function (dispatch) {
      let response = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: GET_RECIPES_BY_ID,
        payload: response.data,
      });
    };
  } catch (err) {
    console.log(err);
  }
};
export const getAllTypes = () => {
  try {
    return async function (dispatch) {
      let response = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_ALL_TYPES,
        payload: response.data,
      });
    };
  } catch (err) {
    console.log(err);
  }
};

export const createRecipe = (recipe) => {
  try {
    console.log(recipe);
    return {
      type: CREATE_RECIPE,
      payload: recipe,
    };
  } catch (err) {
    console.log(err);
  }
};

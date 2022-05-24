import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_RECIPES_BY_NAME = "GET_ALL_RECIPES_BY_NAME";
export const GET_RECIPES_BY_ID = "GET_RECIPES_BY_ID";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const FILTER_DIET = "FILTER_DIET";
export const ALPHABET_ASC = "ALPHABET_ASC";
export const ALPHABET_DSC = "ALPHABET_DSC";
export const SIN_FILTERS = "SIN_FILTERS";
export const HEALTHSCORE_ASC = "HEALTHSCORE_ASC";
export const HEALTHSCORE_DSC = "HEALTHSCORE_DSC";

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
  console.log("hola");
  try {
    return async function (dispatch) {
      let response = await axios.get(`http://localhost:3001/recipes/${id}`);
      console.log(response.data);
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

export const createRecipe = (food) => {
  return async function (dispatch) {
    try {
      let data = await axios.post("http://localhost:3001/recipe", food);
      console.log("data", data.data);
      return dispatch({ type: CREATE_RECIPE, payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const onChangePage = (page) => {
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
};

export const filterByDiet = (diet) => {
  return {
    type: FILTER_DIET,
    payload: diet,
  };
};

export const order = (filter) => {
  return {
    type: filter === "ORDER BY..." ? SIN_FILTERS : filter,
  };
};

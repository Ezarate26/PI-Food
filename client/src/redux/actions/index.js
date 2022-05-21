import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_RECIPES_BY_NAME = "GET_ALL_RECIPES_BY_NAME";
export const GET_RECIPES_BY_ID = "GET_RECIPES_BY_ID";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const FILTER_DIET = "FILTER_DIET";
export const FILTER_A = "FILTER_A";
export const FILTER_D = "FILTER_D";
export const SIN_FILTERS = "SIN_FILTERS";
export const SCORE_A = "SCORE_A";
export const SCORE_D = "SCORE_D";

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

export const onChangePage = (page) => {
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
};

export const filterByDiet = (diet) => {
  console.log(diet);
  return {
    type: FILTER_DIET,
    payload: diet,
  };
};

export const order = (filter) => {
  return {
    type: filter,
  };
};

export const sinFilters = () => {
  return {
    type: SIN_FILTERS,
  };
};

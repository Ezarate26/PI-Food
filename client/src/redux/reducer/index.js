import {
  GET_ALL_RECIPES,
  GET_ALL_RECIPES_BY_NAME,
  GET_RECIPES_BY_ID,
  CREATE_RECIPE,
  GET_ALL_TYPES,
} from "../actions/index.js";

const initialState = {
  recipes: [],

  types: [],
  recipeDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        recipes: [...action.payload],
      };
    case GET_ALL_RECIPES_BY_NAME:
      return {
        recipes: [...action.payload],
      };
    case GET_RECIPES_BY_ID:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: [...action.payload],
      };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;

import {
  GET_ALL_RECIPES,
  GET_ALL_RECIPES_BY_NAME,
  GET_RECIPES_BY_ID,
  CREATE_RECIPE,
  GET_ALL_TYPES,
  CHANGE_PAGE,
  FILTER_DIET,
  FILTER_A,
  FILTER_D,
  SCORE_A,
  SCORE_D,
  SIN_FILTERS,
} from "../actions/index.js";

const initialState = {
  recipes: [],
  filteredRecipes: [],

  currentPage: 1,
  itemsperPage: 9,
  types: [],
  recipeDetail: {},
  order: "FILTER_A",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
        filteredRecipes: [...action.payload],
        filteredRecipes: [...action.payload],
      };
    case GET_ALL_RECIPES_BY_NAME:
      return {
        ...state,
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
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case FILTER_DIET:
      return {
        ...state,

        filteredRecipes:
          action.payload === "---- diet types ----"
            ? [...state.recipes]
            : [
                ...state.recipes.filter((recipe) => {
                  return recipe.diets.includes(action.payload);
                }),
              ],
      };
    case FILTER_A:
      return {
        ...state,

        filteredRecipes: [
          ...state.filteredRecipes.sort((recipe, otherRecipe) => {
            if (recipe.name > otherRecipe.name) {
              return 1;
            }
            if (recipe.name < otherRecipe.name) {
              return -1;
            }

            return 0;
          }),
        ],
      };
    case FILTER_D:
      return {
        ...state,

        filteredRecipes: [
          ...state.filteredRecipes.sort((recipe, otherRecipe) => {
            if (recipe.name < otherRecipe.name) {
              return 1;
            }
            if (recipe.name > otherRecipe.name) {
              return -1;
            }

            return 0;
          }),
        ],
      };
    case SCORE_A:
      console.log("escorea");
      return {
        ...state,

        filteredRecipes: [
          ...state.filteredRecipes.sort((recipe, otherRecipe) => {
            if (recipe.healthscore > otherRecipe.healthscore) {
              return 1;
            }
            if (recipe.healthscore < otherRecipe.healthscore) {
              return -1;
            }

            return 0;
          }),
        ],
      };
    case SCORE_D:
      console.log("escored");
      return {
        ...state,

        filteredRecipes: [
          ...state.filteredRecipes.sort((recipe, otherRecipe) => {
            if (recipe.healthscore < otherRecipe.healthscore) {
              return 1;
            }
            if (recipe.healthscore > otherRecipe.healthscore) {
              return -1;
            }

            return 0;
          }),
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;

import {
  GET_ALL_RECIPES,
  GET_ALL_RECIPES_BY_NAME,
  GET_RECIPES_BY_ID,
  CREATE_RECIPE,
  GET_ALL_TYPES,
  CHANGE_PAGE,
  FILTER_DIET,
  ALPHABET_ASC,
  ALPHABET_DSC,
  HEALTHSCORE_ASC,
  HEALTHSCORE_DSC,
  SIN_FILTERS,
} from "../actions/index.js";

const initialState = {
  recipes: [],
  filteredRecipes: [],
  recipesUnOrder: [],
  recipesAux: [],
  currentPage: 1,
  itemsperPage: 9,
  types: [],
  recipeDetail: {},
  orderType: false,
  orderAsc: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
        filteredRecipes: [...action.payload],
        recipesUnOrder: [...action.payload],
        recipesAux: [...action.payload],
      };
    case GET_ALL_RECIPES_BY_NAME:
      return {
        ...state,

        recipes: [...action.payload],
        filteredRecipes: [...action.payload],
        recipesUnOrder: [...action.payload],
        recipesAux: [...action.payload],
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
      if (action.payload === "---- diet types ----" && !state.orderAsc) {
        return {
          ...state,
          filteredRecipes: [...state.recipesAux],
          filteredRecipes: [...state.recipesAux],
          recipesUnOrder: [...state.recipesAux],
        };
      }
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

        recipesUnOrder:
          action.payload === "---- diet types ----"
            ? [...state.recipesAux]
            : [
                ...state.recipesAux.filter((recipe) => {
                  return recipe.diets.includes(action.payload);
                }),
              ],
        orderType: action.payload === "---- diet types ----" ? false : true,
      };
    case ALPHABET_ASC:
      return {
        ...state,

        recipes: [
          ...state.recipes.sort((recipe, otherRecipe) => {
            if (recipe.name.toLowerCase() > otherRecipe.name.toLowerCase()) {
              return 1;
            }
            if (recipe.name < otherRecipe.name) {
              return -1;
            }

            return 0;
          }),
        ],
        filteredRecipes: [
          ...state.filteredRecipes.sort((recipe, otherRecipe) => {
            if (recipe.name.toLowerCase() > otherRecipe.name.toLowerCase()) {
              return 1;
            }
            if (recipe.name.toLowerCase() < otherRecipe.name.toLowerCase()) {
              return -1;
            }

            return 0;
          }),
        ],
        orderAsc: true,
      };
    case ALPHABET_DSC:
      return {
        ...state,

        recipes: [
          ...state.recipes.sort((recipe, otherRecipe) => {
            if (recipe.name.toLowerCase() < otherRecipe.name.toLowerCase()) {
              return 1;
            }
            if (recipe.name.toLowerCase() > otherRecipe.name.toLowerCase()) {
              return -1;
            }

            return 0;
          }),
        ],
        filteredRecipes: [
          ...state.filteredRecipes.sort((recipe, otherRecipe) => {
            if (recipe.name.toLowerCase() < otherRecipe.name.toLowerCase()) {
              return 1;
            }
            if (recipe.name.toLowerCase() > otherRecipe.name.toLowerCase()) {
              return -1;
            }

            return 0;
          }),
        ],
        orderAsc: true,
      };
    case HEALTHSCORE_ASC:
      return {
        ...state,

        recipes: [
          ...state.recipes.sort((recipe, otherRecipe) => {
            if (recipe.healthscore > otherRecipe.healthscore) {
              return 1;
            }
            if (recipe.healthscore < otherRecipe.healthscore) {
              return -1;
            }

            return 0;
          }),
        ],
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
        orderAsc: true,
      };
    case HEALTHSCORE_DSC:
      return {
        ...state,

        recipes: [
          ...state.recipes.sort((recipe, otherRecipe) => {
            if (recipe.healthscore < otherRecipe.healthscore) {
              return 1;
            }
            if (recipe.healthscore > otherRecipe.healthscore) {
              return -1;
            }

            return 0;
          }),
        ],
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
        orderAsc: true,
      };
    case SIN_FILTERS:
      console.log(state.order);
      return {
        ...state,
        recipes: state.orderType
          ? [...state.recipesUnOrder]
          : [...state.recipesAux],

        filteredRecipes: state.orderType
          ? [...state.recipesUnOrder]
          : [...state.recipesAux],
        orderAsc: false,
      };
    default:
      return state;
  }
};

export default rootReducer;

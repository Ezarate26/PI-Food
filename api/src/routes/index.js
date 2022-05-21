require("dotenv").config();
const { Router } = require("express");
const axios = require("axios").default;
const { API } = process.env;
//const API = "48f825ac985b4674927decbde47c5a2d";
//const API = "0990ad0316f3448291b0d554b53418fd";
const { Recipe, Diet } = require("../db");
const Sequelize = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const dietTypes = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto Ovo Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleolithic",
  "Primal",
  "Low FODMAP",
  "Whole 30",
  "dairy free",
];

const RecipeFormater = function (id, name, score, image, diets, dishType) {
  let obj = {
    id: id,
    name: name,
    image: image,
    healthscore: score,
    diets: diets,
    dishType: dishType,
  };

  return obj;
};
router.get("/recipes", async function (req, res) {
  try {
    let { name } = req.query;
    let response;
    name
      ? (response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API}&query=${name}&addRecipeInformation=true&number=100`
        ))
      : (response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API}&addRecipeInformation=true&number=100`
        ));

    if (!response.data.results) throw new Error("No existen resultados");
    let recipes = response.data.results.map((recipe) =>
      RecipeFormater(
        recipe.id,
        recipe.title,
        recipe.healthScore,
        recipe.image,
        recipe.diets,
        recipe.dishTypes
      )
    );
    let recipeDB;
    if (name) {
      recipeDB = await Recipe.findAll({
        where: {
          name: name,
        },
      });
      if (recipeDB.length > 0) recipeDB.map((recipe) => recipes.push(recipe));
    } else {
      recipeDB = await Recipe.findAll();
      if (recipeDB.length > 0) recipeDB.map((recipe) => recipes.push(recipe));
    }

    res.send(recipes);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/recipes/:id", async function (req, res) {
  try {
    let item;
    let { id } = req.params;
    if (id.includes("-")) {
      item = await Recipe.findAll({
        where: {
          ID: id,
        },
        include: {
          model: Diet,
        },
      });

      return res.send(item);
    }
    item = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API}`
    );

    let data = item.data;

    const dietList = [...data.diets];
    data.vegetarian && dietList.push("vegetarian");
    data.vegan && dietList.push("vegan");
    data.glutenFree && dietList.push("gluten free");

    let filtered = [...new Set(dietList)];

    let stepsFormated = [];

    data.analyzedInstructions.map((item) => {
      let nested = [];
      item.steps.map((step) => {
        nested.push([step.number, step.step]);
      });
      stepsFormated.push([item.name, nested]);
      return nested;
    });

    const text = data.summary.replace(/<[^>]+>/g, "");

    let obj = {
      name: data.title,
      image: data.image,
      id: data.id,
      dish_summary: text,
      dishTypes: data.dishTypes,
      score: data.spoonacularScore,
      diets: filtered,
      healthScore: data.healthScore,
      steps: stepsFormated,
    };
    console.log(obj);
    res.send(obj);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

async function types() {
  try {
    let types = await Diet.findAll();
    if (types.length === 0) {
      const createTypes = dietTypes.map(
        async (diet) => await Diet.create({ name: diet })
      );

      types = await Promise.all(createTypes);
    }
    return types;
  } catch (err) {
    return err;
  }
}

router.get("/types", async function (req, res) {
  try {
    res.send(await types());
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/recipe", async (req, res) => {
  try {
    await types();
    let {
      name,
      dish_summary,
      score,
      healthScore,
      steps,
      diets,
      image,
      dishTypes,
    } = req.body;
    if (!name || !dish_summary)
      return res
        .status(422)
        .json({ message: "name and dish_summary required" });
    if (score < 0 || score > 10)
      return res.status(422).send({ message: "score must be between 0 -10" });
    if (healthScore < 0 || healthScore > 10)
      return res
        .status(422)
        .json({ message: "healtScore must be between 0 -10" });
    score = score ? score : 0;
    healthScore = healthScore ? healthScore : 0;

    let newRecipe = await Recipe.create({
      name,
      dish_summary,
      score: score,
      healthScore: healthScore,
      steps,
      image,
      dishTypes,
    });

    let formated = Array.isArray(diets) ? diets : [diets];

    const matchingDiets = formated.map(
      async (diet) =>
        await Diet.findAll({
          where: {
            name: diet,
          },
        })
    );
    let result = await Promise.all(matchingDiets);

    result.map(async (match) => await newRecipe.setDiets(match));

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;

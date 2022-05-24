import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Search from "../Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { createRecipe } from "../../redux/actions/index";
import styles from "./NewRecipe.module.css";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.image) {
    errors.image = "image is required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
    errors.image = "image is invalid, please insert a valid URL";
  }
  if (!input.dish_summary) {
    errors.dish_summary = "Dish summary is required";
  }
  if (!input.score) {
    errors.score = "Score is required";
  } else if (input.score > 10 || input.score < 0) {
    errors.score = "The score must be equal to or less than 10";
  }
  if (!input.healthScore) {
    errors.healthScore = "healthScore is required";
  } else if (input.healthScore > 100 || input.healthScore < 0) {
    errors.healthScore = "The healthScore must be equal to or less than 100";
  }
  if (!input.steps) {
    errors.steps = "Steps is required";
  }

  return errors;
}

const NewRecipe = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { types } = state;

  const history = useHistory();
  const [Diets_list, setDiets_list] = useState([]);

  const [food, setfood] = useState({
    name: "",
    dish_summary: "",
    score: "",
    healthScore: "",
    steps: "",
    diets: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  function handleOnchange(e) {
    if (errors) {
      setErrors(
        validate({
          ...food,
          [e.target.name]: e.target.value,
        })
      );
    }
    setfood({
      ...food,
      [e.target.name]: e.target.value,
    });
  }

  function diets_selecion() {
    setDiets_list([]);
  }

  function handleChooseClick(e) {
    let newlist = [...Diets_list];
    newlist.push(e.target.id);
    console.log(newlist);
    setDiets_list(newlist);
  }

  async function handleSumit(e, volver = true) {
    e.preventDefault();

    let data = { ...food };

    data.diets = Diets_list;

    try {
      if (volver) history.push("/recipes");
      alert("Tu receta fue creada con exito!");
    } catch (err) {
      console.log(err);
      alert("Ups! aparentemente algo salio mal intentalo mas tarde");
    }

    setfood({
      name: "",
      dish_summary: "",
      score: "",
      healthScore: "",
      steps: "",
      diets: "",
      image: "",
    });

    dispatch(createRecipe(data));

    setDiets_list([]);
  }

  function volver() {
    history.push("/recipes");
  }
  return (
    <div>
      <div className={styles.encabezado}>
        <Link to="/recipes" className={styles.tittle}>
          <h1>Recipes</h1>
        </Link>
        <div>
          <Search />
        </div>
      </div>
      <div className={styles.addRecipe}>
        <form onSubmit={handleSumit} className={styles.formulario}>
          <h2>AGREGAR PLATO</h2>
          <div className={styles.form_inputs}>
            <label>Nombre Del Plato: </label>
            <input
              className={errors.name ? styles.danger : styles.inputs}
              name="name"
              type="text"
              value={food.name}
              onChange={handleOnchange}
              required
            />
            {errors.name && <p className={styles.danger}>{errors.name}</p>}
          </div>
          <div className={styles.form_inputs}>
            <label>Resumen Del Plato: </label>
            <textarea
              className={errors.dish_summary ? styles.danger : styles.textarea}
              name="dish_summary"
              type="text"
              value={food.dish_summary}
              onChange={handleOnchange}
              required
            />
            {errors.dish_summary && (
              <p className={styles.danger}>{errors.dish_summary}</p>
            )}
          </div>
          <div className={styles.form_inputs}>
            <label>Puntuacion: </label>
            <input
              className={errors.score ? styles.danger : styles.inputs}
              name="score"
              type="number"
              value={food.score}
              placeholder="Puntuacion Del 1 a 10"
              onChange={handleOnchange}
              required
            />
            {errors.score && <p className={styles.danger}>{errors.score}</p>}
          </div>
          <div className={styles.form_inputs}>
            <label>Nivel de comida saludable : </label>
            <input
              className={errors.healthScore ? styles.danger : styles.inputs}
              name="healthScore"
              type="number"
              value={food.healthScore}
              placeholder="Calificacion de 1 a 100"
              onChange={handleOnchange}
              required
            />
            {errors.healthScore && (
              <p className={styles.danger}>{errors.healthScore}</p>
            )}
          </div>
          <div className={styles.form_inputs}>
            <label>Paso a paso: </label>
            <textarea
              className={errors.steps ? styles.danger : styles.textarea}
              name="steps"
              type="text"
              value={food.steps}
              onChange={handleOnchange}
              required
            />
            {errors.steps && <p className={styles.danger}>{errors.steps}</p>}
          </div>
          <div className={styles.form_inputs}>
            <label>Url de imagen: </label>

            <input
              className={errors.image ? styles.danger : styles.inputs}
              type="url"
              name="image"
              value={food.image}
              onChange={handleOnchange}
              required
            />
            {errors.image && <p className={styles.danger}>{errors.image}</p>}
          </div>
          <div>
            <h2>Dietas</h2>
            <div className={styles.dietasSeleccion}>
              <ul>
                {types.map((e, i) => (
                  <div key={i}>
                    <label
                      onClick={handleChooseClick}
                      id={e.name}
                      className={
                        Diets_list.includes(e.name)
                          ? styles.dieta1
                          : styles.dieta2
                      }
                    >
                      {e.name}
                    </label>
                  </div>
                ))}
              </ul>
            </div>
            <div className={styles.addRecipeaddbutton}>
              <button
                type="button"
                onClick={diets_selecion}
                className={styles.add_button}
              >
                Borrar Selecionados
              </button>
            </div>
          </div>
          <div>
            <div className={styles.addbutton}>
              <button type="submit" className={styles.add_button}>
                CREAR Y VOLVER
              </button>
              <button
                type="button"
                onClick={(e) => handleSumit(e, false)}
                className={styles.add_button}
              >
                CREAR Y CREAR NUEVA
              </button>
            </div>
            <div className={styles.addbutton}>
              <button
                type="button"
                onClick={volver}
                className={styles.add_button}
              >
                Volver
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRecipe;

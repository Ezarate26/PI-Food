import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createRecipe } from "../../redux/actions/index";
import styles from "./NewRecipe.module.css";

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

  function handleOnchange(e) {
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
    } catch (err) {
      console.log(err);
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
    <div className={styles.addRecipe}>
      <form onSubmit={handleSumit} className={styles.formulario}>
        <h2>AGREGAR PLATO</h2>
        <div className={styles.form_inputs}>
          <label>Nombre Del Plato: </label>
          <input
            className={styles.inputs}
            name="name"
            type="text"
            value={food.name}
            onChange={handleOnchange}
            required
          />
        </div>
        <div className={styles.form_inputs}>
          <label>Resumen Del Plato: </label>
          <textarea
            className={styles.textarea}
            name="dish_summary"
            type="text"
            rows="10"
            cols="50"
            value={food.dish_summary}
            onChange={handleOnchange}
            required
          />
        </div>
        <div className={styles.form_inputs}>
          <label>Puntuacion: </label>
          <input
            className={styles.inputs}
            name="score"
            type="number"
            max="10"
            min="1"
            value={food.score}
            placeholder="Puntuacion Del 1 a 10"
            onChange={handleOnchange}
            required
          />
        </div>
        <div className={styles.form_inputs}>
          <label>Nivel de comida saludable : </label>
          <input
            className="inputs"
            name="healthScore"
            type="number"
            max="100"
            min="1"
            value={food.healthScore}
            placeholder="Calificacion de 1 a 100"
            onChange={handleOnchange}
            required
          />
        </div>
        <div className={styles.form_inputs}>
          <label>Paso a paso: </label>
          <textarea
            className="textarea"
            name="steps"
            type="text"
            rows="10"
            cols="15"
            value={food.steps}
            onChange={handleOnchange}
            required
          />
        </div>
        <div className={styles.form_inputs}>
          <label>Url de imagen: </label>

          <input
            className={styles.inputs}
            type="url"
            name="image"
            value={food.image}
            onChange={handleOnchange}
            required
          />
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
  );
};

export default NewRecipe;

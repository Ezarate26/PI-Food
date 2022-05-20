import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRecipe } from "../../redux/actions/index.js";

const NewRecipe = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    dish_summary: "",
    score: 0,
    healthScore: 0,

    diets: "",
    image: "",
    dishTypes: [],
  });
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState("");

  const deleteStep = (stepindex) => {
    console.log("deletedstep", step);
    setSteps((state) => [
      ...state.filter((step) => {
        if (step[0] !== stepindex && step[0] < stepindex) {
          console.log("entrastepsolito");
          return step;
        }
        if (step[0] !== stepindex && step[0] > stepindex) {
          console.log("modificaindex");
          console.log(step[0] - 1);
          let index = step[0];

          return [index, step[1]];
        }
      }),
    ]);
  };
  console.log(steps);
  const stepHandler = (e) => {
    setStep(e.target.value);
  };

  const stepsHandler = () => {
    setSteps((state) => [...state, [state.length + 1, step]]);
    setStep("");
  };

  const handleInputChange = (e) =>
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

  const submithandler = (e) => {
    e.preventDefault();

    dispatch(createRecipe(inputs));
  };

  return (
    <div>
      <form onSubmit={submithandler}>
        <label>Name: </label>
        <input
          name="name"
          value={inputs.name}
          onChange={handleInputChange}
        ></input>
        <label>Dish Summary: </label>
        <textarea
          name="dish_summary"
          value={inputs.dish_summary}
          onChange={handleInputChange}
        ></textarea>
        <label>Score: </label>
        <input
          type="number"
          name="score"
          value={inputs.score}
          onChange={handleInputChange}
        ></input>
        <label>HealthScore: </label>
        <input
          type="number"
          name="healthScore"
          value={inputs.healthScore}
          onChange={handleInputChange}
        ></input>
        <label>Steps: </label>
        <input name="steps" value={step} onChange={stepHandler}></input>
        <button onClick={stepsHandler}>Agregar</button>
        <div>
          {steps.map((step) => (
            <div>
              {step[0]}.- {step[1]}
              <button onClick={() => deleteStep(step[0])}>X</button>
            </div>
          ))}
        </div>

        <label>Diets: </label>
        <textarea
          name="diets"
          value={inputs.diets}
          onChange={handleInputChange}
        ></textarea>
        <label>Dish Types: </label>
        <textarea
          name="dishTypes"
          value={inputs.dishTypes}
          onChange={handleInputChange}
        ></textarea>
        <label>Imagen: </label>
        <input name="image" value={inputs.image} onChange={handleInputChange} />

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default NewRecipe;

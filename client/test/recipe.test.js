import React from "react";
import { useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";
import store from "../src/redux/store/index";

import { createRecipe } from "../src/redux/actions/index";

import NewRecipe from "../src/components/NewRecipe/NewRecipe";

configure({ adapter: new Adapter() });

describe("<NewRecipe/>", () => {
  const state = store;
  const mockStore = configureStore([thunk]);

  beforeAll(() => expect(isReact.classComponent(createRecipe)).toBeFalsy());

  // RECUERDEN USAR FUNCTIONAL COMPONENT EN LUGAR DE CLASS COMPONENT
  describe("Formulario de creación de receta", () => {
    let createRecipe;
    let store = mockStore(state);
    beforeEach(() => {
      createRecipe = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/recipe"]}>
            <NewRecipe />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debe renderizar un formulario", () => {
      expect(createRecipe.find("form").length).toBe(1);
    });

    it('Debe renderizar un label para el nombre con el texto "Nombre Del Plato: "', () => {
      expect(createRecipe.find("label").at(0).text()).toEqual(
        "Nombre Del Plato: "
      );
    });

    it('Debe renderizar un input para la propiedad "name" igual a "name', () => {
      expect(createRecipe.find('input[name="name"]').length).toBe(1);
    });

    it('Debe renderizar un label para el score con el texto "Price:', () => {
      expect(createRecipe.find("label").at(1).text()).toBe("Puntuacion: ");
    });
  });
});

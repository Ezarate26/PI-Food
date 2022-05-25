/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db");

const agent = session(app);

describe("Recipe routes", () => {


  describe("POST /recipe", () => {
    it("should get 404 if we dont send data", () =>
      agent.get("/recipe").expect(404));
  });
  describe("GET /types", () => {
    it("should get 12", () => agent.get("/types").expect(200));
  });
  describe("GET /diets array ", () => {
    it("should get 12 and different to objet", () =>
      agent.get("/types").then((res) => {
        expect(res.send).to.not.be.equal(typeof Object);
      }));
  });
});

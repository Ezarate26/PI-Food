import LandingPage from "./components/LandingPage/LandingPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("LandingPage", () => {
  it("should have an title Happy Cooking!", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const title = screen.getByText("Happy Cooking!");
    expect(title).toBeInTheDocument();
  });
  it("should have a button Welcome", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const button = screen.getByText("Welcome");
    expect(button).toBeInTheDocument();
  });
});

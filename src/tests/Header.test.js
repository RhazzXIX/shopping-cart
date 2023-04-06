import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";

describe("Page Header", () => {
  it("Renders the Nav buttons", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0].textContent).toMatch(/home/i);
    expect(buttons[1].textContent).toMatch(/shop/i);
    expect(buttons[2].textContent).toMatch(/credits/i);
  });
});

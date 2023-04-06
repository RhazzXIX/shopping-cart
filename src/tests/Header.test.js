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
    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toMatch(/home/i);
    expect(buttons[1].textContent).toMatch(/shop/i);
  });
});

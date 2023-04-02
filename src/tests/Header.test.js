import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";

describe("Page Header", () => {
  it("Renders the Nav buttons", () => {
    render(<Header />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0].textContent).toMatch(/home/i);
    expect(buttons[1].textContent).toMatch(/shop/i);
    expect(buttons[2].textContent).toMatch(/cart/i);
  });

  describe("Number of items in cart", () => {
    it("Shows how many items in the cart", () => {
      render(<Header itemsAmount={3} />);
      const buttons = screen.getAllByRole("button");
      expect(buttons[2].textContent).toMatch(/Cart 3/i);
    });
    it(`Doesn't show any number if there are no items in the cart`, () => {
      render(<Header itemsAmount={0} />);
      const buttons = screen.getAllByRole("button");
      expect(buttons[2].textContent).toMatch(/Cart/i);
    });
  });
});

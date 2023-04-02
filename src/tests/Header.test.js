import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";

describe("Page Header", () => {
  it("It renders the Home button", () => {
    render(<Header />);
    const buttons = screen.getAllByRole("button");

    console.log(buttons);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });
});

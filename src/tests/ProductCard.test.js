import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ProductCard from "../components/ProductCard";

const productDetails = {
  title: "Black Motorbike",
  id: "214",
  price: 569,
  images: ["https://i.dummyjson.com/data/products/91/1.jpg"],
  description:
    "Engine Type:Wet sump, Single Cylinder, Four Stroke, Two Valves, Air Cooled with SOHC (Single Over Head Cam) Chain Drive Bore & Stroke:47.0 x 49.5 MM",
};

describe("Product cards", () => {
  it("Renders the card of the product", () => {
    const { container } = render(<ProductCard product={productDetails} />);
    expect(container).toMatchSnapshot();
  });
});

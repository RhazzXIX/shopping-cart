import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Cart from "../components/Cart";

const user = userEvent.setup();

const products = [];

const delProd = () => {
  products.pop();
};

const product = {
  title: "Black Motorbike",
  id: "214",
  price: 569,
  images: ["https://i.dummyjson.com/data/products/91/1.jpg"],
  qty: 2,
  description:
    "Engine Type:Wet sump, Single Cylinder, Four Stroke, Two Valves, Air Cooled with SOHC (Single Over Head Cam) Chain Drive Bore & Stroke:47.0 x 49.5 MM",
};

describe("Cart component", () => {
  beforeEach(() => products.push(product));
  it("Gets rendered", () => {
    const { container } = render(<Cart products={products} />);

    expect(container).toMatchSnapshot();
  });

  it("Can delete products", async () => {
    const { rerender } = render(
      <Cart products={products} deleteProduct={delProd} />
    );
    const delBtn = screen.getByRole("button");
    expect(screen.getByRole("listitem")).toBeInTheDocument();

    await user.click(delBtn);
    rerender(<Cart products={products} deleteProduct={delProd} />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
  afterEach(() => products.pop());
});

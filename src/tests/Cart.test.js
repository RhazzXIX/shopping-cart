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

const product2 = {
  title: "iPhone X",
  id: "456",
  price: 899,
  images: ["https://i.dummyjson.com/data/products/2/1.jpg"],
  qty: 1,
  description:
    "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip",
};

describe("Cart component", () => {
  beforeEach(() => products.push(product));
  it("Gets rendered", () => {
    const { container } = render(<Cart products={[]} />);

    expect(container).toMatchSnapshot();
  });

  it(`Shows items, added to the cart`, () => {
    const { rerender } = render(<Cart products={[]} deleteProduct={delProd} />);
    expect(screen.getByText("No items on the cart")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    rerender(<Cart products={products} deleteProduct={delProd} />);
    expect(screen.queryByText("No items on the cart")).not.toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Black Motorbike" })
    ).toBeInTheDocument();
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

  it("Shows the total cost of all the products", () => {
    const { rerender } = render(
      <Cart products={products} deleteProduct={delProd} />
    );
    expect(
      screen.queryByRole("heading", { name: /total/i }).textContent
    ).toMatch("Total Cost: $ 1138.00");

    const addedProducts = [...products, product2];
    rerender(<Cart products={addedProducts} deleteProduct={delProd} />);
    expect(
      screen.queryByRole("heading", { name: /total/i }).textContent
    ).toMatch("Total Cost: $ 2037.00");
  });

  afterEach(() => products.splice(0));
});

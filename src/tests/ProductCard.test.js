import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ProductCard from "../components/ProductCard";

const product = {
  title: "Black Motorbike",
  id: '214',
  price: 569,
  images: ["https://i.dummyjson.com/data/products/91/1.jpg"],
  description:
    "Engine Type:Wet sump, Single Cylinder, Four Stroke, Two Valves, Air Cooled with SOHC (Single Over Head Cam) Chain Drive Bore & Stroke:47.0 x 49.5 MM",
};


const addItemToCart = jest.fn()

const user = userEvent.setup()

describe("ProductCard component", () => {
  it("Renders the card of the product", () => {
    const {container} = render(<ProductCard product={product} />);
    
    expect(container).toMatchSnapshot();
  });

  describe('User interaction', () => {
    it('Receive item quantity user input', async() => {
      render(<ProductCard product={product} />)
      const input = screen.getByRole('textbox')
      await user.type(input, '5');
      expect(input.value).toBe('5')
    })

    it('Increment item quantity on user button click', async () => {
      render(<ProductCard product={product} />)
      const input = screen.getByRole('textbox')
      const incrementBtn = screen.getByRole('button',{
        name: '+',
      })
      await user.type(input, '5');
      await user.click(incrementBtn)
      expect(input.value).toBe('6')
    })

    it('Decrement item quantity on user button click', async () => {
      render(<ProductCard product={product} />)
      const input = screen.getByRole('textbox')
      const decrementBtn = screen.getByRole('button',{
        name: '-',
      })
      await user.type(input, '5');
      await user.click(decrementBtn)
      expect(input.value).toBe('4')
    })

    it('Shows user the updated total cost of the product', async() => {
      render(<ProductCard product={product} />)
      const quantity = 2
      const [price, totalCost] = screen.getAllByText(/\D00$/i)
      const input = screen.getByRole('textbox')
      await user.type(input, quantity.toString());
      expect(totalCost.textContent).toBe(`$ ${product.price * quantity}.00`)
    })

    it('User can add Item to Cart', async () => {
      render(<ProductCard product={product} addItem={addItemToCart} />);
      const addCartBtn = screen.getByRole('button',{
      name: 'Add to Cart',
      })
      const incrementBtn = screen.getByRole('button',{
        name: '+',
      })
      await user.click(incrementBtn)
      await user.click(addCartBtn)
      expect(addItemToCart).toHaveBeenCalled()
      expect(addItemToCart).toHaveBeenCalledWith('214', 1)
    })
  })
});

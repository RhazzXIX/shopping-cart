import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ShopPage from "../components/ShopPage";

const user = userEvent.setup();

describe("ShopPage component", () => {
  it("renders the component", () => {
    const { container } = render(<ShopPage />);
    expect(container).toMatchSnapshot();
  });

  describe("Category section", () => {
    it("renders fetched category", async () => {
      render(<ShopPage />);
      expect(screen.queryByRole("button", { name: "Smartphones" })).toBeNull();
      const button = await screen.findByRole("button", { name: "Smartphones" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Product Section", () => {
    it("renders the fetched products", async () => {
      render(<ShopPage />);
      const productDetailButtons = await screen.findAllByRole("button", {
        name: "Add to Cart",
      });
      expect(productDetailButtons).toHaveLength(5);
    });

    it("renders the right product section when the user click in a category", async () => {
      render(<ShopPage />);
      const productSection = screen.getByRole("heading", {
        name: "Smartphones",
      });
      const button = screen.getByRole("button", { name: "All Items" });
      await user.click(button);
      expect(productSection.textContent).toMatch("All Items");
    });

    it(`let's the user shuffle between categories`, async () => {
      render(<ShopPage />);
      const smartphoneBTN = await screen.findByRole("button", {
        name: "Smartphones",
      });
      const womenShoesBtn = await screen.findByRole("button", {
        name: "Womens shoes",
      });
      let iPhone9 = await screen.findByRole("heading", {
        name: "iPhone 9",
        level: 4,
      });
      let productDetailButtons = await screen.findAllByRole("button", {
        name: "Add to Cart",
      });
      expect(productDetailButtons).toHaveLength(5);
      expect(iPhone9).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", {
          name: "Sneaker shoes",
          level: 4,
        })
      ).not.toBeInTheDocument();

      await user.click(womenShoesBtn);

      await waitForElementToBeRemoved(
        screen.queryByRole("heading", {
          name: "iPhone 9",
          level: 4,
        })
      ).then(async () => {
        productDetailButtons = await screen.findAllByRole("button", {
          name: "Add to Cart",
        });
        expect(iPhone9).not.toBeInTheDocument();
        expect(productDetailButtons).toHaveLength(5);
        expect(
          screen.getByRole("heading", {
            name: "Sneaker shoes",
            level: 4,
          })
        ).toBeInTheDocument();
      });

      await user.click(smartphoneBTN);

      await waitForElementToBeRemoved(
        screen.queryByRole("heading", {
          name: "Sneaker shoes",
          level: 4,
        })
      ).then(async () => {
        productDetailButtons = await screen.findAllByRole("button", {
          name: "Add to Cart",
        });
        expect(productDetailButtons).toHaveLength(5);
        expect(
          screen.getByRole("heading", {
            name: "iPhone 9",
            level: 4,
          })
        ).toBeInTheDocument();
      });
    });

    it(`Let's users see what in the cart`, async () => {
      render(<ShopPage />);
      const cartBtn = screen.getByRole("button", { name: "Cart" });

      expect(
        screen.queryByRole("heading", { name: "Cart" })
      ).not.toBeInTheDocument();

      await user.click(cartBtn);

      expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();
    });

    it(`Let's the user close the cart by clicking anywhere on the Shop page`, async () => {
      render(<ShopPage />);
      const cartBtn = screen.getByRole("button", { name: "Cart" });
      const shopPage = screen.getByRole("main");
      await user.click(cartBtn);
      expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();
      await user.click(shopPage);
      expect(
        screen.queryByRole("heading", { name: "Cart" })
      ).not.toBeInTheDocument();
    });
  });
});

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ShopPage from "../components/ShopPage";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

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
        name: "View Details",
      });
      expect(productDetailButtons).toHaveLength(100);
    });

    it("renders the right product section when the user click in a category", async () => {
      render(<ShopPage />);
      const productSection = screen.getByRole("heading", {
        name: "All Items",
      });
      expect(productSection.textContent).toMatch("All Items");
      const button = await screen.findByRole("button", { name: "Smartphones" });
      expect(button).toBeInTheDocument();
      await user.click(button);
      expect(productSection.textContent).toMatch("Smartphones");
    });
    it(`let's the user shuffle between categories`, async () => {
      render(<ShopPage />);
      const allItemsBtn = screen.getByRole("button", { name: "All Items" });
      const smartphoneBTN = await screen.findByRole("button", {
        name: "Smartphones",
      });
      const womenShoesBtn = await screen.findByRole("button", {
        name: "Womens shoes",
      });
      let treeOIl = await screen.findByRole("heading", {
        name: "Tree Oil 30ml",
        level: 4,
      });
      let keyHolder = await screen.findByRole("heading", {
        name: "Key Holder",
        level: 4,
      });
      let sneakerShoes = await screen.findByRole("heading", {
        name: "Sneaker shoes",
        level: 4,
      });
      let productDetailButtons = await screen.findAllByRole("button", {
        name: "View Details",
      });
      expect(productDetailButtons).toHaveLength(100);
      expect(treeOIl).toBeInTheDocument();
      expect(keyHolder).toBeInTheDocument();
      expect(sneakerShoes).toBeInTheDocument();
      await user.click(smartphoneBTN);
      await waitForElementToBeRemoved(
        screen.queryByRole("heading", { name: "Tree Oil 30ml", level: 4 })
      ).then(async () => {
        productDetailButtons = await screen.findAllByRole("button", {
          name: "View Details",
        });
        expect(treeOIl).not.toBeInTheDocument();
        expect(keyHolder).not.toBeInTheDocument();
        expect(sneakerShoes).not.toBeInTheDocument();
        expect(productDetailButtons).toHaveLength(5);
      });
      await user.click(womenShoesBtn);
      sneakerShoes = await screen.findByRole("heading", {
        name: "Sneaker shoes",
        level: 4,
      });
      expect(sneakerShoes).toBeInTheDocument();
      expect(treeOIl).not.toBeInTheDocument();
      expect(keyHolder).not.toBeInTheDocument();
      await user.click(allItemsBtn);
      keyHolder = await screen.findByRole("heading", {
        name: "Key Holder",
        level: 4,
      });
      treeOIl = await screen.findByRole("heading", {
        name: "Tree Oil 30ml",
        level: 4,
      });
      productDetailButtons = await screen.findAllByRole("button", {
        name: "View Details",
      });
      expect(keyHolder).toBeInTheDocument();
      expect(treeOIl).toBeInTheDocument();
      expect(sneakerShoes).toBeInTheDocument();
      expect(productDetailButtons).toHaveLength(100);
    });
  });
});

import uniqid from "uniqid";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../styles/ShopPage.css";
import cartImg from "../images/cart.svg";

const modifyCategoryNames = (string) => {
  return string
    .slice(0, 1)
    .toUpperCase()
    .concat(string.slice(1))
    .split("-")
    .join(" ");
};

const ShopPage = () => {
  const [categories, setCategories] = useState([]);
  const [showAllItems, setShowAllItems] = useState(true);
  const [products, setProducts] = useState([]);
  const [categoryNeeded, setCategoryNeeded] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const getAllItems = (e) => {
    setShowAllItems(true);
  };

  const getCategories = async () => {
    const fetchedCategories = [];
    const data = await fetch("https://dummyjson.com/products/categories").then(
      (res) => res.json()
    );
    data.forEach((category) => {
      const fetchedCategory = {
        name: category,
        id: uniqid(),
      };
      fetchedCategories.push(fetchedCategory);
    });
    setCategories(fetchedCategories);
  };

  const setCategory = (e) => {
    const [neededCategory] = categories.filter(
      (category) => category.id === e.target.dataset.id
    );
    setCategoryNeeded(neededCategory.name);
    setShowAllItems(false);
  };

  const getProducts = async () => {
    let url = `https://dummyjson.com/products/category/${categoryNeeded}`;
    if (showAllItems) url = "https://dummyjson.com/products?limit=0";
    const data = await fetch(url).then((res) => res.json());
    setProducts(data.products);
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [categoryNeeded, showAllItems]);

  return (
    <main id="shop">
      <section id="sidebar">
        <h3>Categories</h3>
        <ul>
          <li>
            <button onClick={getAllItems}>All Items</button>
          </li>
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <button onClick={setCategory} data-id={category.id}>
                  {modifyCategoryNames(category.name)}
                </button>
              </li>
            );
          })}
        </ul>
        <div id="e-com">
          <p>E-commerce data is powered by:</p>
          <a href="https://dummyjson.com/">DummyJSON </a>
        </div>
      </section>
      <section id="items">
        <header>
          <h2>
            {showAllItems ? "All Items" : modifyCategoryNames(categoryNeeded)}
          </h2>
          <button id="cart">
            <img src={cartImg} alt="Cart" />
            {cartItems.length !== 0 && <p>{cartItems.length}</p>}
          </button>
        </header>
        <div className="productContainer">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ShopPage;

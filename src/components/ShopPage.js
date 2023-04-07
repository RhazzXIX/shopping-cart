import uniqid from "uniqid";
import { useState, useEffect } from "react";
import "../styles/ShopPage.css";
import cartImg from "../images/cart.svg";
import ProductCard from "./ProductCard";
import Cart from "./Cart";

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
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([
    // {
    //   title: "Black Motorbike",
    //   id: "214",
    //   price: 569,
    //   images: ["https://i.dummyjson.com/data/products/91/1.jpg"],
    //   qty: 2,
    //   description:
    //     "Engine Type:Wet sump, Single Cylinder, Four Stroke, Two Valves, Air Cooled with SOHC (Single Over Head Cam) Chain Drive Bore & Stroke:47.0 x 49.5 MM",
    // },
    // {
    //   title: "Black Motorbike",
    //   id: "21321",
    //   price: 569,
    //   images: ["https://i.dummyjson.com/data/products/91/1.jpg"],
    //   qty: 2,
    //   description:
    //     "Engine Type:Wet sump, Single Cylinder, Four Stroke, Two Valves, Air Cooled with SOHC (Single Over Head Cam) Chain Drive Bore & Stroke:47.0 x 49.5 MM",
    // },
  ]);

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

  const toggleCart = (e) => {
    if (showCart) setShowCart(false)
    setShowCart(true)
  }

  const closeCart = (e) => {
    const cart = document.querySelector('section#cart-page')
    if (!cart) return
    if (e.target === cart) return
    if (e.target.parentNode === cart) return
    if (e.target.parentNode.parentNode === cart) return
    if (e.target.parentNode.parentNode.parentNode === cart) return
    if (e.target.parentNode.parentNode.parentNode.parentNode === cart) return
    setShowCart(false)
  }

  const addToCart = (product) => {
    const alreadyInCart = cartItems.filter(item => item.id === product.id)
    if (alreadyInCart.length) {setCartItems(cartItems.map(item => {
        if (item.id !== product.id) {
          return item
        } else {
          return {...item, qty: item.qty + product.qty}
        }
      }))
      return
    }
    setCartItems(cartItems.concat(product))
  }

  const removeFromCart = (e) => {
    const productId = Number(e.target.dataset.id)
    setCartItems(
      cartItems.filter(item => {
        return item.id !== productId
      })
    )
  }

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [categoryNeeded, showAllItems]);

  return (
    <main id="shop" onClick={closeCart}>
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
          <button id="cart" aria-label="Cart" onClick={toggleCart}>
            <img src={cartImg} alt="Cart" />
            {cartItems.length !== 0 && <p>{cartItems.length}</p>}
          </button>
          {showCart && <Cart products={cartItems} deleteProduct={removeFromCart}/>}
        </header>
        <div className="productContainer">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} addItem={addToCart}/>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ShopPage;

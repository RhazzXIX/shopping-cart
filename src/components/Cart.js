import { useEffect, useState } from "react";
import del from "../images/del.svg";
import "../styles/Cart.css";

const Cart = (props) => {
  const { products, deleteProduct } = props;
  const [totalCost, setTotalCost] = useState(0);
  const getTotalCost = () => {
    let addedCost = 0;
    products.forEach((product) => {
      const productCost = product.price * product.qty;
      addedCost += productCost;
    });
    setTotalCost(addedCost);
  };

  useEffect(() => {
    getTotalCost();
  }, [products]);

  return (
    <section id="cart-page">
      <header>
        <h4>Cart</h4>
        <h5>Items:</h5>
        <h5>Costs:</h5>
      </header>
      {products.length !== 0 ? (
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <h4>{product.title}</h4>
                <img src={product.images[0]} alt={product.title} />
                <p>
                  $ {product.price}.00 x {product.qty}
                </p>
                <p>$ {product.price * product.qty}.00</p>
                <button onClick={deleteProduct}>
                  <img src={del} alt="delete" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No items on the cart</p>
      )}
      <footer>
        <h4>Total Cost: $ {totalCost}.00</h4>
      </footer>
    </section>
  );
};

export default Cart;

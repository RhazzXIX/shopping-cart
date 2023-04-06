import { useState } from "react";
import del from "../images/del.svg";

const Cart = (props) => {
  const { products, deleteProduct } = props;
  const [totalCost, setTotalCost] = useState(0);

  return (
    <section id="cart-page">
      <header>
        <h5>Items:</h5>
        <h5>Costs:</h5>
      </header>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <img src={product.images[0]} alt={product.title} />
              <h6>{product.title}</h6>
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
      <footer>
        <h4>Total Cost: $ {totalCost}.00</h4>
      </footer>
    </section>
  );
};

export default Cart;

import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = (props) => {
  const { itemsAmount } = props;
  return (
    <header id="nav">
      <Link to={""}>
        <button id="home">Home</button>
      </Link>
      <Link to={"shop"}>
        <button id="shop">Shop</button>
      </Link>
      <button id="cart">Cart {itemsAmount !== 0 ? itemsAmount : null}</button>
    </header>
  );
};

export default Header;

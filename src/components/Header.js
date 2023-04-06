import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = (props) => {
  return (
    <header id="nav">
      <Link to={""}>
        <button id="home">Home</button>
      </Link>
      <Link to={"shop"}>
        <button id="shop">Shop</button>
      </Link>
      <Link to={"credits"}>
        <button id="cart">Credits</button>
      </Link>
    </header>
  );
};

export default Header;

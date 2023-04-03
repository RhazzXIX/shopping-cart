import "./styles/App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import gitHub from "./images/github.png";
import { Outlet } from "react-router";

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div id="App">
      <Header itemsAmount={cartItems.length} />
      <Outlet />
      <footer>
        <a href="https://github.com/RhazzXIX">
          <img id="gitHub" src={gitHub} alt="GitHub Profile" />
        </a>
      </footer>
    </div>
  );
}

export default App;

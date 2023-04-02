import "./styles/App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import gitHub from "./images/github.png";
import BG from "./images/shoppingBG.webp";

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div id="App">
      <Header itemsAmount={cartItems.length} />
      <main>
        <h1>Hoarder Digital</h1>
      </main>
      <footer>
        <a href="https://github.com/RhazzXIX">
          <img id="gitHub" src={gitHub} alt="GitHub Profile" />
        </a>
      </footer>
    </div>
  );
}

export default App;

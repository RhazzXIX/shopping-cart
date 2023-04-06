import "./styles/App.css";
import Header from "./components/Header";
import gitHub from "./images/github.png";
import { Outlet } from "react-router";


function App() {
  return (
    <div id="App">
      <Header />
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

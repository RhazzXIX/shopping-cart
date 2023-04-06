import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

test("renders the App", () => {
  const { container } = render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

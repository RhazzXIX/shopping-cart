import { render } from "@testing-library/react";
import Home from "../components/Home";

test("renders the home component", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});

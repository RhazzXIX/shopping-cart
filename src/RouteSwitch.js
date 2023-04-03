import { element } from "prop-types";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Product from "./components/Product";

const router = createBrowserRouter([
  {
    path: "shopping-cart",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

const RouteSwitch = <RouterProvider router={router} />;

export default RouteSwitch;

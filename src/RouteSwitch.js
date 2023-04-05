import { element } from "prop-types";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Product from "./components/Product";
import ShopPage from "./components/ShopPage";

const router = createBrowserRouter([
  {
    path: "shopping-cart",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
    ],
  },
]);

const RouteSwitch = <RouterProvider router={router} />;

export default RouteSwitch;

import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/shop'
  }
]);

const RouteSwitch = <RouterProvider router={router} />;

export default RouteSwitch;

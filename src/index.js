import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import Index from "./routes/index";
import ErrorPage from "./routes/error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Pokemon } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "/pokemon/:pokemonId",
            element: <Pokemon />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

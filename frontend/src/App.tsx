import React from "react";
import Datatable from "./components/Datatable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { Container } from "@mui/material";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;

import React from "react";
import Datatable from "./components/Datatable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { Container } from "@mui/material";
import RegisterForm from "./pages/RegisterForm";
import Navbar from "./components/Navbar";
import UpdateForm from "./pages/UpdateForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <RegisterForm />,
    },
    {
      path: "/:id",
      element: <UpdateForm />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

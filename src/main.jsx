import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCoffee from "./components/CreateCoffee.jsx";
import UpdateCoffee from "./components/UpdateCoffee.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import SignUp from "./components/SignUp.jsx";
import Users from "./components/Users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    loader: () => fetch("https://coffeestoreserver.vercel.app/coffees")
  },
  {
    path: "/create-coffee",
    element: <CreateCoffee></CreateCoffee>
  },
  {
    path: "/update-coffee/:id",
    element: <UpdateCoffee></UpdateCoffee>,
    loader: ({ params }) => fetch(`https://coffeestoreserver.vercel.app/coffee/${params.id}`)
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>
  },
  {
    path: "/users",
    element: <Users></Users>,
    loader: () => fetch("https://coffeestoreserver.vercel.app/user")
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

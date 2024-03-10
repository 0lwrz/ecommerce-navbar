import { Children, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, Form, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/components/Home";
import Root from "./Routes/Root";
import Products from "./Pages/Products/components/Products";
import Categories from "./Pages/Categories/components/Categories";
import Cart from "./Pages/Cart/components/Cart";
import SignIn from "./Pages/Sign-in/components/SignIn";
import Signup from "./Pages/Register/components/Signup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/category/:id",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

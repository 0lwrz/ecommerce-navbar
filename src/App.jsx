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
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import UserContextProvider from "./context/User";
import NotFound from "./Pages/NotFound/NotFound";
import Profile from "./Pages/Profile/Profile";
import CategoryProducts from "./Pages/CategoryProducts/CategoryProducts";
import SendCode from "./Pages/ForgotPassword/SendCode";
import ProductsDetails from "./Pages/ProductsDetails/ProductsDetails";


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
        path: "/products",
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
      {
        path:"/categories/:id",
        element:<CategoryProducts/>
      },
      {
       path:"/products/:id",
       element:<ProductsDetails/>,
      },
      {
        path:"/Forget-Password",
        element:<ForgotPassword/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/sendcode",
        element:<SendCode/>
      },
      {
        path:'*',
        element:<NotFound/>
      },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
      <RouterProvider router={router} />
      </UserContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;

import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Rigister from "../pages/auth/register/Rigister";
import Home from "../pages/home/Home";
import Login from "../pages/auth/login/Login";

const route = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Rigister,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);

export default route;

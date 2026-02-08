import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router";
import route from "./routes/Route.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={route}></RouterProvider>
      <ToastContainer position="top-right" />
    </AuthProvider>
  </StrictMode>,
);

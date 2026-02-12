import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router";
import route from "./routes/Route.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//tanStack query -------------
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={route}></RouterProvider>
        <ToastContainer position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

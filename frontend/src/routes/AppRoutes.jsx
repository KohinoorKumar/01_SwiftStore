import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "../app/layout/AppLayout";
import ErrorPage from "../features/products/ui/pages/ErrorPage";
import ProductsPage from "../features/products/ui/pages/ProductsPage";
import ProductDetailsPage from "../features/products/ui/pages/ProductDetailsPage";
import DashboardPage from "../features/products/ui/pages/DashboardPage";
import CreateProductPage from "../features/products/ui/pages/CreateProductPage";
import EditProductPage from "../features/products/ui/pages/EditProductPage";
import MainProtected from "./ProtectedRoutes/MainProtected";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;

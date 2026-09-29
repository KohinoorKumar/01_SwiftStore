import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import AppLayout from '../app/layout/AppLayout';
import ProductsPage from '../features/products/ui/pages/ProductsPage'
import ProductDetailsPage from '../features/products/ui/pages/ProductDetailsPage'
import AuthLayout from '../app/layout/AuthLayout'
import LoginPage from '../features/auth/ui/pages/LoginPage'
import RegisterPage from '../features/auth/ui/pages/RegisterPage'
import PublicProtected from './ProtectedRoutes/PublicProtected'
import DashboardPage from '../features/products/ui/pages/DashboardPage';
import MainProtected from './ProtectedRoutes/MainProtected'
import CreateProductPage from '../features/products/ui/pages/CreateProductPage';
import EditProductPage from '../features/products/ui/pages/EditProductPage';
import { hydrateUserApi } from '../features/auth/api/authApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addUser } from '../features/auth/state/authSlice';
import useInitializeAuth from '../features/auth/hooks/useInitializeAuth';


const AppRoutes = () => {

  useInitializeAuth();


  const router = createBrowserRouter([
  // =========================
  // PUBLIC + MAIN APPLICATION
  // =========================
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ProductsPage/>
      },

      {
        path: "/products",
        element: <ProductsPage />,
      },

      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },

      // Protected routes
      {
        element: <MainProtected />,
        children: [
          {
            path: "/main",
            element: <DashboardPage />,
          },

          {
            path: "/products/create",
            element: <CreateProductPage />,
          },

          {
            path: "/products/:id/edit",
            element: <EditProductPage/>,
          },
        ],
      },
    ],
  },

  // =========================
  // AUTH ROUTES
  // =========================
  {
    element: <AuthLayout />,
    children: [
      {
        element: <PublicProtected />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },

          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },

  // =========================
  // FALLBACK
  // =========================
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);


  return <RouterProvider router={router}/>
}

export default AppRoutes
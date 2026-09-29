import React, { useState } from "react";
import { Link } from "react-router";

import {
  useMyProducts,
  useDeleteProduct,
} from "../../hooks/useProductsHook";

import DashboardProductCard from "../components/DashboardProductCard";

const DashboardPage = () => {
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useMyProducts();

  const deleteProduct = useDeleteProduct();

  const [productToDelete, setProductToDelete] = useState(null);

  const products = data?.products || [];

  const totalValue = products.reduce(
    (total, product) =>
      total + Number(product.price?.amount || 0),
    0
  );

  const handleDelete = () => {
    if (!productToDelete) return;

    deleteProduct.mutate(productToDelete._id, {
      onSuccess: () => {
        setProductToDelete(null);
      },
    });
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your products from one place.
          </p>
        </div>

        <Link
          to="/products/create"
          className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          + Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Total Products
          </p>

          <p className="mt-2 text-3xl font-bold">
            {products.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Total Value
          </p>

          <p className="mt-2 text-3xl font-bold">
            ₹{totalValue.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Recently Added
          </p>

          <p className="mt-2 text-3xl font-bold">
            {products.length > 0 ? 1 : 0}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">
              My Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Products you have created.
            </p>
          </div>

          <Link
            to="/products/create"
            className="text-sm font-semibold text-gray-700 hover:text-black"
          >
            Add Product
          </Link>
        </div>

        {/* Loading */}
        {isPending && (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading your products...
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="p-10 text-center">
            <p className="text-sm text-red-500">
              {error?.response?.data?.message ||
                "Failed to load your products."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!isPending &&
          !isError &&
          products.length === 0 && (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                📦
              </div>

              <h3 className="mt-4 text-base font-semibold">
                No products yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-gray-500">
                You haven't created any products yet. Start by
                adding your first product.
              </p>

              <Link
                to="/products/create"
                className="mt-5 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Create Product
              </Link>
            </div>
          )}

        {/* Product list */}
        {!isPending &&
          !isError &&
          products.length > 0 && (
            <div className="divide-y divide-gray-200">
              {products.map((product) => (
                <DashboardProductCard
                  key={product._id}
                  product={product}
                  onDelete={setProductToDelete}
                  isDeleting={
                    deleteProduct.isPending &&
                    deleteProduct.variables === product._id
                  }
                />
              ))}
            </div>
          )}
      </div>

      {/* Delete Confirmation */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">
              Delete Product?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {productToDelete.title}
              </span>
              ? This action cannot be undone.
            </p>

            {deleteProduct.isError && (
              <p className="mt-4 text-sm text-red-500">
                {deleteProduct.error?.response?.data?.message ||
                  "Failed to delete product."}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={deleteProduct.isPending}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteProduct.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteProduct.isPending
                  ? "Deleting..."
                  : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
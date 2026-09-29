import React from "react";
import ProductCard from "../components/ProductCard";
import { useAllProducts } from "../../hooks/useProductsHook";

const ProductsPage = () => {
  const {
    data,
    isPending,
    error,
    refetch,
  } = useAllProducts();

  const products = data || [];

  // console.log(products)

  // Loading
  if (isPending) {
    return (
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Products
        </h1>

        <div className="flex min-h-60 items-center justify-center">
          <p className="text-gray-500">
            Loading products...
          </p>
        </div>
      </section>
    );
  }

  // API Error
  if (error) {
    return (
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Products
        </h1>

        <div className="flex min-h-60 flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold">
            Something went wrong
          </h2>

          <p className="mt-2 text-gray-500">
            {error?.message || "Failed to load products."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Database is empty
  if (products.length === 0) {
    return (
      <section>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Products
          </h1>

          <p className="mt-2 text-gray-500">
            Explore all available products.
          </p>
        </div>

        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 text-center">
          <div className="text-5xl">📦</div>

          <h2 className="mt-4 text-xl font-semibold">
            No Products Available
          </h2>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            There are currently no products in the database.
            Please check back later.
          </p>
        </div>
      </section>
    );
  }

  // Products exist
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Products
        </h1>

        <p className="mt-2 text-gray-500">
          Explore all available products.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
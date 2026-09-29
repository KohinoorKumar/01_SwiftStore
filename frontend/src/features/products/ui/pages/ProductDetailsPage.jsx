import React, { useState } from "react";
import { Link, useParams } from "react-router";

import { useProduct } from "../../hooks/useProductsHook";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useProduct(id);

  const [selectedImage, setSelectedImage] = useState(0);

  const product = data?.product || data;

  /* ---------------- Loading ---------------- */

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl">
        <div className="animate-pulse">
          <div className="mb-8 h-5 w-32 rounded bg-gray-200" />

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Image Skeleton */}
            <div>
              <div className="aspect-square rounded-2xl bg-gray-200" />

              <div className="mt-4 grid grid-cols-5 gap-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg bg-gray-200"
                  />
                ))}
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="h-8 w-3/4 rounded bg-gray-200" />
              <div className="h-5 w-1/4 rounded bg-gray-200" />

              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
              </div>

              <div className="h-32 rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Error ---------------- */

  if (isError) {
    return (
      <section className="mx-auto max-w-2xl py-20 text-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Product not found
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {error?.response?.data?.message ||
              error?.message ||
              "Something went wrong while loading the product."}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  /* ---------------- Product not found ---------------- */

  if (!product) {
    return (
      <section className="mx-auto max-w-2xl py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Product not found
        </h1>

        <p className="mt-2 text-gray-500">
          The product you're looking for does not exist.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Back to Products
        </Link>
      </section>
    );
  }

  const images = product.images || [];

  const price = product.price?.amount ?? 0;
  const currency = product.price?.currency || "INR";

  const currencySymbol = currency === "USD" ? "$" : "₹";

  const totalStock = (product.sizes || []).reduce(
    (total, item) => total + Number(item.stock || 0),
    0
  );

  const isOutOfStock = totalStock === 0;

  return (
    <section className="mx-auto max-w-6xl">
      {/* Back Button */}

      <Link
        to="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
      >
        ← Back to Products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* =====================================================
            LEFT — IMAGES
        ====================================================== */}

        <div>
          {/* Main Image */}

          <div className="aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            {images.length > 0 ? (
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          {/* Image Thumbnails */}

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition ${
                    selectedImage === index
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =====================================================
            RIGHT — PRODUCT INFORMATION
        ====================================================== */}

        <div>
          {/* Title */}

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.title}
          </h1>

          {/* Price */}

          <div className="mt-5">
            <span className="text-3xl font-bold text-gray-900">
              {currencySymbol}
              {Number(price).toLocaleString()}
            </span>

            <span className="ml-2 text-sm text-gray-500">
              {currency}
            </span>
          </div>

          {/* Description */}

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Description
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              {product.description}
            </p>
          </div>

          {/* Stock */}

          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">
                Availability
              </h2>

              <span
                className={`text-sm font-semibold ${
                  isOutOfStock
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {totalStock} units available
            </p>
          </div>

          {/* Sizes */}

          {product.sizes?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                Sizes & Stock
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {product.sizes.map((item) => {
                  const outOfStock = Number(item.stock) === 0;

                  return (
                    <div
                      key={item.size}
                      className={`rounded-lg border p-4 ${
                        outOfStock
                          ? "border-gray-200 bg-gray-50"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">
                          {item.size}
                        </span>

                        <span
                          className={`text-xs font-medium ${
                            outOfStock
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {outOfStock
                            ? "Out"
                            : `${item.stock} left`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Product Meta */}

          <div className="mt-8 border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">Product ID</dt>
                <dd className="mt-1 truncate font-medium text-gray-900">
                  {product._id}
                </dd>
              </div>

              <div>
                <dt className="text-gray-500">Available Sizes</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {product.sizes?.length || 0}
                </dd>
              </div>
            </dl>
          </div>

          {/* Action */}

          <div className="mt-8">
            <Link
              to="/products"
              className="block w-full rounded-lg bg-black px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
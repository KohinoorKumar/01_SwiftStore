import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  // 1. Extract the first image securely since your schema stores them as an array string list
  const displayImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <Link
      to={`/products/${product._id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        {displayImage ? (
          <img
            src={displayImage} //  FIXED: Point to displayImage array reference
            alt={product.title} //  FIXED: Changed name to title
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-5">
        {/* Category */}
        {product.category && (
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {product.category}
          </p>
        )}

        {/* Product Title */}
        <h2 className="mt-2 truncate text-lg font-semibold text-gray-900">
          {product.title} {/*  FIXED: Changed name to title to match DB schema */}
        </h2>

        {/* Description */}
        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="mt-4">
          <p className="text-lg font-bold text-gray-900">
            {/*  FIXED: Explicitly reference the currency prefix and amount value properties separately */}
            {product.price?.currency === "INR" ? "₹" : "\$"}
            {product.price?.amount}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

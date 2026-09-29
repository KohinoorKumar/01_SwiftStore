import React from "react";
import { Link } from "react-router";

const DashboardProductCard = ({
  product,
  onDelete,
  isDeleting,
}) => {
    
  const image = product.images?.[0];

  return (
    <div className="flex flex-col gap-5 p-6 sm:flex-row">
      {/* Image */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Information */}
      <div className="min-w-0 flex-1">
        <Link
          to={`/products/${product._id}`}
          className="text-lg font-semibold text-gray-900 hover:underline"
        >
          {product.title}
        </Link>

        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <span className="font-semibold text-gray-900">
            {product.price?.currency === "USD" ? "$" : "₹"}
            {product.price?.amount}
          </span>

          <span className="text-gray-500">
            {product.sizes?.length || 0} sizes
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          to={`/products/${product._id}/edit`}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={() => onDelete(product)}
          disabled={isDeleting}
          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DashboardProductCard;
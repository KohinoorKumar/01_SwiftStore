import React from "react";

const ProductBasicInfo = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Product Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter the basic information about your product.
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Title
        </label>

        <input
          type="text"
          {...register("title", {
            required: "Product title is required",
            minLength: {
              value: 2,
              message: "Title must contain at least 2 characters",
            },
            maxLength: {
              value: 100,
              message: "Title cannot exceed 100 characters",
            },
          })}
          placeholder="Enter product title"
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          rows={5}
          {...register("description", {
            required: "Product description is required",
            minLength: {
              value: 20,
              message:
                "Description must contain at least 20 characters",
            },
            maxLength: {
              value: 200,
              message:
                "Description cannot exceed 200 characters",
            },
          })}
          placeholder="Describe your product..."
          className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductBasicInfo;
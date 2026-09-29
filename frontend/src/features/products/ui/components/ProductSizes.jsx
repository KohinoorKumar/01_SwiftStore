import React from "react";
import { useFieldArray } from "react-hook-form";

const ProductSizes = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const addSize = () => {
    append({
      size: "M",
      stock: 0,
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Sizes & Stock
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Configure available sizes and their stock.
          </p>
        </div>

        <button
          type="button"
          onClick={addSize}
          className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          + Add Size
        </button>
      </div>

      {/* Size Fields */}
      <div className="mt-4 space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-end gap-3 rounded-lg border border-gray-200 p-4"
          >
            {/* Size */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>

              <select
                {...register(`sizes.${index}.size`, {
                  required: "Size is required",
                })}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>

              {errors.sizes?.[index]?.size && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.sizes[index].size.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>

              <input
                type="number"
                min="0"
                {...register(`sizes.${index}.stock`, {
                  required: "Stock is required",
                  min: {
                    value: 0,
                    message: "Stock cannot be negative",
                  },
                  valueAsNumber: true,
                })}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />

              {errors.sizes?.[index]?.stock && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.sizes[index].stock.message}
                </p>
              )}
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              className="rounded-lg border border-red-200 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSizes;


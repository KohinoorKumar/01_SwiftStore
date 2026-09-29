import React from "react";

const ProductPricing = ({ register, errors }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Pricing
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>

          <input
            type="number"
            step="0.01"
            {...register("amount", {
              required: "Price is required",
              min: {
                value: 0,
                message: "Price cannot be negative",
              },
              valueAsNumber: true,
            })}
            placeholder="999"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
          />

          {errors.amount && (
            <p className="mt-1 text-sm text-red-500">
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Currency
          </label>

          <select
            {...register("currency", {
              required: "Currency is required",
            })}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>

          {errors.currency && (
            <p className="mt-1 text-sm text-red-500">
              {errors.currency.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;
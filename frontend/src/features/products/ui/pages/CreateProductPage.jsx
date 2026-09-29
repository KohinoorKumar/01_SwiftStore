import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";


import { useCreateProduct } from "../../hooks/useProductsHook";
import ProductBasicInfo from "../components/ProductBasicInfo";
import ProductImageUpload from "../components/ProductImageUpload";
import ProductPricing from "../components/ProductPricing";
import ProductSizes from "../components/ProductSizes";



const CreateProductPage = () => {
  const navigate = useNavigate();

  const createProduct = useCreateProduct();

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      images: [],
      amount: "",
      currency: "INR",
      sizes: [
        {
          size: "S",
          stock: 0,
        },
      ],
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    // Basic information
    formData.append("title", data.title);
    formData.append("description", data.description);

    // Price
    formData.append(
      "price",
      JSON.stringify({
        amount: Number(data.amount),
        currency: data.currency,
      })
    );

    // Sizes
    formData.append(
      "sizes",
      JSON.stringify(
        data.sizes.map((item) => ({
          size: item.size,
          stock: Number(item.stock),
        }))
      )
    );

    // Images
    Array.from(data.images || []).forEach((file) => {
      formData.append("images", file);
    });

    createProduct.mutate(formData, {
      onSuccess: () => {
        navigate("/main");
      },
    });
  };

  return (
    <section className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/main"
          className="text-sm font-medium text-gray-500 hover:text-black"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Create Product
        </h1>

        <p className="mt-2 text-gray-500">
          Add a new product to your collection.
        </p>
      </div>

      {/* Mutation Error */}
      {createProduct.isError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {createProduct.error?.response?.data?.message ||
            createProduct.error?.message ||
            "Failed to create product. Please try again."}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <ProductBasicInfo
            register={register}
            errors={errors}
          />

          <ProductImageUpload
            control={control}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
          />

          <ProductPricing
            register={register}
            errors={errors}
          />

          <ProductSizes
            control={control}
            register={register}
            errors={errors}
          />

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            <Link
              to="/main"
              className="rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={createProduct.isPending}
              className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createProduct.isPending
                ? "Creating Product..."
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateProductPage;
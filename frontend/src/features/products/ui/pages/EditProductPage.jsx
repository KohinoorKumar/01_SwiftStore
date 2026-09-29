import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";

import {
  useProduct,
  useUpdateProduct,
} from "../../hooks/useProductsHook";

import ProductBasicInfo from "../components/ProductBasicInfo";
import ProductPricing from "../components/ProductPricing";
import ProductSizes from "../components/ProductSizes";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageError, setImageError] = useState("");

  const {
    data,
    isPending,
    isError,
    error,
  } = useProduct(id);

  const updateProduct = useUpdateProduct();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
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

  /*
   * Product API response may be:
   *
   * {
   *   product: {...}
   * }
   *
   * or directly:
   *
   * {...}
   *
   * This handles both.
   */
  const product = data?.product || data;

  /*
   * Populate form when product arrives
   */
  useEffect(() => {
    if (!product) return;

    reset({
      title: product.title || "",
      description: product.description || "",
      amount: product.price?.amount ?? "",
      currency: product.price?.currency || "INR",
      sizes:
        product.sizes?.length > 0
          ? product.sizes.map((item) => ({
              size: item.size,
              stock: item.stock,
            }))
          : [
              {
                size: "S",
                stock: 0,
              },
            ],
    });

    setExistingImages(product.images || []);
  }, [product, reset]);

  /*
   * Cleanup object URLs
   */
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [imagePreviews]);

  /*
   * Existing image remove
   */
  const handleRemoveExistingImage = (imageUrl) => {
    setExistingImages((prev) =>
      prev.filter((image) => image !== imageUrl)
    );
  };

  /*
   * New image selection
   */
  const handleNewImages = (event) => {
    const files = Array.from(event.target.files || []);

    setImageError("");

    if (files.length === 0) {
      return;
    }

    /*
     * Check total image count
     */
    const totalImages =
      existingImages.length +
      newImages.length +
      files.length;

    if (totalImages > MAX_IMAGES) {
      setImageError(
        `A product can have a maximum of ${MAX_IMAGES} images.`
      );

      event.target.value = "";
      return;
    }

    /*
     * Check file size
     */
    const oversizedFile = files.find(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (oversizedFile) {
      setImageError(
        `"${oversizedFile.name}" is larger than 1 MB.`
      );

      event.target.value = "";
      return;
    }

    /*
     * Add new files
     */
    setNewImages((prev) => [...prev, ...files]);

    /*
     * Create previews
     */
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImagePreviews((prev) => [...prev, ...previews]);

    /*
     * Reset input so the same file can be selected again
     */
    event.target.value = "";
  };

  /*
   * Remove newly selected image
   */
  const handleRemoveNewImage = (index) => {
    setNewImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index)
    );

    setImagePreviews((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      return prev.filter(
        (_, imageIndex) => imageIndex !== index
      );
    });
  };

  /*
   * Submit
   */
  const onSubmit = (formData) => {
    setImageError("");

    /*
     * At least one image should remain
     */
    if (
      existingImages.length === 0 &&
      newImages.length === 0
    ) {
      setImageError(
        "At least one product image is required."
      );

      return;
    }

    /*
     * Maximum image check
     */
    if (
      existingImages.length + newImages.length >
      MAX_IMAGES
    ) {
      setImageError(
        `A product can have a maximum of ${MAX_IMAGES} images.`
      );

      return;
    }

    const body = new FormData();

    /*
     * Basic information
     */
    body.append("title", formData.title);
    body.append("description", formData.description);

    /*
     * Price
     */
    body.append(
      "price",
      JSON.stringify({
        amount: Number(formData.amount),
        currency: formData.currency,
      })
    );

    /*
     * Sizes
     */
    body.append(
      "sizes",
      JSON.stringify(
        formData.sizes.map((item) => ({
          size: item.size,
          stock: Number(item.stock),
        }))
      )
    );

    /*
     * Existing images that should remain
     */
    body.append(
      "existingImages",
      JSON.stringify(existingImages)
    );

    /*
     * New images
     */
    newImages.forEach((file) => {
      body.append("images", file);
    });

    updateProduct.mutate(
      {
        id,
        formData: body,
      },
      {
        onSuccess: () => {
          navigate(`/products/${id}`);
        },
      }
    );
  };

  /*
   * Loading
   */
  if (isPending) {
    return (
      <section className="mx-auto max-w-4xl">
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-sm text-gray-500">
            Loading product...
          </p>
        </div>
      </section>
    );
  }

  /*
   * Fetch error
   */
  if (isError) {
    return (
      <section className="mx-auto max-w-4xl">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-lg font-semibold text-red-700">
            Failed to load product
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {error?.response?.data?.message ||
              error?.message ||
              "Something went wrong."}
          </p>

          <Link
            to="/main"
            className="mt-5 inline-flex rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>
    );
  }

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
          Edit Product
        </h1>

        <p className="mt-2 text-gray-500">
          Update your product information.
        </p>
      </div>

      {/* Mutation error */}
      {updateProduct.isError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {updateProduct.error?.response?.data?.message ||
            updateProduct.error?.message ||
            "Failed to update product. Please try again."}
        </div>
      )}

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Basic information */}
          <ProductBasicInfo
            register={register}
            errors={errors}
          />

          {/* Existing images */}
          <div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Current Images
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Remove images you no longer want to keep.
              </p>
            </div>

            {existingImages.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {existingImages.map((image, index) => (
                  <div
                    key={image}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200"
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveExistingImage(image)
                      }
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm text-white opacity-0 transition group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                No existing images.
              </div>
            )}
          </div>

          {/* New images */}
          <div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Add New Images
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Maximum 5 images total. Each image must be
                1 MB or smaller.
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImages}
              className="mt-3 block w-full cursor-pointer rounded-lg border border-gray-300 bg-white p-2 text-sm"
            />

            {imageError && (
              <p className="mt-2 text-sm text-red-500">
                {imageError}
              </p>
            )}

            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {imagePreviews.map((image, index) => (
                  <div
                    key={image.url}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200"
                  >
                    <img
                      src={image.url}
                      alt={`New image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveNewImage(index)
                      }
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm text-white opacity-0 transition group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <ProductPricing
            register={register}
            errors={errors}
          />

          {/* Sizes */}
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
              disabled={updateProduct.isPending}
              className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateProduct.isPending
                ? "Updating Product..."
                : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProductPage;
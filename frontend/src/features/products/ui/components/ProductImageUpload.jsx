import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

const ProductImageUpload = ({
  control,
  errors,
  setError,
  clearErrors,
}) => {
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageChange = (event, onChange) => {
    const files = Array.from(event.target.files || []);

    clearErrors("images");

    // No image selected
    if (files.length === 0) {
      onChange([]);

      setImagePreview([]);

      setError("images", {
        type: "required",
        message: "At least one image is required",
      });

      return;
    }

    // Maximum 5 images
    if (files.length > MAX_IMAGES) {
      onChange([]);

      setImagePreview([]);

      setError("images", {
        type: "maxImages",
        message: "You can upload a maximum of 5 images",
      });

      return;
    }

    // Check each image size
    const oversizedFile = files.find(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (oversizedFile) {
      onChange([]);

      setImagePreview([]);

      setError("images", {
        type: "maxFileSize",
        message: `"${oversizedFile.name}" is larger than 1 MB`,
      });

      return;
    }

    // Everything is valid
    onChange(files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImagePreview(previews);
  };

  useEffect(() => {
    return () => {
      imagePreview.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, [imagePreview]);

  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Product Images
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload up to 5 images. Each image must be 1 MB or smaller.
        </p>
      </div>

      <Controller
        name="images"
        control={control}
        rules={{
          validate: (files) =>
            files?.length > 0 ||
            "At least one image is required",
        }}
        render={({ field }) => (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) =>
              handleImageChange(event, field.onChange)
            }
            className="mt-3 block w-full cursor-pointer rounded-lg border border-gray-300 bg-white p-2 text-sm"
          />
        )}
      />

      {errors.images && (
        <p className="mt-1 text-sm text-red-500">
          {errors.images.message}
        </p>
      )}

      {imagePreview.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {imagePreview.map((image, index) => (
            <div
              key={image.url}
              className="aspect-square overflow-hidden rounded-lg border border-gray-200"
            >
              <img
                src={image.url}
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageUpload;
import api from "../../../config/api";

const PRODUCT_URL = "/products";

/* ---------------- GET ALL PRODUCTS ---------------- */

export const getAllProductsApi = async () => {
  const response = await api.get(PRODUCT_URL);

  return response.data;
};

/* ---------------- GET MY PRODUCTS ---------------- */

export const getMyProductsApi = async () => {
  const response = await api.get(`${PRODUCT_URL}/my-products`);

  return response.data;
};

/* ---------------- GET SINGLE PRODUCT ---------------- */

export const getProductApi = async (id) => {
  const response = await api.get(`${PRODUCT_URL}/${id}`);

  return response.data;
};

/* ---------------- CREATE PRODUCT ---------------- */

export const createProductApi = async (formData) => {
  const response = await api.post(PRODUCT_URL, formData);

  console.log(response.data)

  return response.data;
};

/* ---------------- UPDATE PRODUCT ---------------- */

export const updateProductApi = async ({ id, formData }) => {
  const response = await api.put(
    `${PRODUCT_URL}/${id}`,
    formData
  );

  return response.data;
};

/* ---------------- DELETE PRODUCT ---------------- */

export const deleteProductApi = async (id) => {
  const response = await api.delete(
    `${PRODUCT_URL}/${id}`
  );

  return response.data;
};
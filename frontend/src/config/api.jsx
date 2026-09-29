import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Separate instance.
// It does NOT have the access-token/refresh interceptor.
const refreshApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// --------------------------------
// Attach access token
// --------------------------------

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------------------
// Handle expired access token
// --------------------------------

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // No response / not 401
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Don't retry the same request twice
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // IMPORTANT:
      // Use refreshApi, NOT api
      const response = await refreshApi.post(
        "/auth/refresh-token"
      );

      const newAccessToken = response.data.accessToken;

      localStorage.setItem(
        "accessToken",
        newAccessToken
      );

      // Attach new token to original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      // Retry original request
      return api(originalRequest);

    } catch (refreshError) {
      // Refresh token is invalid/expired
      localStorage.removeItem("accessToken");

      return Promise.reject(refreshError);
    }
  }
);

export default api;
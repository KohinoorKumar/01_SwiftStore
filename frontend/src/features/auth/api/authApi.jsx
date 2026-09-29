import api from "../../../config/api"; 

export const registerApi = async(credentials) => {
    try {
        // 2. Call api.post directly (no "useApi")
        const res = await api.post("/auth/register", credentials);
        console.log(res);
        return res.data;
    } catch (error) {
        console.log("register api failed due to some error", error);
        throw error;
    }
};

export const loginUserApi = async(credentials) => {
    try {
        const res = await api.post("/auth/login", credentials);
        if (res.data?.data?.accessToken) {
            localStorage.setItem("accessToken", res.data.data.accessToken);
        }
        return res.data;
    } catch (error) {
        console.log("login api failed due to some error", error);
        throw error;
    }
};


export const hydrateUserApi = async() => {
    try {
        const res = await api.get("/auth/me");
        console.log(res);
        return res.data.data;
    } catch (error) {
        console.log("hydrate api failed due to some error", error);
        throw error;
    }
};

export const refreshTokenApi = async() => {
    const res = await api.post("/auth/refresh-token");
    return res.data;
}

export const logoutApi = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

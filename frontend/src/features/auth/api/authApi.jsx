import {api} from "../../../config/api"


export const registerApi = async(credentials) => {
    try {
        const res = await api.post("/auth/register", credentials)
        return res.data
    } catch (error) {
        console.log("register api failed due to some error", error)
    }
}

export const loginUserApi = async(credentials) => {
    try {
        const res = await api.post("/auth/login", credentials)
        localStorage.setItem("accessToken", res.data.accessToken)
        return res.data

    } catch (error) {
        console.log("login api failed due to some error", error)
    }
}

export const hydrateUserApi = async() => {
    try {
        const token = localStorage.getItem("accessToken")

        const res = await api.get("/auth/me", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        console.log(res)

    } catch (error) {
        console.log("hydrate api failed due to some error", error)
    }
}
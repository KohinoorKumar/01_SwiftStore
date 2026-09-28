import axios from 'axios'
import { useAuthContext } from '../app/context/useAuthContext'


const useApi = () => {

    const authContext = useAuthContext()

    const api = axios.create({
        // baseURL: "http://localhost:5173/api",
        baseURL: 'http://dummyjson.com',
        withCredentials: true
    })

    api.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${authContext.accessToken}`

        return config
    })

    return api
}

export default useApi
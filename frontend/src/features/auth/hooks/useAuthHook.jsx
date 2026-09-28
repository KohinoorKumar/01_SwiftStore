import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { loginUserApi } from "../api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../state/authSlice";
import { registerApi } from "../api/authApi";
import { useAuthContext } from "../../../app/context/useAuthContext";


export const useAuth = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {setAccessToken, setUser} = useAuthContext()

    const {handleSubmit, register, formState: {errors}, reset, watch} = useForm()

    const registerForm = async (data) => {
        try{
            const res = await registerApi(data)
            console.log(res.data)
            setAccessToken(res.data.accessToken)
            setUser(res.data.data.user)
        } catch(error){
            console.log("register form failed due to some error", error)
        }
    }

    const loginForm = async (data) => {
        try {
            const user = await loginUserApi(data)
            console.log(user)
            dispatch(addUser(user))
        } catch (error) {
            console.log("login form failed due to some error", error)
        }
    }

    return {
        handleSubmit, 
        register,
        errors, 
        reset, 
        watch,
        registerForm,
        navigate,
        loginForm,
    }

}
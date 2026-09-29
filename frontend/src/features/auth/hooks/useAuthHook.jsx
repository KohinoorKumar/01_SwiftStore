import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../state/authSlice";
import { loginUserApi, registerApi } from "../api/authApi";

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors }, reset, watch } = useForm();

    const registerForm = async (data) => {
        try {
            const res = await registerApi(data);
            
            if (res?.data) {
                const { user, accessToken } = res.data;
                
                // 1. Store token permanently in localStorage for axios interceptor
                localStorage.setItem("accessToken", accessToken);
                
                // 2. Store both in Redux state
                dispatch(addUser({ user, accessToken }));
                
                navigate("/main", { replace: true });
            }
        } catch (error) {
            console.log("Register form failed:", error);
        }
    };

    const loginForm = async (data) => {
        try {
            const response = await loginUserApi(data);

            console.log("LOGIN RESPONSE:", response);

            const accessToken = response.data.accessToken;

            localStorage.setItem(
              "accessToken",
              accessToken
            );

            dispatch(
              addUser({
                user: response.data.user,
                accessToken,
              })
            );

            navigate("/main");
          } catch (error) {
            console.error("LOGIN ERROR:", error);
          }
    };

    return {
        handleSubmit, 
        register,
        errors, 
        reset, 
        watch,
        registerForm,
        loginForm,
        navigate,
    };
};


import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { hydrateUserApi } from "../api/authApi";
import {
  addUser,
  removeUser,
  setAuthLoading,
} from "../state/authSlice";

const useInitializeAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch(setAuthLoading(true));

        const data = await hydrateUserApi();

        console.log(data)

        dispatch(
          addUser({
            user: data.user,
          })
        );
      } catch (error) {
        dispatch(removeUser());
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    initializeAuth();
  }, [dispatch]);
};

export default useInitializeAuth;
import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (auth?.authToken) {
          config.headers.Authorization = `Bearer ${auth?.authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;

        // console.log(error.response.status)
        // console.log(!originalRequest._retry)

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;

            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            // console.log(response?.data?.data.accessToken);

            const token = response.data?.data?.accessToken;
            setAuth({ ...auth, authToken: token });

            originalRequest.headers.Authorization = `Bearer ${token}`;
            // console.log(axios(originalRequest));
            return axios(originalRequest);
          } catch (error) {
            console.error("Token refresh failed:", error);

            const path = auth?.role === "admin" ? "/login" : "/login";
            window.location.href = path;
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, auth.authToken, setAuth]);

  return { api };
};

export default useAxios;

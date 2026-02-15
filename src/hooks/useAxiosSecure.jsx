import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://blood-donation-server-hazel.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();

  useEffect(() => {
    // request interceptor
    const interceptorRequest = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user?.accessToken}`;
        }
        //console.log("config", config);
        return config;
      },
      (error) => Promise.reject(error),
    );

    // response interceptor
    const interceptorResponse = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      },
    );

    // ✅ cleanup
    return () => {
      axiosSecure.interceptors.request.eject(interceptorRequest);
      axiosSecure.interceptors.response.eject(interceptorResponse);
    };
  }, [user?.accessToken, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;

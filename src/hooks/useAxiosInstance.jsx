import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blood-donation-server-hazel.vercel.app",
});

const useAxiosInstance = () => {
  return axiosInstance;
};

export default useAxiosInstance;

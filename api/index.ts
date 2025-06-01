import axios from "axios";
import { getToken } from "./storage"; // ✅ Ensure this function is implemented correctly

// Create an Axios instance with the base URL
const instance = axios.create({
  baseURL: "https://task-react-auth-backend.eapi.joincoded.com/api",
});

// Attach token to all requests if available
instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

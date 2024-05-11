import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    withCredentials: true,
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const rawPersistData =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiJ9.eyJzdHVkZW50SWQiOjExMTExMSwic3ViIjoiMTExMTExIiwiZXhwIjoxODAxMzE3MjY0fQ.dt_-LtS6Cz8Dvo4kZxeAnDGB2vf1av4-Z_uNx9SR-UA";
    if (rawPersistData) {
      config.headers["Authorization"] = `Bearer ${rawPersistData}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
    // return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {

  const publicUrls = [
    "/auth/register",
    "/auth/login",
    "/password/forgot",
    "/password/reset"
  ];

  const isPublic = publicUrls.some(url =>
    config.url?.startsWith(url)
  );

  if (!isPublic) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;

});

export default api;
import axios from "axios";

const API = axios.create({
  baseURL: "http://13.235.51.122",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("pg_auth") || "{}");
  if (auth && auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use a separate axios instance or clean call to avoid interceptor loops
        const authData = JSON.parse(localStorage.getItem("pg_auth"));
        const response = await axios.post(`${API.defaults.baseURL}/auth/refresh`, {
          refreshToken: authData.refreshToken,
        });

        const { token } = response.data;
        localStorage.setItem("pg_auth", JSON.stringify({ ...authData, token }));

        processQueue(null, token);
        return API(originalRequest); // Retry original request
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("pg_auth");
        window.location.href = "/";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;

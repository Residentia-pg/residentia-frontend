import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("pg_auth"));

  if (auth?.email) {
    config.headers["X-OWNER-EMAIL"] = auth.email;
  }

  return config;
});

export default API;

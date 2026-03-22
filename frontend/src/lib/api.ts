import axios from "axios";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1";

export const websocketUrl =
  import.meta.env.VITE_WS_URL ??
  apiBaseUrl.replace(/^http/, "ws").replace(/\/api\/v1\/?$/, "/ws");

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});


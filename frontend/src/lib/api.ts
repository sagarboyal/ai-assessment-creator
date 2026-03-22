import axios from "axios";

function getRequiredEnv(name: "VITE_API_BASE_URL") {
  const value = import.meta.env[name];

  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  throw new Error(`${name} is not set. Add it to your frontend .env file.`);
}

export const apiBaseUrl = getRequiredEnv("VITE_API_BASE_URL");

export const websocketUrl =
  import.meta.env.VITE_WS_URL ??
  apiBaseUrl.replace(/^http/, "ws").replace(/\/api\/v1\/?$/, "/ws");

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});


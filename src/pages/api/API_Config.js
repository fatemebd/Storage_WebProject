
"use client";

import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  maxBodyLength: Infinity,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function callApi(url, body, method = "post", config, headers) {
  return httpClient({
    method: method,
    url: url,
    data: body,
    headers: headers,
    ...config,
  });
}

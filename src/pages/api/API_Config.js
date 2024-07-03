"use client";

import axios from "axios";

// export const API_URL = process.env.REACT_APP_API_URL;
export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = () => {
  if (typeof window !== "undefined") {
    const userToken = localStorage.getItem("token");
    // const userToken = JSON.parse(tokenString);
    return userToken;
  }
};
let token = getToken();
console.log(token);
const httpClient = axios.create({
  baseURL: API_URL,
  // responseType: "json",
  timeout: 50000,
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  maxBodyLength: Infinity,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: token && token !== "undefined" ? `Token ${token}` : null,
    // `Token 6fae13c6e2978c10756305103d9c8f83ee6d1ce5`,
  },
});

export async function callApi(url, body, method = "post", config, headers) {
  return httpClient({
    method: method,
    url: url,
    data: body,
    headers: headers,
    ...config,
  });
}

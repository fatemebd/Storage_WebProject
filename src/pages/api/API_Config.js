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
const httpClient = axios.create({
  baseURL: API_URL,
  // responseType: "json",
  timeout: 50000,
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  maxBodyLength: Infinity,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      token && token != "undefined"
        ? `Bearer ${localStorage.getItem("token")}`
        : null,
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

// "use client";

// import axios from "axios";

// export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// const httpClient = axios.create({
//   baseURL: API_URL,
//   timeout: 50000,
//   mode: "cors",
//   cache: "no-cache",
//   credentials: "same-origin",
//   maxBodyLength: Infinity,
//   headers: {
//     Accept: "*/*",
//     "Content-Type": "application/json",
//   },
// });

// httpClient.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token");
//     if (token && token !== "undefined") {
//       config.headers.Authorization = `Token ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export async function callApi(url, body, method = "post", config, headers) {
//   return httpClient({
//     method: method,
//     url: url,
//     data: body,
//     headers: headers,
//     ...config,
//   });
// }

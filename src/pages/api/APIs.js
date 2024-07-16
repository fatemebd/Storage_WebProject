import { callApi } from "./API_Config";

export const Signin = async (data) => {
  return callApi("/user/login/", data, "post");
};
export const Register = async (data) => {
  return callApi("/user/register/", data, "post");
};

export const GetUser = async () => {
  return callApi("/user/details/", null, "get");
};
export const PostActivation = async (token) => {
  return callApi(`/accounts/activate/?activation=${token}`, null, "get");
};
export const GetObjects = async (page) => {
  return callApi(`objects/?page=${page}`, null, "get");
};
export const GetAllUsers = async () => {
  return callApi(`/accounts/users/`, null, "get");
};
export const PostAccess = async (data) => {
  return callApi(`/access/`, data, "post");
};
export const DeleteObject = async (id) => {
  return callApi(`/objects/${id}`, null, "delete");
};
export const DownloadUrl = async (id) => {
  return callApi(`/objects/${id}`, null, "get");
};
export const DeleteAccount = async () => {
  return callApi(`/user/details/`, null, "delete");
};

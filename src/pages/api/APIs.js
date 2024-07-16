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
export const PostActivation = async (data) => {
  return callApi(`/user/verify/`, data, "post");
};
export const GetObjects = async () => {
  return callApi(`/notes/`, null, "get");
};
export const GetNote = async (id) => {
  return callApi(`/notes/${id}`, null, "get");
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
export const CreateNote = async (data) => {
  return callApi(`/notes/create/`, data, "post");
};

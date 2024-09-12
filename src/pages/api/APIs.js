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
export const GetNote = async (id, editKey) => {
  return callApi(`/notes/${id}/?edit_key=${editKey}`, null, "get");
};
export const DeleteObject = async (id) => {
  return callApi(`notes/delete/${id}`, null, "delete");
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
export const Backup = async () => {
  return callApi(`/user/backup/`, null, "get");
};

export const GetTags = async () => {
  return callApi(`/tags/user/list/`, null, "get");
};
export const Filter = async (tag) => {
  return callApi(`/tags/notes/filter/?tag=${tag}`, null, "get");
};

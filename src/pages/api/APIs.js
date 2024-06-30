import { callApi } from "./API_Config";

export const Signin = async (data) => {
  return callApi("/accounts/login/", data, "post");
};
export const Register = async (data) => {
  return callApi("/accounts/register/", data, "post");
};

export const GetUser = async () => {
  return callApi("/accounts/detail/", null, "get");
};
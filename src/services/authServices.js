import http from "./httpService";
import config from "../config.json";
import { jwtDecode } from "jwt-decode";

const apiEndPoint = config.apiUrl + "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, {
    email,
    password,
  });

  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function currentuser() {
  try {
    return jwtDecode(localStorage.getItem("token"));
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  currentuser,
  loginWithJwt,
  getJwt,
};

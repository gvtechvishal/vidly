import http from "./httpService";
import config from "../config.json";
import { jwtDecode } from "jwt-decode";

const apiEndPoint = config.apiUrl + "/auth";
let jwtKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, {
    email,
    password,
  });
  localStorage.setItem(jwtKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(jwtKey, jwt);
}

export function logout() {
  localStorage.removeItem(jwtKey);
}

export function currentUser() {
  try {
    const jwt = localStorage.getItem(jwtKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(jwtKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  currentUser,
  getJwt,
};

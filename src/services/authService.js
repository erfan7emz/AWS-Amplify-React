import http from "./httpService";
import config from '../config.json'
import jwtDecode from 'jwt-decode';

const apiEndpoint = config.apiUrl + 'login';
const tokenKey = 'token'

http.setJwt(getJwt());

export async function login(email, password) {
  const {data: jwt} = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export async function loginJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey)
}

export function getJwt() {
  localStorage.getItem(tokenKey)
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenKey)
    return jwtDecode(jwt);
  } catch (ex) {
    return null
  }
}
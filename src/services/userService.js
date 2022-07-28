import http from "./httpService";
import config from '../config.json'

const endPoint = config.apiUrl + 'users'

export function register(user) {
  return http.post(endPoint, {
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email,
    phoneNo: user.phoneNo,
    password: user.password
  });
}
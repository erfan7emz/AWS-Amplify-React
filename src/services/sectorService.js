import http from "./httpService";
import config from '../config.json'

export function getSectors() {
  return http.get(config.apiUrl + 'sectors');
}

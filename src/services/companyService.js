import http from "./httpService";
import config from '../config.json'

const Endpoint = config.apiUrl + 'companies';

export function getCompanies() {
  return http.get(Endpoint);
}

export function getCompany(id) {
    return http.get(Endpoint + '/' + id);
}
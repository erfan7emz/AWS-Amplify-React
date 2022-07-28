import http from "./httpService";
import config from '../config.json'

const Endpoint = config.apiUrl + 'reviews';

export function getReviews() {
  return http.get(Endpoint);
}

export function postReview(content, user, company) {
  return http.post(Endpoint, {
    userId: user,
    content: content,
    company: company
});
}
import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

const instance1 = axios.create()

instance1.defaults.baseURL = process.env.REACT_APP_API_URL

instance1.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  instance1.defaults.headers.common['x-auth-token'] = jwt;
}

const exportedObject = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};

export default exportedObject

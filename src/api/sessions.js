/**
 * Mocking client-server processing
 */
import axios from '../plugins/axios';

export default {
  getSessions (cb) {
    return axios.backend.get("/sessions")
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
}
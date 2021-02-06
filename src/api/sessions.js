/**
 * Mocking client-server processing
 */
import backend from '@/plugins/axios';

export default {
  getSessions(cb) {
    return backend.get("/sessions")
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
}
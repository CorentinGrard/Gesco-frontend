import backend from '@/plugins/axios';

export default {
  get(cb) {
    backend.get("/salles")
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
}
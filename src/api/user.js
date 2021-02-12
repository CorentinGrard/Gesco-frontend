import backend from '@/plugins/axios';

export default {
  get(cb) {
    return backend.get("/profil")
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  }
}
import backend from '@/plugins/axios';

export default {
  async get(cb) {
    let response = await backend.get("/profil")
    cb(response.data)
  }
}
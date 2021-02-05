const axios = require('axios');
import store from '../store/index'

// Set config defaults when creating the instance
const backend = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

// Resume session
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

backend.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  store.dispatch("snackbar/error", { text: error })
  return Promise.reject(error);
});
export default {
  backend: backend
}
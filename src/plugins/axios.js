import axios from 'axios'
import store from '@/store'
import updateToken from '@/middlewares/update-token';

// Set config defaults when creating the instance
const backend = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_BASE_URL
});

backend.interceptors.request.use(async config => {
  const token = await updateToken();
  config.headers.common['Authorization'] = `Bearer ${token}`;
  return config;
});


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

export default backend
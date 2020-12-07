const axios = require('axios');

// Set config defaults when creating the instance
const backend = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });
export default{
    backend:backend
}
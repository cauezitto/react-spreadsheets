import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_HOST,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export default api;

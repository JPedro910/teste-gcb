import axios from "axios";

const api = (context: any) => axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_SERVER
});

export default api;
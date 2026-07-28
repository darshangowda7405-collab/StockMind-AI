import axios from "axios";
import { ENV } from "@/config/env";

const api = axios.create({
  baseURL: ENV.API_BASE_URL,
});

export default api;
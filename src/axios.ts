import axios from "axios";
import { API_URL } from "./constants/costants";


const instanceAxios = axios.create({
    baseURL: API_URL,
});

instanceAxios.interceptors.request.use((config) => {
    return config;
});

export default instanceAxios;

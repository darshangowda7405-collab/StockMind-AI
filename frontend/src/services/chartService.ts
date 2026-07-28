import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export async function getChart(symbol: string) {
    const response = await API.get(`/chart/${symbol}`);
    return response.data;
}
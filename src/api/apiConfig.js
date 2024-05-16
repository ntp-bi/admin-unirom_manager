import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

export const baseIMG = "http://localhost:8080/room/file"

export default api;

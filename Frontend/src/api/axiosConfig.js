import axios from "axios";
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || "http://localhost:8090";

export default axios.create({
    baseURL: SERVER_BASE_URL,
    headers:{"ngrok-skip-browser-warning": "true"}
});
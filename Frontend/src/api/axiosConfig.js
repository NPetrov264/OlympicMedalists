import axios from "axios";
const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

export default axios.create({
    baseURL: SERVER_BASE_URL,
    headers:{"ngrok-skip-browser-warning": "true"}
});
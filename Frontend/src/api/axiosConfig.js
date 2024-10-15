import axios from "axios";
export default axios.create({
    baseURL: SERVER_BASE_URL,
    headers:{"ngrok-skip-browser-warning": "true"}
});
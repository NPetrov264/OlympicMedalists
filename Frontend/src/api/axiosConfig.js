import axios from "axios";
export default axios.create({
    baseURL:'http://46.10.72.25:8090/',
    headers:{"ngrok-skip-browser-warning": "true"}
});
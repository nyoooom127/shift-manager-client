import axios from "axios";
import AppConfig from "./AppConfig";

function getToken() {
    return localStorage.getItem("token");
}

const server = axios.create({
    baseURL: AppConfig.serverUrl,
    headers: {
        "Content-Type": "application/json",
        "token": getToken()
    }
});

//todo CORS!!!!!

export default server;
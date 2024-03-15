import axios from "axios";

const host = "http://15.164.89.177:8080/";

const apiClient = axios.create({
    baseURL : host,
    timeout : 30000,
    headers : {
        "Content-Type" : "application/json"
    }
});

export default apiClient;
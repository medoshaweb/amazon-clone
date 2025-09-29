import axios from "axios"

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-70f44/us-central1/api",
  baseURL: "https://amazon-api-deploy-n4qd.onrender.com/",
});

export {axiosInstance}
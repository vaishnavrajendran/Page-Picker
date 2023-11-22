import axios from "axios";

const createAxiosInstance = (contentType) => {
  return axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
    headers: {
      "Content-Type": contentType,
    },
  });
};

export default createAxiosInstance;

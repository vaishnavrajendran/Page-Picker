import axios from "axios";

const createAxiosInstance = (contentType) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASEURL,
    timeout: 5000,
    headers: {
      "Content-Type": contentType,
    },
  });
};

export default createAxiosInstance;

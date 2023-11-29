import axios from "axios";

const createAxiosInstance = (contentType) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASEURL,
    headers: {
      "Content-Type": contentType,
    },
  });
};

export default createAxiosInstance;

import axios from "axios";

const host = "http://15.164.89.177:8080/";

const apiClient = axios.create({
  baseURL: host,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const urlToFile = async (url) => {
  const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(url)}`;
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${ext}` };
  console.log("filename", filename);
  return new File([data], filename, metadata);
};
export const convertURLtoFile = async (url) => {
  const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(url)}`;
  const response = await fetch(url);
  console.log("response", response);
  const data = await response.blob();
  const ext = url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], filename, metadata);
};

export default apiClient;

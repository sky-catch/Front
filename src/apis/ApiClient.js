import axios from "axios";

const host = "http://15.164.89.177:8080/";

const apiClient = axios.create({
  baseURL: host,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const urlToFile = async (url, fileName = "default-filename") => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};
export const convertURLtoFile = async (url) => {
  const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  const data = await response.blob();
  const ext = url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${ext}` };

  return new File([data], url, metadata);
};

export default apiClient;

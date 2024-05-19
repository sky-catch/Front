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
  console.log("file", file);
  return file;
};

export default apiClient;

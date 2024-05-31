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
  console.log("urlToFile");
  const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(url)}`;
  const response = await fetch(url, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  const data = await response.blob();
  const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename, metadata);
};

export const convertURLtoFile = async (url) => {
  const response = await fetch(url, {
    // mode: "cors",
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  const data = await response.blob();
  const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
  console.log("url", url);
  const metadata = { type: `image/${ext}` };
  return new File([data], filename, metadata);
};

export default apiClient;

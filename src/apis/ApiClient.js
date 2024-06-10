import axios from "axios";

const host = "http://15.164.89.177:8080/";

const apiClient = axios.create({
  baseURL: host,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const convertURLtoFile = async (url) => {
  // const response = await fetch(url, {
  //   headers: { "Access-Control-Allow-Origin": "*" },
  // });
  const response = await fetch(url, {
    mode: "cors", // 기본값이지만 명시적으로 설정
  });
  console.log("response", response);
  const data = await response.blob();
  const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename, metadata);
};

export default apiClient;

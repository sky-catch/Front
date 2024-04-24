import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../apis/ApiClient";
/**
 * API 사용자 관련정보
 *
 * @author jimin
 */
// 로그인 사용자 로그인 처리
export const getLogin = async (code) => {
  try {
    const result = await apiClient.get(`/oauth/login/KAKAO?code=${code}`, {
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // accept: "*/*",
        // "Content-Type": "application/json",
      },
    });
    return result;
  } catch (err) {
    console.log("Error >>", err);
  }
};

// 마이페이지 회원 정보 조회
export const getMyMain = async () => {
  try {
    const result = await apiClient.get(`/member/myMain`, {
      headers: {
        // accept: "*/*",
        // "Content-Type": "application/json",
      },
    });
    return result;
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 저장된 레스토랑 정보 불러오기 */
export const getSavedRestaurants = async (name) => {
  try {
    // const result = await apiClient.post("", data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 사장 : 내 식당 보기 */
export const getMyRestaurant = async () => {
  try {
    const token =
      "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMzY3OTYyOSwiZXhwIjoxNzEzNzY2MDI5fQ.qALwIB3VFm1PlOXx6hicOTKmR1Lx4Z4a0h-ZVMTcmybBvYB4WG5WIT-y7gl24Y_5YCLXB2tAGFl44GzROiC9Fg";
    // const token = localStorage.getItem("token");
    console.log(token);
    const result = await apiClient.get("/owner/restaurant", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    console.log("Error >>", err);
  }
};

// 사장 생성
const createOwner = (registrationNumber) => {
  console.log("registrationNumber", registrationNumber);
  const token =
    "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN5a29yQGtha2FvLmNvbSIsImlzT3duZXIiOmZhbHNlLCJpYXQiOjE3MTM5NjUzODcsImV4cCI6MTcxNDA1MTc4N30._Xipwzi_Z18dUD5xHQe-R5BvBgyMo6dGwbTzHgtYzKXJmKnGcNbFD4N7NXyHEbmd8z55dKV0HmiRTq85wwdf_A";
  console.log("token", token);
  return axios.post(`http://15.164.89.177:8080/owner`, registrationNumber, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const CreateOwnerReq = () => {
  return useMutation({
    mutationFn: (data) => {
      return createOwner(data);
    },
    mutationKey: ["createOwner"],
    onSuccess: (isdata) => {
      console.log("createPost success", isdata);
    },
    onError: (error) => {
      // console.log("createPost error", error.data.message);
      console.log("createPost error", error.response.data);
    },
  });
};

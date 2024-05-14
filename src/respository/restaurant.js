import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../apis/ApiClient";

/**
 * API 식당
 *
 * @author jimin
 */

const token = sessionStorage.getItem("token");

/* 식당 생성 */
export const createRestaurant = async (data) => {
  try {
    // console.log("data : ", data);
    /* 테스트를 위한 7번 사장님 사용자의 jwt token 하드코딩 */
    const token = sessionStorage.getItem("token");
    const result = await apiClient.post("/restaurants", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 식당 수정 */
const updateRestaurant = async (info) => {
  const token = sessionStorage.getItem("token");
  return axios.put(`http://15.164.89.177:8080/restaurants`, info, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const UpdateRestaurantRes = () => {
  return useMutation({
    mutationKey: ["updateRestaurant"],
    mutationFn: updateRestaurant,
    onSuccess: (data) => {
      console.log("createPost success", data);
      window.location.href = "/account";
    },
    onError: (error) => {
      console.log("createPost error", error);
    },
  });
};

/* 식당 개별 조회 */
export const getRestaurant = async (name) => {
  try {
    const res = await apiClient.get(`/restaurants/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return res;
  } catch (err) {
    console.log("Error >>", err);
  }
};

//나의 예약 조회
export const GetReservationRes = async (visitStatus) => {
  console.log("visitStatus", visitStatus);

  try {
    const res = await apiClient.get(`/mydining/my/${visitStatus}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 식당 저장 */
export const saveRestaurant = async (restaurantId) => {
  const token = sessionStorage.getItem("token");
  console.log("restaurantId :", restaurantId, "token : ", token);
  try {
    const res = await apiClient.get(`/saveRestaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log("Error >>", err);
  }
};

// 식당 공지 사항 추가
const createNotificat = async ({ restaurantId, restaurantItem }) => {
  console.log("restaurantId", restaurantId);
  console.log("restaurantItem", restaurantItem);
  const token = sessionStorage.getItem("token");
  return axios.post(
    `http://15.164.89.177:8080/restaurants/${restaurantId}/notifications`,
    restaurantItem,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const CreateNotificatRes = () => {
  return useMutation({
    mutationKey: ["createNotificat"],
    mutationFn: createNotificat,
    onSuccess: (data) => {
      console.log("data", data);
      window.location.href = "/my/myshop/notifications";
    },
    onError: (err) => {
      console.log("err", err);
    },
  });
};

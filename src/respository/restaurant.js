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
export const getRestaurant = async ({queryKey}) => {
  try {
    const [name] = queryKey;
    console.log(name);
    const res = await apiClient.get(`/restaurants/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log("Error >>", err);
    throw new Error("Failed to fetch data");
  }
};

//나의 예약 조회
export const GetReservationRes = async (visitStatus) => {
  console.log("visitStatus", visitStatus);
  try {
    const res = await apiClient.get(`/mydining/my/${visitStatus}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 식당 저장 */
export const useSaveRestaurant = async ({id}) => {
  console.log("restaurantId :", id, "token : ", token);
  const restaurantId = id;
  try {
    const res = await apiClient.post(`/savedRestaurant/${restaurantId}`, restaurantId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 식당 삭제 */
export const useDeleteRestaurant = async({id}) => {
  console.log("restaurantId :", id, "token : ", token);
  const restaurantId = id;
  try {
    const res = await apiClient.delete(`/savedRestaurant/${restaurantId}`, restaurantId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log("Error >>", err);
  }
}

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
      window.location.reload();
    },
    onError: (err) => {
      console.log("err", err);
    },
  });
};

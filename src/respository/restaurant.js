import apiClient from "../apis/ApiClient";

/**
 * API 식당
 *
 * @author jimin
 */

/* 식당 생성 */
export const createRestaurant = async (data) => {
  try {
    console.log('data : ',data);
    /* 테스트를 위한 7번 사장님 사용자의 jwt token 하드코딩 */
    const token =
      "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMTg3ODEwMywiZXhwIjoxNzExOTY0NTAzfQ.WLQ0IaS7QwEqQIdPXvnNBS9hVtinfWo5llTwOunaMWc6a__8ZFhvy0x09XZsZbqyGKZP71c5Gm-4Xmx7VV7JKA";
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

/* 식당 개별 조회 */
export const getRestaurant = async (name) => {
  const token = localStorage.getItem("token");
  try {
    const res = await apiClient.get(`/restaurants/${name}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 식당 저장 */
export const saveRestaurant = async(restaurantId) => {
  const token = localStorage.getItem("token");
  console.log('restaurantId :', restaurantId, 'token : ', token);
  try{
    const res = await apiClient.get(`/saveRestaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log("Error >>", err);
  }
}
import apiClient from "../apis/ApiClient";

/**
 * API 식당
 *
 * @author jimin
 */

const token = localStorage.getItem("token");

/* 식당 생성 */
export const createRestaurant = async (data) => {
  try {
    // console.log("data : ", data);
    /* 테스트를 위한 7번 사장님 사용자의 jwt token 하드코딩 */
    // const token =
    //   "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpc093bmVyIjpmYWxzZSwiaWF0IjoxNzEzOTYzNjc1LCJleHAiOjE3MTQwNTAwNzV9.H3M9QRqhv2Mix5xQR2tbsRW_YPwxjKPY_2PQ9OVClnkI1_mx9D1YGEVw2riCkQRtqQjUUvso26Az1W8qeqyQRg";
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
  console.log("restaurant axios : ", name);
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 식당 저장 */
export const saveRestaurant = async (restaurantId) => {
  const token = localStorage.getItem("token");
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

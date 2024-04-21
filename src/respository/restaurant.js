import apiClient from "../apis/ApiClient";

/**
 * API 식당
 *
 * @author jimin
 */

/* 식당 생성 */
export const createRestaurant = async (data) => {
  try {
    console.log("data : ", data);
    /* 테스트를 위한 7번 사장님 사용자의 jwt token 하드코딩 */
    const token =
      "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImhvbmdAZXhhbXBsZS5jb20iLCJpc093bmVyIjp0cnVlLCJpYXQiOjE3MTM2NzY1MjIsImV4cCI6MTcxMzc2MjkyMn0.tY4IR7kQxPpTE8_-gnZQY1YhUpQIhfTCSDQKnGgjAR995o_96fV5K4as2GZFHw_mkd8Ks_UcFskbD83jRqef6A";
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

export const getRestaurant = async (id) => {
  console.log("restaurant axios : ", id);
  try {
    const res = await apiClient.get(`/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

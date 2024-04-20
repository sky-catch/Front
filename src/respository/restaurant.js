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
      "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN5a29yQGtha2FvLmNvbSIsImlzT3duZXIiOmZhbHNlLCJpYXQiOjE3MTIyNDgzMTMsImV4cCI6MTcxMjMzNDcxM30.hUjxpHcuE7S8YH2JAchwPt51EbD2qNPiPYr0mR8ny0GcCakpHbzRD2uVyj1W4o-oYHlS1eXx54qVsuKhFWCvVQ";
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
      headers: {},
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

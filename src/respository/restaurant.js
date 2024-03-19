import apiClient from "../apis/ApiClient";

/**
 * API 식당
 *
 * @author jimin
 */

/* 식당 생성 */
export const createRestaurant = async (data) => {
  try {
    /* 테스트를 위한 7번 사장님 사용자의 jwt token 하드코딩 */
    const token =
      "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMDc2MjQ2NiwiZXhwIjoxNzEwODQ4ODY2fQ.yyYYEFaloGrX4qySqlssHq696I-G3S6uJ28fVZO4ZbbhJ8MQiUSRNhAE01K8nPuAdhwgn-EH7hKli13Vt8r4XA";
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
  try {
    const res = await apiClient.get(`/restaurants/${id}`, {
      headers: {
        // Authorization : `Bearer ${}`
      },
    });
    return res;
  } catch (err) {
    console.log("Error >>", err);
  }
};

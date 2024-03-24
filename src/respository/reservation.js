import apiClient from "../apis/ApiClient";

/**
 * API 식당
 *
 * @author jimin
 */

/* 예약 가능한 시간 조회 */
export const checkReservationTimes = async (data) => {
  try {
    const result = await apiClient.post("/reservations/availTimeSlots", data, {
      headers: {
        // accept: "*/*",
        // "Content-Type": "application/json",
      },
    });
    return result;
  } catch (err) {
    console.log("Error >>", err.message);
  }
};

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

//채팅방 목록 보기
export const GetChatRoomListRes = async () => {
  try {
    const result = await apiClient.get(
      `/chat/roomList`,
      {},
      {
        headers: {
          // accept: "*/*",
          "Access-Control-Allow-Origin": true,
          // "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (err) {
    console.log("Error >>", err);
  }
};

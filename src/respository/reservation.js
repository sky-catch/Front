import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../apis/ApiClient";

// import { useQueryClient } from "@tanstack/react-query";

/**
 * API 식당
 *
 * @author jimin
 */
/* 예약 가능한 시간 조회 */
// export const checkReservationTimes = async (data) => {
//   try {
//     const result = await apiClient.post("/reservations/availTimeSlots", data, {
//       headers: {

//       },
//     });
//     return result;
//   } catch (err) {
//     console.log("Error >>", err.message);
//   }
// };
const checkReservationTimes = (data) => {
  // console.log("data", data);
  return axios.post(
    "http://15.164.89.177:8080/reservations/availTimeSlots",
    data
  );
};

export const ReservationTimes = () => {
  return useMutation({
    mutationKey: ["checkReservationTimes"],
    mutationFn: checkReservationTimes,
    onSuccess: (data) => {
      console.log("createPost success", data);
    },
    onError: (error) => {
      // mutate가 실패하면, 함수를 실행합니다.
      console.log("createPost error", error);
    },
  });
};

//채팅방 목록 보기
export const GetChatRoomListRes = async () => {
  const token =
    "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMTg3ODEwMywiZXhwIjoxNzExOTY0NTAzfQ.WLQ0IaS7QwEqQIdPXvnNBS9hVtinfWo5llTwOunaMWc6a__8ZFhvy0x09XZsZbqyGKZP71c5Gm-4Xmx7VV7JKA";
  try {
    const result = await apiClient.get(`/chat/roomList`, {
      headers: {
        accept: " */*",
        // Authorization: `${token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log("Error >>", err.message);
  }
};

//채팅 보기
export const GetChatRoom = async (chatRoomId) => {
  const token =
    "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMTg3ODEwMywiZXhwIjoxNzExOTY0NTAzfQ.WLQ0IaS7QwEqQIdPXvnNBS9hVtinfWo5llTwOunaMWc6a__8ZFhvy0x09XZsZbqyGKZP71c5Gm-4Xmx7VV7JKA";
  try {
    const result = await apiClient.get(`/chat/${chatRoomId}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  } catch (err) {
    console.log("Error >>", err);
  }
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
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
  try {
    const result = await apiClient.get(`/chat/roomList`, {
      headers: {
        // accept: "*/*",
        "Access-Control-Allow-Origin": true,
        // "Content-Type": "application/json",
      },
    });
    return result;
  } catch (err) {
    console.log("Error >>", err);
  }
};

//채팅 보기
export const GetChatRoom = async () => {
  try {
    const result = await apiClient.get(`/chat/6`, {
      headers: {},
    });
    return result;
  } catch (err) {
    console.log("Error >>", err);
  }
};

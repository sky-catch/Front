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

//PostChatRoomRes
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
// 채팅 추가
const postChatRoom = (id) => {
  return axios.post(`http://15.164.89.177:8080/chat/${id}`);
};

export const PostChatRoomItem = () => {
  const token = localStorage.getItem("token");
  return useMutation({
    mutationKey: ["postChatRoom"],
    mutationFn: postChatRoom,
    onSuccess: (data) => {
      console.log("createPost success", data);
    },
    onError: (error) => {
      // mutate가 실패하면, 함수를 실행합니다.
      console.log("createPost error", error);
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    },
  });

  // return useMutation({
  //   mutationKey: ["postChatRoom"],
  //   mutationFn: postChatRoom,
  //   onSuccess: (data) => {
  //     console.log("createPost success", data);
  //   },
  //   onError: (error) => {
  //     // mutate가 실패하면, 함수를 실행합니다.
  //     console.log("createPost error", error);
  //   },
  //   context: {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   },
  // });
};

//채팅방 목록 보기
export const GetChatRoomListRes = async () => {
  const token = localStorage.getItem("token");

  try {
    const result = await apiClient.get(`/chat/roomList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  } catch (err) {
    console.log("Error >>", err.message);
    throw err;
  }
};

//채팅 보기
export const getChatRoom = async (chatRoomId) => {
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

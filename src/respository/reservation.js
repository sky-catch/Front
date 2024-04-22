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
const checkReservationTimes = (isdata) => {
  if (isdata.numberOfPeople === 0) return;
  return axios.post(
    "http://15.164.89.177:8080/reservations/availTimeSlots",
    isdata
  );
};

//PostChatRoomRes
export const ReservationTimes = () => {
  return useMutation({
    mutationKey: ["checkReservationTimes"],
    mutationFn: (data) => {
      return checkReservationTimes(data);
    },
    // mutationFn: checkReservationTimes,
    onSuccess: (isdata) => {
      return isdata;
      // console.log("createPost success", data);
    },
    onError: (error) => {
      // mutate가 실패하면, 함수를 실행합니다.
      console.log("createPost error", error);
    },
    // retry: 2,
  });
};

// 채팅 추가
const postChatRoom = (id) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `http://15.164.89.177:8080/chat/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const PostChatRoomItem = () => {
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
// 예약 생성
const createReservation = async (restaurantId, restaurantValue) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token is not available");
    return; // 예외 처리: 토큰이 없을 경우 바로 반환
  }

  return axios.post(
    `http://15.164.89.177:8080/reservations/${restaurantId}`,
    restaurantValue,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const CreateNewReservation = () => {
  return useMutation({
    mutationKey: ["createReservation"],
    mutationFn: createReservation,
    onSuccess: (data) => {
      console.log("createPost success", data);
    },
    onError: (error) => {
      console.log("createPost error", error);
    },
  });
};

//예약 삭제
const cancelReservationItem = async (reservationId) => {
  console.log("reservationId", reservationId);
  const token = localStorage.getItem("token");
  return axios.patch(
    `http://15.164.89.177:8080/reservations/${reservationId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const CancelReservation = () => {
  return useMutation({
    mutationKey: ["cancelReservationItem"],
    mutationFn: cancelReservationItem,
    onSuccess: (data) => {
      console.log("createPost success", data);
    },
    onError: (error) => {
      console.log("createPost error", error);
    },
  });
};

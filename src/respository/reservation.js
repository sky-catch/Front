import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiClient from "../apis/ApiClient";

const FormData = require("form-data");
// import { useQueryClient } from "@tanstack/react-query";
/**
 * 예약 API
 *
 */
/* 예약 가능한 시간 조회 */
const token = sessionStorage.getItem("token");

export const checkReservationTimes = async ({ queryKey }) => {
  console.log("queryKey", queryKey);
  const [isdata] = queryKey;
  if (isdata.numberOfPeople === 0) return;
  const result = await axios.post(
    "http://15.164.89.177:8080/reservations/availTimeSlots",
    isdata,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

//PostChatRoomRes
export const ReservationTimes = () => {
  return useMutation({
    mutationKey: ["checkReservationTimes"],
    mutationFn: (data) => {
      return checkReservationTimes(data);
    },
    onSuccess: (isdata) => {
      return isdata;
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
  const token = sessionStorage.getItem("token");
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
      window.location.href = "/dialog";
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
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("result", result);
    return result.data;
  } catch (err) {
    console.log("Error >>", err.message);
    throw err;
  }
};

//채팅 보기
export const getChatRoom = async (chatRoomId) => {
  // const token = sessionStorage.getItem("token");
  console.log(chatRoomId);
  try {
    const result = await apiClient.get(`/chat/${chatRoomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  } catch (err) {
    console.log("Error >>", err);
  }
};
// 예약 생성
export const createReservation = async (restaurantId, restaurantValue) => {
  console.log(restaurantValue);
  if (!token) {
    console.error("Token is not available");
    return; // 예외 처리: 토큰이 없을 경우 바로 반환
  }

  try {
    const result = await apiClient.post(`/reservations/${restaurantId}`, JSON.stringify(restaurantValue),{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (err) {
    console.log("Error >>", err);
  }
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
  // const token = sessionStorage.getItem("token");
  return axios.patch(
    `http://15.164.89.177:8080/reservations/${reservationId}`,
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const CancelReservation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["cancelReservationItem"],
    mutationFn: cancelReservationItem,
    onSuccess: (data) => {
      navigate("/mydining/my");

      console.log("createPost success", data);
    },
    onError: (error) => {
      console.log("createPost error", error);
    },
  });
};

// 리뷰 생성
const createReviewItem = async ({ createReviewReq, files }) => {
  const formData = new FormData();

  const createReviewString = JSON.stringify(createReviewReq);
  const blob = new Blob([createReviewString], { type: "application/json" });
  await formData.append("createReviewReq", blob);

  for (let index = 0; index < files.length; index++) {
    await formData.append("files", files[index].file);
  }
  const response = await axios.post(
    `http://15.164.89.177:8080/review`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const CreateReview = () => {
  return useMutation({
    mutationKey: ["createReviewItem"],
    mutationFn: createReviewItem,
    onSuccess: (data) => {
      console.log("createPost success", data);
      alert("리뷰 작성이 완료됐습니다.");
      window.location.href = "/mydining/my";
    },
    onError: (error) => {
      console.log("createPost error", error);
    },
  });
};

const deleteReviewItem = async (id) => {
  const response = await axios.delete(
    `http://15.164.89.177:8080/review/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const DeleteReview = () => {
  return useMutation({
    mutationKey: ["deleteReviewItem"],
    mutationFn: deleteReviewItem,
    onSuccess: (data) => {
      console.log("createPost success", data);
      alert("리뷰 삭제가 완료됐습니다.");
      window.location.reload();
    },
    onError: (error) => {
      console.log("createPost error", error);
    },
  });
};
// 식당 이미지 추가
const createRestaurantImages = async ({
  addRestaurantImagesReq,
  files,
  restaurantId,
}) => {
  const createImages = JSON.stringify(addRestaurantImagesReq);
  const blob = new Blob([createImages], { type: "application/json" });

  for (let index = 0; index < files.length; index++) {
    const formData = new FormData();
    formData.append("addRestaurantImagesReq", blob);
    formData.append("files", files[index].file);

    const response = await axios.post(
      `http://15.164.89.177:8080/restaurants/${restaurantId}/images`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
};

export const CreateRestaurantImagesItem = () => {
  return useMutation({
    mutationKey: ["createRestaurantImages"],
    mutationFn: createRestaurantImages,
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
      throw error;
    },
  });
};

//예약들 노쇼로 바꾸는 기능
const changeReservationsItem = async (noShowIds) => {
  const token = sessionStorage.getItem("token");

  return axios.patch(
    `http://15.164.89.177:8080/owner/reservations`,
    {
      noShowIds: noShowIds,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const ChangeReservations = () => {
  return useMutation({
    mutationKey: ["changeReservationsItem"],
    mutationFn: changeReservationsItem,
    onSuccess: (data) => {
      console.log("createPost success", data);
      alert("상태 변경이 완료됐습니다.");
      window.location.reload();
    },
    onError: (error) => {
      console.log("createPost error", error);
    },
  });
};

// 예약 조회
export const getMyReserve = async (param) => {
  try {
    const result = await apiClient.get(`/mydining/my/${param}`, {
      headers: {},
    });
    return result;
  } catch (err) {
    console.log("err >>", err);
  }
};

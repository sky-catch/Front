import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../apis/ApiClient";

/**
 * API 사용자 관련정보
 *
 * @author jimin
 */

const token = sessionStorage.getItem("token");

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

// 로그인 사용자 테스트용
export const getTestLogin = async () => {
  try {
    let id = 15;
    const result = await apiClient.get(`/oauth/jwt/test/owner/${id}`, {
      headers: {},
    });

    if (result.data) {
      sessionStorage.setItem("token", result.data.accessToken.value);
    }
  } catch (err) {
    console.log("Error >>", err);
    throw err;
  }
};

// 마이페이지 회원 정보 조회
export const getUserInfo = async () => {
  try {
    const result = await apiClient.get(`/member/myMain`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log("Error >>", err);
  }
};

// 마이페이지 회원 정보 수정
export const updateUserInfo = async ({ updateMemberReq, file }) => {
  // 폼데이터 객체 생성
  const formData = new FormData();
  // file 추가
  formData.append("file", file);
  // 객체를 JSON 타입으로 변환하여 Blob 객체 생성 (Json 데이터와 이미지 파일을 함께 전송)
  const blob = new Blob([JSON.stringify(updateMemberReq)], {
    type: "application/json",
  });
  formData.append("updateMemberReq", blob);
  console.log("updateMemberReq", updateMemberReq, "file", file);
  try {
    const result = await apiClient.patch(`/member/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return result;
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 사장 : 내 식당 보기 */
export const getMyRestaurant = async () => {
  try {
    const result = await apiClient.get("/owner/restaurant", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log("Error >>", err);
    // throw err;
  }
};

// 사장 생성
const createOwner = (registrationNumber) => {
  const token = sessionStorage.getItem("token");
  return axios
    .post(`http://15.164.89.177:8080/owner`, registrationNumber, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      alert("사장님 등록이 완료 되었습니다. 환영합니다. :)");
      window.location.href = "/account";
    });
};

export const CreateOwnerReq = () => {
  return useMutation({
    mutationFn: createOwner,
    mutationKey: ["createOwner"],
    onSuccess: (isdata) => {
      console.log("createPost success", isdata);
    },
    onError: (error) => {
      console.log("createPost error", error.response.data);
    },
  });
};

// 사장 조회
export const getOwner = async () => {
  return axios
    .get(`http://15.164.89.177:8080/owner`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error >>", err);
    });
};

// 사장 삭제
const deleteOwner = (id) => {
  return axios
    .delete(`http://15.164.89.177:8080/owner/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error >>", err);
    });
};

export const DeleteOwnerReq = () => {
  return useMutation({
    mutationFn: deleteOwner,
    mutationKey: ["deleteOwner"],
    onSuccess: (isdata) => {
      console.log("createPost success", isdata);
      window.location.href = "/account";
    },
    onError: (error) => {
      console.log("createPost error", error.response.data);
    },
  });
};
// 댓글 생성
export const CreateCommentReq = (comment) => {
  console.log(comment);
  const token = sessionStorage.getItem("token");
  return axios.post("http://15.164.89.177:8080/comment", comment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const CreateCommentReq = () => {
//   return useMutation({
//     mutationFn: createComment,
//     mutationKey: "createComment",
//     onSuccess: (isdata) => {
//       console.log(isdata);
//     },
//     onError: (iserr) => {
//       console.log(iserr);
//     },
//   });
// };

// 댓글 수정
const updateComment = (comment) => {
  console.log(comment);
  const token = sessionStorage.getItem("token");
  return axios.patch("http://15.164.89.177:8080/comment", comment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdateCommentReq = () => {
  return useMutation({
    mutationFn: updateComment,
    mutationKey: "updateComment",
    onSuccess: (isdata) => {
      console.log(isdata);
      window.location.reload();
    },
    onError: (iserr) => {
      console.log(iserr);
    },
  });
};
// 댓글 삭제 Delete
export const DeleteComment = (id) => {
  console.log(id);
  const token = sessionStorage.getItem("token");
  return axios.delete(
    `http://15.164.89.177:8080/comment/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// 식당 예약 보기
export const getReservation = async () => {
  const token = sessionStorage.getItem("token");
  return axios
    .get(`http://15.164.89.177:8080/owner/reservation`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    });
};
// export const DeleteCommentReq = () => {
//   return useMutation({
//     mutationFn: deleteComment,
//     mutationKey: "deleteComment",
//     onSuccess: (isdata) => {
//       console.log(isdata);
//     },
//     onError: (iserr) => {
//       console.log(iserr);
//     },
//   });
// };

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../apis/ApiClient";

/**
 * API 사용자 관련정보
 *
 * @author jimin
 */
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

/* 저장된 레스토랑 정보 불러오기 */
export const getSavedRestaurants = async (name) => {
  try {
    // const result = await apiClient.post("", data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
  } catch (err) {
    console.log("Error >>", err);
  }
};

/* 사장 : 내 식당 보기 */
export const getMyRestaurant = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  try {
    const result = await apiClient.get("/owner/restaurant", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.log("Error >>", err);
  }
};

// 사장 생성

const createOwner = (registrationNumber) => {
  const token = localStorage.getItem("token");

  // const token =
  //   "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN5a29yQGtha2FvLmNvbSIsImlzT3duZXIiOmZhbHNlLCJpYXQiOjE3MTM5NjUzODcsImV4cCI6MTcxNDA1MTc4N30._Xipwzi_Z18dUD5xHQe-R5BvBgyMo6dGwbTzHgtYzKXJmKnGcNbFD4N7NXyHEbmd8z55dKV0HmiRTq85wwdf_A";
  console.log("token", token);
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
  const token = localStorage.getItem("token");
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

// 댓글 생성
export const CreateCommentReq = (comment) => {
  console.log(comment);
  const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");
  return axios.delete(
    `http://15.164.89.177:8080/comment/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

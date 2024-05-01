// import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useRef, useState } from "react";
import Drawer from "react-modern-drawer";
import styled from "styled-components";
import { CreateCommentReq, DeleteComment } from "../../respository/userInfo";
// import { createRestaurant } from "../../respository/restaurant";
import { UpdateCommentReq, getMyRestaurant } from "../../respository/userInfo";
export default function Restaurantsetting() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const textInput = useRef();
  const { mutate: createComment } = useMutation({
    mutationFn: CreateCommentReq,
    mutationKey: "CreateCommentReq",
    onSuccess: (isdata) => {
      window.location.reload();
    },
    onError: (iserr) => {
      console.log(iserr);
    },
  });
  const { mutate: updateComment } = UpdateCommentReq();
  const { mutate: deleteComment } = useMutation({
    mutationFn: DeleteComment,
    mutationKey: "DeleteComment",
    onSuccess: (isdata) => {
      window.location.reload();
    },
    onError: (iserr) => {
      console.log(iserr);
    },
  });

  const [isReviewId, setIsReviewId] = useState("");
  const [isCommentId, setIsCommentId] = useState({ index: "", time: "" });
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    alert("작상한 내용이 저장되지 않습니다.");
    textInput.current.value = "";
  };
  const addRestaurant = () => {
    // createRestaurant()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  // useEffect(() => {
  //   getMyRestaurant()
  //     .then((res) => {
  //       console.log(res);

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // 내 식당 관리 페이지
  const { data, isLoading } = useQuery({
    queryKey: ["getMyRestaurant"],
    queryFn: () => {
      return getMyRestaurant()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  });

  console.log(data);
  if (isLoading) {
    return <div className="">...isLoading</div>;
  }
  //댓글 수정
  const commentEdit = (index, time) => {
    setIsCommentId({ index: index, time: time });
    setIsCreate(false);
    setIsOpen((prevState) => !prevState);
  };

  // 댓글 생성
  const commentCreate = (index) => {
    console.log("댓글 생성", index);
    setIsReviewId(index);
    setIsCreate(true);
    setIsOpen((prevState) => !prevState);
  };
  // 댓글 삭제
  const commentDelete = (index) => {
    alert("정말로 삭제하겠습니까?");
    deleteComment(index);
  };

  const commentCreateAction = () => {
    const currentTime = new Date();
    const commentItems = {
      createdDate: currentTime.toISOString(),
      updatedDate: currentTime.toISOString(),
      reviewId: isReviewId,
      content: textInput.current.value,
    };

    createComment(commentItems);
  };

  const commentEditAction = () => {
    const currentTime = new Date();
    const commentItems = {
      createdDate: isCommentId.time,
      updatedDate: currentTime.toISOString(),
      commentId: isCommentId.index,
      content: textInput.current.value,
    };
    updateComment(commentItems);
  };
  console.log(data.reviewComments.length);
  return (
    <MainContents>
      {data && data.reviewComments.length > 0 ? (
        <div className=" container">
          {data.reviewComments.map((item, index) => {
            return (
              <div
                key={index}
                className=" border-b-[#c1c1c1] border-b-[1px] py-[10px] flex gap-y-[14px] flex-col"
              >
                <div className=" flex items-center justify-between">
                  <span className="color-gray text-[12px]">
                    {item.nickname}
                  </span>
                  <span className="color-gray text-[12px]">
                    {moment(item.reviewUpdatedDate).format("YY.MM.DD")}
                  </span>
                </div>
                <div className="p-[7px] rounded-lg bg-[#f4f4f4] text-[#2c2c2c] text-[14px] min-h-[80px] max-h-[120px] overflow-auto scroll-hide">
                  {item.reviewContent}
                </div>
                {item.images.length > 0 && (
                  <div className="img grid grid-cols-4 gap-[10px]">
                    {item.images.map((itemImg, index) => {
                      return (
                        <img
                          className="rounded-[6px]"
                          src={itemImg.path}
                          alt={itemImg.path}
                          key={index}
                        />
                      );
                    })}
                  </div>
                )}

                {item.commentContent !== null && (
                  <div className=" flex justify-between items-start mb-[12px]">
                    <div className="size-[50px] rounded-full overflow-hidden bg-slate-400">
                      {console.log("item", data.images[0].path)}
                      <img
                        className="rounded-full"
                        src={data.images[0].path}
                        alt={data.images[0].path}
                      />
                    </div>
                    <div className="p-[7px] w-[calc(100%-60px)] rounded-lg bg-[#f4f4f4] text-[#2c2c2c] text-[14px] min-h-[80px] max-h-[120px] overflow-auto scroll-hide">
                      {item.commentContent}
                    </div>
                  </div>
                )}

                <div className=" flex justify-between items-center">
                  {item.commentContent === null ? (
                    <Btn
                      className="btn btn-md btn-outline btn-rounded"
                      onClick={(e) => {
                        commentCreate(item.reviewId);
                      }}
                      colorEven={true}
                    >
                      댓글 작성
                    </Btn>
                  ) : (
                    <>
                      <Btn
                        className="btn btn-md btn-outline btn-rounded"
                        onClick={(e) => {
                          commentEdit(item.commentId, item.commentCreatedDate);
                          textInput.current.value = item.commentContent;
                        }}
                        colorEven={true}
                      >
                        댓글 수정
                      </Btn>
                      <Btn
                        className="btn btn-md btn-outline btn-rounded"
                        onClick={(e) => commentDelete(item.commentId)}
                        colorEven={false}
                      >
                        댓글 삭제
                      </Btn>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-[100%] w-[100%]  flex items-center justify-center">
          <span className=" text-[22px] text-[#666]">
            식당 리뷰가 없습니다.
          </span>
        </div>
      )}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className="drawer-box"
        size="calc(100vh - 250px)"
      >
        <div className="container h-[100%]">
          <div className="header-left items-center flex gap-[12px]">
            <a
              className="header-back-black h-[47px] leading-[47px] z-50"
              onClick={toggleDrawer}
            >
              뒤로
            </a>
            <a className="text-xl h-[47px] leading-[47px] font-bold block absolute left-0 right-0 text-center">
              {isCreate ? "리뷰 댓글 작성하기" : "리뷰 댓글 수정하기"}
            </a>
          </div>
          <div className="h-[calc(100%-47px-47px)] overflow-y-auto pb-[15px]">
            <div className=" my-[15px] h-[calc(100%-30px)]">
              <textarea
                name="comment"
                ref={textInput}
                className="form-input block w-[100%] p-[8px] h-[100%] border border-[#d5d5d5] rounded-md"
                rows={7}
                minLength={10}
                placeholder={"댓글 작성해주세요."}
                onChange={onchange}
              ></textarea>
            </div>
          </div>
          <CommentSendBtn
            onClick={() => {
              if (isCreate) {
                commentCreateAction();
              } else {
                commentEditAction();
              }
            }}
          >
            댓글 입력 완료
          </CommentSendBtn>
          {/* </div> */}
        </div>
      </Drawer>
    </MainContents>
  );
}

const CommentSendBtn = styled.button`
  border-radius: 6px;
  line-height: 47px;
  text-align: center;
  font-size: 14px;
  width: 100%;
  background-color: #ff3d00;
  color: #fff;
`;
const MainContents = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 47px);
  overflow: auto;
  margin-top: 47px;
`;
const Btn = styled.button`
  border-radius: 6px;
  line-height: 26px;
  text-align: center;
  padding: 0 10px;
  font-size: 14px;
  /* width: 100%; */
  /* margin-top: 0.75rem; */
  background-color: #ff3d00;
  color: #fff;
  ${(prop) =>
    prop.colorEven
      ? " background-color: #ff3d00; color: #fff;"
      : "color: #666; background-color: #f4f4f4;"}
`;

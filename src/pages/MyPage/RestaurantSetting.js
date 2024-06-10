import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useRef, useState } from "react";
import Drawer from "react-modern-drawer";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { RestaurantState } from "../../States/LoginState";
import Loading from "../../components/Loading";
import { ChangeReservationsStatus } from "../../respository/reservation";

import {
  CreateCommentReq,
  DeleteComment,
  UpdateCommentReq,
  getReservation,
} from "../../respository/userInfo";
const stateList = [
  {
    id: "PLANNED",
    title: "방문예정",
  },
  {
    id: "DONE",
    title: "방문완료",
  },
  {
    id: "CANCEL",
    title: "취소/노쇼",
  },
];
export default function Restaurantsetting() {
  const user = useRecoilValue(RestaurantState);

  const { mutate: changeStatus } = ChangeReservationsStatus();
  const [listSelect, setListSelect] = useState("PLANNED");
  const { data: reservationItems, isLoading } = useQuery({
    queryKey: ["selectData", listSelect],
    queryFn: () => {
      return getReservation()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    select: (data) => {
      return data.list.filter((item) => {
        return item.status === listSelect;
      });
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const [isCreate, setIsCreate] = useState(false);
  const [isSelect, setIsSelect] = useState(true);
  const [isSave, setIsSave] = useState(true);
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

  const itemClick = (index) => {
    switch (index) {
      case 0:
        setListSelect("PLANNED");
        break;
      case 1:
        setListSelect("DONE");
        break;
      default:
        setListSelect("CANCEL");
        break;
    }
  };
  /* Tap 선택 */
  const menuClick = (e, index) => {
    if (index === 0) {
      setIsSelect(true);
      setIsSave(true);
    } else {
      setIsSelect(false);
      setIsSave(false);
    }
  };

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
  //방문 완료 변경
  const doneBtn = (item) => {
    const statusItem = {
      reservationId: item.reservationId,
      reservationStatus: "DONE",
    };
    changeStatus(statusItem);
  };
  //방문 예정 변경
  const plannedBtn = (item) => {
    const statusItem = {
      reservationId: item.reservationId,
      reservationStatus: "PLANNED",
    };
    changeStatus(statusItem);
  };
  //방문 취소 변경
  const cancelBtn = (item) => {
    const statusItem = {
      reservationId: item.reservationId,
      reservationStatus: "CANCEL",
    };
    changeStatus(statusItem);
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
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <MainContents>
      <ul className="tab-menu sticky top-[0px] bg-white">
        <li
          className={`w-[50%] leading-[48px] text-center ${
            isSelect ? " active" : ""
          }`}
          onClick={(e) => menuClick(e, 0)}
        >
          식당 예약 상태
        </li>
        <li
          className={`w-[50%] leading-[48px] text-center ${
            isSelect ? "" : "active"
          }`}
          onClick={(e) => {
            menuClick(e, 1);
          }}
        >
          식당 리뷰
        </li>
      </ul>
      {isSave ? (
        <div className="collection container">
          <div className="flex gap-x-[10px] py-[10px] sticky top-[48px] bg-white z-[99] left-0">
            {stateList.map((item, index) => {
              return (
                <span
                  key={item.id}
                  onClick={() => itemClick(index)}
                  className={` ${
                    listSelect === item.id
                      ? " rounded-full border-black "
                      : " text-[#666] border-transparent"
                  } px-[15px] box-border font-medium text-[14px] leading-[32px] h-8 cursor-pointer  border-[1px]`}
                >
                  {item.title}
                </span>
              );
            })}
          </div>
          {reservationItems?.length > 0 ? (
            <div className="">
              {reservationItems?.map((item, index) => {
                return (
                  <div
                    className="py-[10px] px-[15px] flex flex-col gap-y-[5px] rounded-md shadow mb-[15px]"
                    key={index}
                  >
                    <span className="text-[14px] text-[#2c2c2c]">
                      <em className="">예약자 : </em>
                      <em className="">
                        {item.memberName.replace(
                          item.memberName.slice(1, item.memberName.length - 1),
                          "*"
                        )}
                      </em>
                    </span>
                    {item.memo !== null && (
                      <span className="text-[14px] text-[#2c2c2c]">
                        <em className="">메모 : </em>
                        <em className="">{item.memo}</em>
                      </span>
                    )}

                    <span className="text-[14px] text-[#2c2c2c]">
                      <em className="">예약 날짜 : </em>
                      <em className="">{item.time.split("T")[0]}</em>
                    </span>
                    <span className="text-[14px] text-[#2c2c2c]">
                      <em className="">예약 시간 : </em>{" "}
                      <em className="">
                        {item.time.split("T")[1].slice(0, 5)}
                      </em>
                    </span>

                    <div className=" grid grid-cols-2 gap-x-[15px] h-[32px] mt-[10px]">
                      {listSelect === "PLANNED" ? (
                        <>
                          <button
                            className="btn btn-sm btn-red  "
                            onClick={() => {
                              doneBtn(item);
                            }}
                          >
                            방문 완료
                          </button>
                          <button
                            className="btn btn-sm btn-red"
                            onClick={() => {
                              cancelBtn(item);
                            }}
                          >
                            취소/노쇼
                          </button>
                        </>
                      ) : listSelect === "CANCEL" ? (
                        <>
                          <button
                            className="btn btn-sm btn-red "
                            onClick={() => {
                              doneBtn(item);
                            }}
                          >
                            방문 완료
                          </button>
                          <button
                            className="btn btn-sm btn-red "
                            onClick={() => {
                              plannedBtn(item);
                            }}
                          >
                            방문 예정
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-sm btn-red "
                            onClick={() => {
                              plannedBtn(item);
                            }}
                          >
                            방문 예정
                          </button>
                          <button
                            className="btn btn-sm btn-red "
                            onClick={() => {
                              cancelBtn(item);
                            }}
                          >
                            취소/노쇼
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-[500px] w-[100%]  flex-col gap-y-[20px] flex items-center justify-center ">
              <img
                className=" size-[70px]"
                src={require("../../assets/icons/empty.png")}
              />
              <span className=" text-[#47566A] text-[16px] text-bold ">
                {listSelect === "PLANNED"
                  ? "방문 예약된 식당이 없습니다."
                  : listSelect === "CANCEL"
                  ? "취소된 식당이 없습니다."
                  : "방문 완료된 식당이 없습니다."}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="review pb-[20px]">
          {user && user.reviewComments.length > 0 ? (
            <div className=" container">
              {user.reviewComments.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" py-[10px] px-[15px] flex gap-y-[14px] flex-col rounded-md shadow mb-[15px]"
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
                          {console.log("item", user.images[0].path)}
                          <img
                            className="rounded-full"
                            src={user.images[0].path}
                            alt={user.images[0].path}
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
                              commentEdit(
                                item.commentId,
                                item.commentCreatedDate
                              );
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
            <div className="h-[500px] w-[100%] flex-col gap-y-[20px]  flex items-center justify-center ">
              <img
                className=" size-[70px]"
                src={require("../../assets/icons/empty.png")}
              />
              <span className=" text-[#47566A] text-[16px] text-bold ">
                식당 리뷰가 없습니다.
              </span>
            </div>
          )}
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
          <div className="header-left items-center flex gap-[12px] h-[47px]">
            <a
              className="header-close-black h-[47px] leading-[47px] z-50"
              onClick={toggleDrawer}
            ></a>
            <a className="text-xl h-[47px] leading-[47px] font-bold block absolute left-0 right-0 text-center">
              {isCreate ? "리뷰 댓글 작성하기" : "리뷰 댓글 수정하기"}
            </a>
          </div>
          <div className="h-[calc(100%-47px-47px)] overflow-y-auto pb-[15px]">
            <div className=" my-[10px] h-[calc(100%-30px)]">
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
  line-height: 16px;
  text-align: center;
  padding: 3px 8px;
  font-size: 12px;
  background-color: #ff3d00;
  color: #fff;
  ${(prop) =>
    prop.colorEven
      ? " background-color: #ff3d00; color: #fff;"
      : "color: #666; background-color: #fff;"}
`;
const CancelBtn = styled.button`
  border-radius: 6px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  width: 100%;
  background-color: #ff3d00;
  color: #fff;
  margin-top: 10px;
`;

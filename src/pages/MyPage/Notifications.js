import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import Drawer from "react-modern-drawer";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { RestaurantState } from "../../States/LoginState";
import { CreateNotificatRes } from "../../respository/restaurant";
import { getMyRestaurant } from "../../respository/userInfo";
const Notifications = () => {
  const restaurant = useRecoilValue(RestaurantState);
  // const [isNotificat, setIsNotificat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createNotificat } = CreateNotificatRes();
  const inputRef = useRef([]);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    if (isOpen) {
      alert("작상한 내용이 저장되지 않습니다.");
    }

    inputRef.current[0].value = "";
    inputRef.current[1].value = "";
    inputRef.current[2].value = "";
    inputRef.current[3].value = "";
  };

  useEffect(() => {
    console.log(restaurant);
    // setIsNotificat(restaurant.notifications);
  }, []);

  // 내 식당 관리 페이지
  const {
    data: getRestaurantItem,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getMyRestaurant"],
    queryFn: () => {
      return getMyRestaurant()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log("err1", err.response);
        });
    },
  });

  const setDeadline = (date) => {
    const now = new Date();
    const nowStart = new Date(date);
    const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return nowDay > nowStart;
  };

  const sendNotificat = (id) => {
    const now = new Date();
    const startDate = new Date(inputRef.current[0].value);
    const endDate = new Date(inputRef.current[1].value);
    const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (inputRef.current[0].value === "") {
      alert("시작 날짜 작성해주세요.");
      return;
    }
    if (inputRef.current[1].value === "") {
      alert("마감 날짜 작성해주세요.");
      return;
    }
    if (inputRef.current[2].value === "") {
      alert("제목을 작성해주세요.");
      return;
    }
    if (inputRef.current[3].value === "") {
      alert("내용을 작성해주세요.");
      return;
    }

    if (startDate > endDate || nowDay > startDate || nowDay > endDate) {
      alert("날짜를 확인 해주세요.");
      return;
    }

    const notificat = {
      restaurantId: id,
      restaurantItem: {
        title: inputRef.current[2].value,
        content: inputRef.current[3].value,
        startDate: inputRef.current[0].value,
        endDate: inputRef.current[1].value,
      },
    };

    createNotificat(notificat);
  };
  return (
    <MainContents className="">
      <div className=" container h-[100%]">
        {getRestaurantItem && getRestaurantItem.notifications.length > 0 ? (
          getRestaurantItem.notifications.map((item, index) => {
            return (
              <div
                className="rounded-md shadow mb-[15px] px-[15px] py-[10px] flex gap-y-[14px] flex-col"
                key={index}
              >
                <span className=" flex items-center text-hidden">
                  {`${item.title}`}
                  {setDeadline(item.endDate) && (
                    <em className=" text-[12px] text-[#ff3d00] ml-[10px]">
                      (마감)
                    </em>
                  )}
                </span>
                <div className="p-[7px] rounded-md bg-[#f4f4f4] text-[#2c2c2c] text-[14px] min-h-[80px] max-h-[120px] overflow-auto scroll-hide">
                  {item.content}
                </div>
                <div className=" flex items-center justify-end gap-x-[5px]">
                  <span className="color-gray text-[12px]">
                    {item.startDate}
                  </span>
                  <span className="color-gray text-[12px]">~</span>
                  <span className="color-gray text-[12px]">{item.endDate}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-[100%] flex justify-center items-center">
            <span className="text-[#c8c8c8] text-[16px] text-bold">
              등록된 공지 사항이 없습니다.
            </span>
          </div>
        )}
      </div>
      <AddBtn className="btn-icon add icon" onClick={toggleDrawer}></AddBtn>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className="drawer-box"
        size="calc(100vh - 150px)"
      >
        <div className="container h-[100%]">
          <div className="header-left items-center flex gap-[12px] h-[47px]">
            <a
              className="header-close-black h-[47px] leading-[47px] z-50"
              onClick={toggleDrawer}
            ></a>
            <a className="text-xl h-[47px] leading-[47px] font-bold block absolute left-0 right-0 text-center">
              공지 사항 작성하기
            </a>
          </div>
          <div className="h-[calc(100%-47px-47px)] overflow-y-auto pb-[15px]">
            <div className=" my-[10px] h-[calc(100%-30px)]">
              <div className=" flex justify-between">
                <div className="form-block mb-[10px] w-[48%]">
                  <div className="mb-[6px]">
                    <label className="color-gray text-[12px]">시작 날짜</label>
                  </div>
                  <input
                    type="date"
                    className="form-input  border border-[#d5d5d5] h-[53px]"
                    id="reservationBeginDate"
                    required="required"
                    ref={(el) => (inputRef.current[0] = el)}
                    defaultValue={""}
                  />
                </div>
                <div className="form-block mb-[10px] w-[48%]">
                  <div className="mb-[6px]">
                    <label className="color-gray text-[12px]">마감 날짜</label>
                  </div>
                  <input
                    type="date"
                    className="form-input  border h-[53px] border-[#d5d5d5]"
                    id="reservationBeginDate"
                    required="required"
                    ref={(el) => (inputRef.current[1] = el)}
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="form-block mb-[10px]">
                <div className="mb-[6px]">
                  <label className="color-gray text-[12px]">제목</label>
                </div>
                <input
                  type="text"
                  className="form-input block w-[100%] p-[8px] h-[53px] border border-[#d5d5d5] rounded-md"
                  placeholder={"공지 사항 제목을 작성해주세요."}
                  name="displayName"
                  ref={(el) => (inputRef.current[2] = el)}
                ></input>
              </div>
              <div className="form-block mb-[10px]">
                <div className="mb-[6px]">
                  <label className="color-gray text-[12px]">내용</label>
                </div>
                <textarea
                  name="comment"
                  className="form-input block w-[100%] p-[8px] h-[180px] border border-[#d5d5d5] rounded-md"
                  rows={7}
                  minLength={10}
                  placeholder={"공지 사항 내용을 작성해주세요."}
                  ref={(el) => (inputRef.current[3] = el)}
                  onChange={onchange}
                ></textarea>
              </div>
            </div>
          </div>
          <CommentSendBtn
            onClick={() => {
              sendNotificat(restaurant.restaurantId);
            }}
          >
            공지 사항 입력 완료
          </CommentSendBtn>
          {/* </div> */}
        </div>
      </Drawer>
    </MainContents>
  );
};

export default Notifications;

const MainContents = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 47px);
  overflow: auto;
  margin-top: 47px;
`;
const AddBtn = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 55px;
  height: 55px;
  background-color: #ff3d00;
  border-radius: 50%;
`;

const CommentSendBtn = styled.button`
  border-radius: 6px;
  line-height: 47px;
  text-align: center;
  font-size: 14px;
  width: 100%;
  background-color: #ff3d00;
  color: #fff;
`;

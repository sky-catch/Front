import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import styled from "styled-components";
import { CancelReservation } from "../respository/reservation";
const Visitcomponent = ({ itemList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: cancelList, data } = CancelReservation();
  const setTime = (time) => {
    var week = new Array("일", "월", "화", "수", "목", "금", "토");
    const dayTime = time.split("T");

    const isDate = dayTime[0].replaceAll("-", ".");
    const isTime = dayTime[1].slice(0, 5);
    const setDay = new Date(dayTime[0]).getDay();
    const isDay = week[setDay];
    return `${isDate} (${isDay})•${isTime}`;
  };

  const timeGap = (time) => {
    const remainTime = Math.ceil(time / (1000 * 60 * 60 * 24));
    if (remainTime < 0) {
      return `D+${remainTime * -1}`;
    } else if (remainTime > 0) {
      return `D-${remainTime}`;
    } else {
      return `D-DAY`;
    }
  };

  const toggleDrawer = (e) => {
    setIsOpen((prevState) => !prevState);
  };

  const cancelItem = (id) => {
    cancelList(id);
    window.location.replace("/mydining/my");
  };
  return (
    <>
      <div className=" py-[20px] px-[16px] bg-white rounded-[10px] shadow-lg min-h-[180px] relative mb-[15px]">
        <span className="text-[#666] text-[12px] bg-[#f4f4f4] py-[3px] px-[8px] rounded-full">
          {itemList.status === "PLANNED"
            ? timeGap(new Date(itemList.time.split("T")[0]) - new Date())
            : itemList.status === "DONE"
            ? "방문 완료"
            : "예약 취소"}
        </span>
        {itemList.status === "PLANNED" && (
          <span
            className="text-[#666] text-[12px] float-right"
            onClick={() => {
              toggleDrawer();
            }}
          >
            예약취소
          </span>
        )}
        <div className="flex mt-3">
          <div className=" size-[64px] rounded-md bg-slate-500 mr-[10px]"></div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold">
              {itemList.restaurantName}
            </span>
            <span className="text-[#666] text-[12px]">
              {itemList.restaurantCategory} • {itemList.restaurantAddress}
            </span>
            <span className="text-[#ff3d00] text-[14px]">{`${setTime(
              itemList.time
            )}•${itemList.numberOfPeople}명`}</span>
          </div>
        </div>
        <span className=" text-center text-[#727272] text-[12px] block mt-[15px]">
          {itemList.memo}
        </span>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className="drawer-box"
        size="270px"
      >
        <div className="container">
          <span className="text-[#000] text-[18px] font-bold py-[10px] block">
            예약을 취소하시겠어요?
          </span>

          <div className=" grid grid-cols-3 gap-y-[10px] py-[15px] mt-[10px] border-solid border-y-[1px] border-[#cacaca]">
            <em className="text-[#727272] text-[12px] ">매장</em>
            <span className="col-span-2 text-[#3a3a3a] text-[14px] ">
              {itemList.restaurantName}
            </span>
            <em className="text-[#727272] text-[12px] ">예약일시</em>
            <span className="col-span-2 text-[#ff3d00] text-[14px] ">{`${setTime(
              itemList.time
            )}`}</span>
            <em className="text-[#727272] text-[12px] ">인원수</em>
            <span className="col-span-2 text-[#3a3a3a] text-[14px] ">{`${itemList.numberOfPeople}명`}</span>
          </div>

          <div>
            <CloseBtn
              left={"left"}
              type="button"
              open={isOpen}
              onClick={() => {
                toggleDrawer();
                // toggleDrawerInfor();
              }}
            >
              취소하지 않음
            </CloseBtn>
            <CloseBtn
              right={"right"}
              type="button"
              open={isOpen}
              onClick={() => {
                toggleDrawer();
                cancelItem(itemList.reservationId);
                // toggleDrawerInfor();
              }}
            >
              예약 취소
            </CloseBtn>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Visitcomponent;

const CloseBtn = styled.button`
  padding: 0 5%;
  width: 43%;
  margin: 0 auto;
  height: 48px;
  border-width: 1px;
  line-height: 46px;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  display: block;
  position: absolute;
  bottom: 20px;
  ${
    (props) =>
      props.right === "right" &&
      "right: 20px; color: #fff;  border-color: #ff3d00;  background-color: #ff3d00;"
    // props.left ==='left' && ("left: 20px; color: #000;")
  }
  ${(props) =>
    // props.right ==='right' && ("right: 20px; color: #fff;  border-color: #ff3d00;  background-color: #ff3d00;")
    props.left === "left" &&
    "left: 20px; color: #000;"} // ? "right: 20px; color: #fff;  border-color: #ff3d00;  background-color: #ff3d00;"
      // : "left: 20px; color: #000;"}
`;

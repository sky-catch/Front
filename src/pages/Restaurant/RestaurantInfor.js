import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import styled from "styled-components";
const RestaurantInfor = ({ isInforOpen, restaurant, toggleDrawerInfor }) => {
  console.log(restaurant);
  if (!restaurant) return;
  return (
    <div>
      <Drawer
        open={isInforOpen}
        // onClose={toggleDrawer}
        direction="bottom"
        className="drawer-box container"
        size="620px"
      >
        <span className="h-[45px] leading-[45px] block font-bold text-center text-[20px]">
          {restaurant.name}
        </span>
        <div className="">
          <div className="py-[10px]">
            <span className="text-[16px] font-semibold mb-[5px] block">
              전화번호
            </span>
            <a
              className=" flex gap-x-[5px] text-[14px]"
              href={`tel:${restaurant.phone}`}
            >
              <i className="icon phoneIcon"></i>
              {restaurant.phone}
            </a>
          </div>
          <div className="py-[10px]">
            <span className="text-[16px] font-semibold mb-[5px] block">
              매장소개
            </span>
            <span className="text-[14px] text-[#515151]">
              {restaurant.content}
            </span>
          </div>
          <div className="py-[10px]">
            <span className="text-[16px] font-semibold mb-[5px] block">
              영업시간
            </span>
            <span className="text-[14px] text-[#515151]">
              월 ~ 금 :{" "}
              {restaurant.openTime.slice(0, 5) +
                " ~ " +
                restaurant.closeTime.slice(0, 5)}
              (Last Order : {restaurant.lastOrderTime.slice(0, 5)}) <br />
              주말 :{" "}
              {restaurant.openTime.slice(0, 5) +
                " ~ " +
                restaurant.closeTime.slice(0, 5)}
              (Last Order : {restaurant.lastOrderTime.slice(0, 5)})
            </span>
          </div>
          <div className="py-[10px]">
            <span className="text-[16px] font-semibold mb-[5px] block">
              편의시설
            </span>
            <span className="text-[14px] text-[#515151]"></span>
          </div>
        </div>

        <CloseBtn type="button" open={isInforOpen} onClick={toggleDrawerInfor}>
          닫기
        </CloseBtn>
      </Drawer>
    </div>
  );
};

export default RestaurantInfor;
const CloseBtn = styled.button`
  padding: 0 5%;
  width: 90%;
  margin: 0 auto;
  height: 48px;
  border-color: #d5d5d5;
  border-width: 1px;
  line-height: 46px;
  border-radius: 6px;
  box-sizing: border-box;
  display: block;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
`;

import React from "react";
import styled from "styled-components";
const DialogComponent = ({ item }) => {
  return (
    <div
      className={`px-[10px] py-[10px] flex gap-x-[12px] cursor-pointer relative ${
        item.read === false ? "read-icon" : ""
      }`}
    >
      <div className=" size-[70px] rounded-[12px] overflow-hidden">
        <img className="" src={item.restaurantImg} />
      </div>
      <div className="flex flex-col">
        <span className="text-[16px]">{item.restaurantTitle}</span>
        <ItemContents className="text-[#7c7c7c] text-[13px]">
          {item.roomContents}
        </ItemContents>
      </div>
      <span className=" absolute top-[10px] right-[10px] text-[#b3b3b3] text-[12px]">
        {item.roomDate}
      </span>
    </div>
  );
};

export default DialogComponent;

const ItemContents = styled.span`
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;

  width: 260px;
`;

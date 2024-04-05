import React from "react";
import styled from "styled-components";
const ChatPopup = () => {
  const onExit = () => {};

  const onCancel = () => {};
  return (
    <div className="absolute w-[230px] h-[170px] bg-white rounded-md top-0 left-0 bottom-0 right-0 m-auto overflow-hidden">
      <div className="h-[120px] text-center text-[#6d6d6d] text-[14px] font-light flex items-center justify-center">
        <span className="">
          채팅방을 나가면 대화내용이 <br />
          모두 삭제되고 채팅목록에서도 <br /> 사라집니다.
        </span>
      </div>
      <div className="">
        <ButtonItem type="button" exit className="" onClick={onExit}>
          나가기
        </ButtonItem>
        <ButtonItem type="button" className="" onClick={onCancel}>
          취소
        </ButtonItem>
      </div>
    </div>
  );
};

export default ChatPopup;
const ButtonItem = styled.button`
  width: 50%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  ${(props) =>
    props.exit
      ? "background-color:#d7d7d7; color:#333;"
      : "background-color:#ff3d00; color:#fff;"};
`;

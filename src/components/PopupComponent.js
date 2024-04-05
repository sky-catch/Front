import React from "react";
import styled from "styled-components";
import ChatPopup from "../pages/Dialog/ChatPopup";
const PopupComponent = () => {
  return (
    <Popup className="">
      <ChatPopup></ChatPopup>
    </Popup>
  );
};

export default PopupComponent;

const Popup = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
`;

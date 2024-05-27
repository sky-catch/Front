import { QueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { getChatRoom } from "../../respository/reservation";
import { getRestaurant } from "../../respository/restaurant";

const ChatRoom = () => {
  // const message = useRef();
  const location = useLocation();
  const [isMessage, setIsMessage] = useState("");
  // 웹 소켓 연결 이벤트
  // : "ws://15.164.89.177:8080/chat";

  let name = new URLSearchParams(location.search).get("name");
  let roomId = new URLSearchParams(location.search).get("id");

  const chatRoomId = roomId;
  const memberChat = true;
  const token = sessionStorage.getItem("token");
  // const socket = io("http://localhost:3000", {
  // const socket = io(`${window.location.origin}`, {
  const socket = io("http://15.164.89.177:8080/chat", {
    reconnection: true,
    reconnectionAttempts: 5,
    extraHeaders: {
      Authorization: `Bearer ${token}`, // 여기서 token은 획득한 인증 토큰입니다.
      chatRoomId: String(chatRoomId),
      memberchat: String(memberChat),
    },
  });

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  socket.on("message", (message) => {
    console.log("Received message:", message);
    // 여기에서 메시지를 처리하거나 상태를 업데이트할 수 있습니다.
  });

  const sendMessage = (e) => {
    e.preventDefault(); // 폼 제출 이벤트 기본 동작 방지
    if (!isMessage.trim()) {
      return;
    }
    socket.emit("message", isMessage);

    // 메시지 입력 상태 초기화
    setIsMessage("");
  };
  const queryClient = new QueryClient();
  const {
    data: chatRoomList,
    isLoding: roomLoding,
    isError,
  } = useQuery({
    queryKey: ["chatRoomList", 1],
    queryFn: () => {
      console.log("chatRoomId", chatRoomId);
      return getChatRoom(chatRoomId)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const {
    data: restaurant,
    isLoding: restaurantLoding,
    isError: restaurantError,
  } = useQuery({
    queryKey: ["restaurantName"],
    queryFn: () => {
      return getRestaurant(name);
    },
  });

  if (!chatRoomList || !restaurant) return;
  if (restaurantLoding || roomLoding) {
    return <Loading></Loading>;
  }
  console.log("restaurant", restaurant);
  return (
    <ChatBox>
      <div className=" min-h-[40px] container border-solid  leading-[40px] border-b-[#d4d4d4] border-b-[1px]">
        {name}
      </div>
      <div className="w-[calc(100vw-40px)] px-[7px] py-[4px] top-[50px] bg-white rounded-lg absolute left-0 right-0 mx-[auto] shadow-md">
        <span className="text-[12px] text-center">
          영업 시간 :
          {String(restaurant.openTime).slice(0, 5) +
            " ~ " +
            String(restaurant.closeTime).slice(0, 5) +
            " (LastOrder : " +
            String(restaurant.lastOrderTime).slice(0, 5) +
            ")"}
        </span>
      </div>
      <div className="chat-wrap bg-[#F6F6F6] container">
        <MessageBox
          id="messages"
          className=" flex flex-col gap-y-[7px] overflow-scroll"
        >
          {chatRoomList.chatList.map((item, index) => {
            return (
              <div key={index}>
                {item.content != null && (
                  <div
                    className={`w-full  h-auto flex  items-end gap-x-[5px] ${
                      item.memberChat ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`${
                        item.memberChat
                          ? " rounded-l-lg rounded-br-lg float-right"
                          : "rounded-bl-lg rounded-r-lg float-left"
                      } p-[7px] bg-[#fff] w-fit max-w-[70%] shadow-md`}
                    >
                      {item.content}
                    </div>

                    <span className=" text-[12px]">
                      {(String(item.updatedDate).split("T")[1].slice(0, 2) > 12
                        ? "오후 "
                        : "오전 ") +
                        String(item.updatedDate).split("T")[1].slice(0, 5)}
                    </span>
                    <span
                      className={`${
                        item.readChat ? " hidden" : " block"
                      } size-[6px] rounded-full bg-[#ff3d00] mb-[5px]`}
                    ></span>
                  </div>
                )}
              </div>
            );
          })}
        </MessageBox>
        <div className=" h-[47px] container bg-[#ff3d00] rounded-lg">
          <form name="publish" className=" flex">
            <input
              type="text"
              name="message"
              value={isMessage}
              maxLength="50"
              onChange={(e) => {
                setIsMessage(e.target.value);
              }}
              className=" w-[calc(100%-47px)] bg-[#ff3d00] text-[#fff] caret-white"
            />
            <button
              className="size-[47px] block text-[#fff]"
              onClick={sendMessage}
            >
              전송
            </button>
          </form>
        </div>
      </div>
    </ChatBox>
  );
};

export default ChatRoom;

const ChatBox = styled.div`
  height: calc(100vh - 47px);
  margin-top: 47px;
  position: relative;
  & > .chat-wrap {
    height: calc(100% - 40px);
  }
`;

const MessageBox = styled.div`
  /* height: 100%; */

  box-sizing: border-box;
  padding: 10px 0px !important;
  height: calc(100% - 47px);
  /* margin-top: 47px; */
  & > div:first-child {
    margin-top: 40px;
  }
`;

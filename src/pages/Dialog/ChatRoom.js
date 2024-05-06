import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import io from "socket.io";
// import io from "socket.io-client";
import styled from "styled-components";
import { getRestaurant } from "../../respository/restaurant";
// import quer
import { getChatRoom } from "../../respository/reservation";

const ChatRoom = () => {
  const [roomInfor, setRoomInfor] = useState();
  const location = useLocation();

  // 웹 소켓 연결 이벤트
  // : "ws://15.164.89.177:8080/chat";

  let name = new URLSearchParams(location.search).get("name");
  // let name = location.search.split("=");
  useEffect(() => {
    setRoomInfor(location.state);
    console.log("roomInfor", location);
  }, []);

  const chatRoomId = location.state.chatRoomId;
  const memberChat = true;
  const token = sessionStorage.getItem("token");
  console.log(chatRoomId);
  // const socket = io("http://localhost:3000/chat", {
  //   transports: ["websocket"],
  //   timeout: 30000,
  //   reconnectionAttempts: 2,
  // });

  // socket.on("connect_error", (error) => {
  //   console.error("Socket.io 연결 에러:", error);
  // });

  // socket.on("connect", () => {
  //   console.log("서버와 연결되었습니다.");
  // });
  // socket.on("disconnect", () => {
  //   console.log("서버와의 연결이 끊어졌습니다.");
  // });
  // socket.on("message", (data) => {
  //   console.log("서버로부터 메시지 수신:", data);
  // });

  // 서버로 메시지 전송
  // socket.emit("message", "안녕하세요, 서버!");
  // GetChatRoom()
  //   .then((res) => {
  //     console.log("res", res);
  //   })
  //   .catch((error) => {
  //     console.log("error", error);
  // socket.onclose = (event) => console.log(`Closed ${event.code}`);
  // GetChatRoomListRes()
  //   .then((res) => {
  //     console.log("res", res);
  //   })
  //   .catch(() => {
  //     console.log();
  //   });
  // }, []);

  // console.log(String(item.updatedDate).split("T")[1].slice(0, 2));
  const queryClient = new QueryClient();
  const {
    data: chatRoomList,
    isLoding: roomLoding,
    isError,
  } = useQuery({
    queryKey: ["chatRoomList", 1],
    queryFn: () => {
      return getChatRoom(chatRoomId)
        .then((res) => {
          console.log("res", res);
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
      return getRestaurant(new URLSearchParams(location.search).get("name"));
    },
  });

  if (!chatRoomList || !restaurant) return;

  return (
    <ChatBox>
      <div className=" min-h-[40px] container border-solid  leading-[40px] border-b-[#d4d4d4] border-b-[1px]">
        {location.state.restaurantName}
      </div>
      <div className="w-[calc(100vw-40px)] px-[7px] py-[4px] top-[50px] bg-white rounded-lg absolute left-0 right-0 mx-[auto] shadow-md">
        <span className="text-[12px] text-center">
          영업 시간 :{" "}
          {String(restaurant.data.openTime).slice(0, 5) +
            " ~ " +
            String(restaurant.data.closeTime).slice(0, 5) +
            " (LastOrder : " +
            String(restaurant.data.lastOrderTime).slice(0, 5) +
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
                    {console.log("item", item)}
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
              maxLength="50"
              className=" w-[calc(100%-47px)] bg-[#ff3d00] text-[#fff] caret-white"
            />
            <input
              className=" size-[47px] block text-[#fff]"
              type="submit"
              value="전송"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
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

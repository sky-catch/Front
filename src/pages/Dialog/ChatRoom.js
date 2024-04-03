import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styled from "styled-components";
// import { io } from "socket.io-client";
// import quer
import { GetChatRoom } from "../../respository/reservation";
const ChatRoom = () => {
  // 웹 소켓 연결 이벤트
  // : "ws://15.164.89.177:8080/chat";

  useEffect(() => {
    // 소켓 서버의 주소에 맞게 변경
    // console.log(require("ws")); ws://15.164.89.177:8080/chat
    // const socket = io("http://15.164.89.177:8080", {
    //   path: "/chat",
    //   transports: ["websocket"],
    //   upgrade: false,
    //   timeout: 30000,
    //   reconnectionAttempts: 5,
    //   reconnection: true,
    //   forceNew: true,
    //   rejectUnauthorized: false,
    //   autoConnect: true,
    //   extraHeaders: {
    //     Authorization:
    //       "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN5a29yQGtha2FvLmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMjA0NzA0NiwiZXhwIjoxNzEyMTMzNDQ2fQ.NRv7W4vKtnikTjLzFEhC7ybS86ORTis1TPgsm4R9P1KLl4gEzNCiXHOH_FNkHpGtuslTlazifTt7Zi4LrBqnXQ",
    //     chatRoomId: 6,
    //     memberChat: true,
    //   },
    // }).on("connect_error", (error) => {
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
  }, []);
  useEffect(() => {
    // GetChatRoom("6")
    //   .then((res) => {
    //     console.log("res", res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const queryClient = new QueryClient();
  const { data, isLoding, isError } = useQuery({
    queryKey: ["chatRoomList"],
    queryFn: () => {
      return GetChatRoom("6")
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  console.log("responseData", data);
  if (!data) return;
  return (
    <ChatBox>
      <div className="h-[30px] container">매장 이름</div>
      <div className="chat-wrap ">
        <MessageBox
          id="messages"
          className="container flex flex-col gap-y-[7px]"
        >
          {
            // console.log(data.chatList)

            data.chatList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-full  h-auto flex  items-end gap-x-[5px] ${
                    item.memberChat ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`${
                      item.memberChat
                        ? " rounded-l-lg rounded-br-lg float-right"
                        : "rounded-bl-lg rounded-r-lg float-left"
                    } p-[5px] bg-[#ff3c0095] w-fit max-w-[70%]`}
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
              );
            })
          }
        </MessageBox>
        <div className=" h-[47px] container bg-[#ff3d00]">
          <form name="publish" className=" flex">
            <input
              type="text"
              name="message"
              maxLength="50"
              className=" w-[calc(100%-47px)] bg-[#ff3d00] text-[#fff]"
            />
            <input
              className=" size-[47px] block text-[#fff]"
              type="submit"
              value="Send"
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
  & > .chat-wrap {
    height: calc(100% - 30px);
  }
  /* height: inherit; */
`;

const MessageBox = styled.div`
  /* height: 100%; */
  height: calc(100% - 47px);
  /* margin-top: 47px; */
`;

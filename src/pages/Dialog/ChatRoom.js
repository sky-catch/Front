import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { getChatRoom } from "../../respository/reservation";
import { getRestaurant } from "../../respository/restaurant";

const ChatRoom = () => {
  // const ws = useRef();
  const location = useLocation();
  const [isMessage, setIsMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // 웹 소켓 연결 이벤트
  // : "ws://15.164.89.177:8080/chat";
  let name = new URLSearchParams(location.search).get("name");
  let chatRoomId = new URLSearchParams(location.search).get("id");
  const memberChat = true;
  const token = sessionStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
    chatRoomId: chatRoomId,
    memberChat: memberChat,
  };

  // const ws = new WebSocket("ws://localhost:8080/chat");
  const ws = new WebSocket("ws://15.164.89.177:8080/chat");
  useEffect(() => {
    // 연결 성공 시 실행될 콜백 함수

    ws.onopen = () => {
      console.log("WebSocket connected");

      // 연결 후 서버에 데이터를 전송할 수 있음
      // ws.send("Hello, server!");
    };

    // 메시지 수신 시 실행될 콜백 함수
    ws.onmessage = (event) => {
      console.log("Received message from server:", event.data);
      const container = document.getElementById("messages");
      // console.log("container", container);
      // const htmlContent = `<div><div class="w-full  h-auto flex  items-end gap-x-[5px] "><div class="rounded-bl-lg rounded-r-lg float-left p-[7px] bg-[#fff] w-fit max-w-[70%] shadow-md">${event.data}</div><span class=" text-[12px]">오전 09:56</span><span class=" hidden size-[6px] rounded-full bg-[#ff3d00] mb-[5px]"></span></div></div>`;
      // container.innerHTML = htmlContent;
    };

    // 연결 종료 시 실행될 콜백 함수
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // 에러 발생 시 실행될 콜백 함수
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("안녕", isMessage);
    ws.send(isMessage);
    setIsMessage("");
  };
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
  useEffect(() => {
    if (!chatRoomList) return;
    chatRoomList.chatList.map((item) => {
      setMessages((pevList) => [...pevList, item]);
    });
  }, [chatRoomList]);

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
          {messages &&
            messages.map((item, index) => {
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
                        {(String(item.updatedDate).split("T")[1].slice(0, 2) >
                        12
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

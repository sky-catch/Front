import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

  // 연결이 열리면 실행될 콜백 함수를 설정합니다

  useEffect(() => {
    fetch("http://15.164.89.177:8080/chat", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        chatRoomId: chatRoomId,
        memberChat: memberChat.toString(),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP 요청에 실패했습니다.");
        }
        // HTTP 요청이 성공하면 웹 소켓 연결을 설정합니다.
        const socket = new WebSocket("ws://15.164.89.177:8080/chat");
        console.log("socket", socket);
        // 웹 소켓 이벤트를 처리합니다.
        socket.onopen = () => {
          console.log("WebSocket 연결이 열렸습니다.");

          // 연결이 열리면 인증 정보를 보냅니다.
          socket.send(
            JSON.stringify({
              type: "authorization",
              token: `Bearer ${token}`,
              chatRoomId: chatRoomId,
              memberChat: memberChat,
            })
          );
        };

        socket.onmessage = (event) => {
          console.log("서버로부터 메시지를 수신했습니다:", event.data);
          // 메시지를 수신하면 상태를 업데이트합니다.
          // setMessages(prevMessages => [...prevMessages, event.data]);
        };

        socket.onclose = () => {
          console.log("WebSocket 연결이 닫혔습니다.");
        };

        socket.onerror = (error) => {
          console.error("WebSocket 에러:", error);
          console.error(
            "Error details:",
            JSON.stringify(error, Object.getOwnPropertyNames(error))
          );
        };

        // 컴포넌트가 언마운트될 때 WebSocket 연결을 닫습니다.
        return () => {
          // socket.close();
        };
      })
      .catch((error) => {
        console.error("HTTP 요청 에러:", error);
      });
  }, []);
  // const sendMessage = (e) => {
  //   e.preventDefault(); // 폼 제출 이벤트 기본 동작 방지
  //   if (!isMessage.trim()) {
  //     return;
  //   }
  //   socket.emit("message", isMessage); // 이미 연결된 소켓을 사용하여 메시지 전송
  //   setIsMessage(""); // 메시지 입력 상태 초기화
  // };

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
              // onClick={sendMessage}
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

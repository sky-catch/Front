import { QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import{useQ}
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DialogComponent from "../../components/DialogComponent";
import { GetChatRoomListRes } from "../../respository/reservation";
import Carousel from "../Home/Carousel";

function sortDate1(list) {
  const sorted_list = list.sort(function (a, b) {
    return (
      new Date(b.lastChatDate).getTime() - new Date(a.lastChatDate).getTime()
    );
  });
  return sorted_list;
}

function Dialog() {
  const [isLogin, SetIsLogin] = useState(false);
  const queryClient = new QueryClient();
  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      SetIsLogin(true);
    }
  }, [isLogin]);

  const {
    data: roomList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["roomList"],
    queryFn: async () => {
      try {
        const result = await GetChatRoomListRes();
        return result;
      } catch (err) {
        console.log("Error >>", err.message);
        throw err;
      }
    },
    enabled: isLogin,
  });

  // console.log("data", data);
  // FIXME 절대 지우지말것.
  if (!isLogin) {
    return (
      <DialogContents className="">
        <div className=" h-full">
          <span className="text-[#515151] text-[16px] font-light block text-center pt-[45%]">
            로그인 후 이용해 주세요.
          </span>
          <Link to={"/account"}>
            <LoginBtn type="button">로그인 하러가기</LoginBtn>
          </Link>
        </div>
      </DialogContents>
    );
  }

  if (isLoading) {
    return <div>로딩....</div>;
  }

  if (error) {
    return <div>error....</div>;
  }

  //FIXME 채팅방이 없을때 작업하기 위해 일부로 없앴음

  return (
    <DialogContents className="">
      {roomList.length > 0 ? (
        <>
          <div className="flex sticky top-[47px] h-[48px] items-center bg-white z-10 container">
            <form className="keyword-search keyword-search-main h-[36px]">
              <input
                className="pl-[44px] pr-[15px] text-xs h-[30px]"
                type="text"
                placeholder="가게 이름 검색"
              ></input>
            </form>
          </div>
          <div className="mt-[5px] container">
            <div className="">
              {roomList &&
                roomList.map((item, index) => {
                  return (
                    <DialogComponent key={index} item={item}></DialogComponent>
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        <div className=" flex flex-col  h-[100%] justify-end gap-y-[50px]">
          <div className="h-[500px] w-[100%]  flex-col gap-y-[20px] flex items-center justify-center ">
            <img
              className=" size-[70px]"
              src={require("../../assets/icons/empty.png")}
            />
            <span className=" text-[#47566A] text-[16px] text-bold ">
              현재 채팅방이 없습니다.
            </span>
          </div>
          <div className="">
            <Carousel />
          </div>
        </div>
      )}
    </DialogContents>
  );
}
export default Dialog;
const DialogContents = styled.div`
  /* padding-bottom: 48px; */
  box-sizing: border-box;
  height: calc(100vh - 47px - 49px);
  margin-top: 47px;
`;
const LoginBtn = styled.button`
  padding: 0 5%;
  width: 90%;
  margin: 0 auto;
  height: 48px;
  border-color: #ff3d00;
  border-width: 1px;
  line-height: 46px;
  border-radius: 6px;
  box-sizing: border-box;
  display: block;
  text-align: center;
  background-color: #ff3d00;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 87px;
  color: #fff;
`;

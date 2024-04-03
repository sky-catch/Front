import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
// import{useQ}
import styled from "styled-components";
import DialogComponent from "../../components/DialogComponent";
import { GetChatRoomListRes } from "../../respository/reservation";
const RoomItem = [
  {
    id: 1,
    roomContents: "채팅 내용01",
    restaurantTitle: "가게 이름01",
    read: false,
    roomDate: "2024/02/03",
    restaurantImg:
      "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
  },
  {
    id: 5,
    roomContents:
      "채팅 내용05 채팅 내용05 채팅 내용05 채팅 내용05 채팅 내용05 채팅 내용05 채팅 내용05 채팅 내용05",
    restaurantTitle: "가게 이름05",
    read: true,
    roomDate: "2024/02/02",
    restaurantImg:
      "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
  },
  {
    id: 3,
    roomContents: "채팅 내용03",
    restaurantTitle: "가게 이름03",
    read: false,
    roomDate: "2024/02/01",
    restaurantImg:
      "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
  },
  {
    id: 4,
    roomContents: "채팅 내용04",
    restaurantTitle: "가게 이름04",
    read: true,
    roomDate: "2024/02/03",
    restaurantImg:
      "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
  },
  {
    id: 2,
    roomContents: "채팅 내용02",
    restaurantTitle: "가게 이름02",
    read: false,
    roomDate: "2024/02/02",
    restaurantImg:
      "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
  },

  {
    id: 6,
    roomContents: "채팅 내용06",
    restaurantTitle: "가게 이름06",
    read: true,
    roomDate: "2024/02/04",
    restaurantImg:
      "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
  },
  {
    id: 7,
    roomContents: "채팅 내용07",
    restaurantTitle: "가게 이름07",
    read: true,
    roomDate: "2024/02/05",
    restaurantImg:
      "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
  },
  {
    id: 8,
    roomContents: "채팅 내용08",
    restaurantTitle: "가게 이름08",
    read: false,
    roomDate: "2024/02/05",
    restaurantImg:
      "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
  },
];
function sortDate1(list) {
  const sorted_list = list.sort(function (a, b) {
    return new Date(b.roomDate).getTime() - new Date(a.roomDate).getTime();
  });
  return sorted_list;
}

function Dialog() {
  const [isItems, SetIsItems] = useState([]);
  const [messageItem, SetMessageItems] = useState([]);
  const [isLogin, SetIsLogin] = useState(false);

  const queryClient = new QueryClient();
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      SetIsLogin(true);
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["roomList"],
    queryFn: () => {
      return GetChatRoomListRes()
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.log("error >>>", error);
        });
    },
    // queryFn: GetChatRoomListRes,
  });

  if (isLoading) {
    return <div>로딩....</div>;
  }

  if (error) {
    // return <div>error....</div>
  }
  console.log("data", data);
  // useEffect(() => {
  // SetIsItems(RoomItem);
  // if (isItems.length > 0) {
  //   let test01 = Object.groupBy(isItems, ({ read }) =>
  //     read === true ? "true" : "false"
  //   );
  //   let test11 = sortDate1(test01["false"]);
  //   let test22 = sortDate1(test01["true"]);
  //   SetMessageItems(test11.concat(test22));
  // }
  // }, []);

  return (
    <DialogContents className="">
      {!isLogin ? (
        <div className=" h-full">
          <span className="text-[#515151] text-[16px] font-light block text-center pt-[45%]">
            로그인 후 이용해 주세요.
          </span>
          <LoginBtn type="button">로그인 하러가기</LoginBtn>
        </div>
      ) : (
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
              {data &&
                data.map((item, index) => {
                  return (
                    <DialogComponent
                      key={item.id}
                      item={item}
                    ></DialogComponent>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </DialogContents>
  );
}
export default Dialog;
const DialogContents = styled.div`
  padding-bottom: 48px;
  box-sizing: border-box;
  height: calc(100vh - 47px);
  /* min-height: calc(100vh - 47px); */
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

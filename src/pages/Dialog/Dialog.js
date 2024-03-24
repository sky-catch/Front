import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DialogComponent from "../../components/DialogComponent";
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
// export default function Dialog() {
function Dialog() {
  const [isItems, SetIsItems] = useState([]);
  const [messageItem, SetMessageItems] = useState([]);
  useEffect(() => {
    // GetChatRoomListRes()
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // SetIsItems(RoomItem);
    // if (isItems.length > 0) {
    //   let test01 = Object.groupBy(isItems, ({ read }) =>
    //     read === true ? "true" : "false"
    //   );
    //   let test11 = sortDate1(test01["false"]);
    //   let test22 = sortDate1(test01["true"]);
    //   SetMessageItems(test11.concat(test22));
    // }
  }, []);

  useEffect(() => {
    // console.log(messageItem);
  }, [messageItem]);

  return (
    <DialogContents className="">
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
          {messageItem &&
            messageItem.map((item, index) => {
              return (
                <DialogComponent key={item.id} item={item}></DialogComponent>
              );
            })}
        </div>
      </div>
    </DialogContents>
  );
}
export default Dialog;
const DialogContents = styled.div`
  padding-bottom: 48px;
  box-sizing: border-box;
  min-height: calc(100vh - 47px);
  /* height: calc(100vh - 47px); */
  margin-top: 47px;
  /* overflow: auto; */
`;

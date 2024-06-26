import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import restauranticon from "../assets/icons/not_restaurant.png";
function dataReset(date) {
  if (!date) return;

  const nowDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDay()).padStart(2, "0");

  const yesterdayDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDay() - 1).padStart(2, "0");
  const chatRoomDate = date.split("T")[0];

  if (nowDate == chatRoomDate) {
    return (
      String(new Date().getHours()).padStart(2, "0") +
      ":" +
      String(new Date().getMinutes()).padStart(2, "0")
    );
  } else if (nowDate == yesterdayDate) {
    return "어제";
  } else {
    return (
      chatRoomDate.split("-")[1] + "월" + chatRoomDate.split("-")[2] + "일"
    );
  }
}
const DialogComponent = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`py-[10px] flex gap-x-[12px] cursor-pointer relative ${
        item.hasNewChat ? "read-icon" : ""
      } custom-class`}
      onClick={(e) => {
        navigate(
          `/chat?name=${encodeURIComponent(
            item.restaurantName
          )}&id=${encodeURIComponent(item.chatRoomId)}`
        );
      }}
    >
      <div className=" size-[60px] rounded-full overflow-hidden border border-[#d5d5d5]">
        <img
          className="size-[60px] "
          src={
            item.restaurantImage === null
              ? restauranticon
              : item.restaurantImage
          }
        />
      </div>
      <div className="flex flex-col w-[calc(100%-72px)] py-[8px]">
        <span className="text-[16px]">{item.restaurantName}</span>
        <ItemContents className="text-[#7c7c7c] text-[13px]">
          {item.lastChat}
        </ItemContents>
      </div>
      <span className=" absolute top-[10px] right-[10px] text-[#b3b3b3] text-[12px]">
        {item.lastChat
          ? dataReset(item.lastChatDate)
          : dataReset(item.createdDate)}
      </span>
    </div>
  );
};

export default DialogComponent;

const ItemContents = styled.span`
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;

  width: 260px;
`;

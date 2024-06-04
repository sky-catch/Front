import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CreateChatRoomItem } from "../../respository/reservation";
const RestaurantInfor = ({ isInforOpen, restaurant, toggleDrawerInfor }) => {
  const [moveChat, setMoveChat] = useState(false);
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState("");
  const { mutate: createChatRoom, loading, error, data } = CreateChatRoomItem();
  const openChatRoom = (id) => {
    setMoveChat(true);
    setRestaurantId(id);
  };
  useEffect(() => {
    console.log("moveChatRoom", moveChat);
    if (moveChat) {
      createChatRoom(restaurantId);
    }
  }, [moveChat]);

  if (!restaurant) return;
  return (
    <div>
      <Drawer
        open={isInforOpen}
        direction="bottom"
        className="drawer-box container"
        size="620px"
      >
        <span className="h-[45px] leading-[45px] block font-bold text-center text-[20px]">
          {restaurant.name}
        </span>
        <div className=" h-[calc(100%-88px-45px)] overflow-auto">
          <div className="py-[10px]">
            <span className="text-[16px] font-semibold mb-[5px] block">
              전화번호
            </span>
            <a
              className=" flex gap-x-[5px] text-[14px] items-center"
              href={`tel:${restaurant.phone}`}
            >
              <i className="icon phoneIcon"></i>
              {restaurant.phone}
            </a>
          </div>
          {restaurant.content && (
            <div className="py-[10px]">
              <span className="text-[16px] font-semibold mb-[5px] block">
                매장소개
              </span>
              <span className="text-[14px] text-[#515151]">
                {restaurant.content}
              </span>
            </div>
          )}

          <div className="py-[10px]">
            <span className="text-[16px] font-semibold mb-[5px] block">
              영업시간
            </span>
            <span className="text-[14px] text-[#515151]">
              월 ~ 금 :{" "}
              {restaurant.openTime.slice(0, 5) +
                " ~ " +
                restaurant.closeTime.slice(0, 5)}
              (Last Order : {restaurant.lastOrderTime.slice(0, 5)}) <br />
              주말 :{" "}
              {restaurant.openTime.slice(0, 5) +
                " ~ " +
                restaurant.closeTime.slice(0, 5)}
              (Last Order : {restaurant.lastOrderTime.slice(0, 5)})
            </span>
          </div>

          <>
            {restaurant.facilities.length > 0 ? (
              <div className="py-[10px]">
                <span className="text-[16px] font-semibold mb-[5px] block">
                  편의시설
                </span>
                <div className=" grid grid-cols-4 mt-[15px]">
                  {restaurant.facilities.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className=" flex flex-col items-center gap-y-[12px]"
                      >
                        <img
                          alt={`${item.name}`}
                          src={`${item.path}`}
                          className=" size-[30px]"
                        ></img>
                        <span className="text-[12px] font-medium">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        </div>
        <div>
          <CloseBtn
            left={"left"}
            type="button"
            open={isInforOpen}
            onClick={() => {
              toggleDrawerInfor();
              sessionStorage.getItem("token")
                ? openChatRoom(restaurant.restaurantId)
                : navigate("/account");
            }}
          >
            사장님과 대화하기
          </CloseBtn>
          <CloseBtn
            right={"right"}
            type="button"
            open={isInforOpen}
            onClick={toggleDrawerInfor}
          >
            확인
          </CloseBtn>
        </div>
      </Drawer>
    </div>
  );
};

export default RestaurantInfor;
const CloseBtn = styled.button`
  padding: 0 5%;
  width: 43%;
  margin: 0 auto;
  height: 48px;
  border-width: 1px;
  line-height: 46px;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  display: block;
  position: absolute;
  bottom: 20px;
  ${
    (props) =>
      props.right === "right" &&
      "right: 20px; color: #fff;  border-color: #ff3d00;  background-color: #ff3d00;"
    // props.left ==='left' && ("left: 20px; color: #000;")
  }
  ${(props) =>
    // props.right ==='right' && ("right: 20px; color: #fff;  border-color: #ff3d00;  background-color: #ff3d00;")
    props.left === "left" &&
    "left: 20px; color: #000;"} // ? "right: 20px; color: #fff;  border-color: #ff3d00;  background-color: #ff3d00;"
      // : "left: 20px; color: #000;"}
`;

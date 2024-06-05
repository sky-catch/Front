import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "react-modern-drawer/dist/index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { RestaurantsAll } from "../../States/LoginState";
import Loading from "../../components/Loading";
import Visitcomponent from "../../components/Visitcomponent";
import { GetReservationRes } from "../../respository/restaurant";
import RecommendPage from "./RecommendPage";
const stateList = [
  {
    id: "PLANNED",
    title: "방문예정",
  },
  {
    id: "DONE",
    title: "방문완료",
  },
  {
    id: "CANCEL",
    title: "취소/노쇼",
  },
];

export default function MyDining() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginState, setLoginState] = useState(false);
  const [listSelect, setListSelect] = useState("PLANNED");
  const queryClient = new QueryClient();
  const restaurantValue = useRecoilValue(RestaurantsAll);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const moveLoginPage = () => {
    if (sessionStorage.getItem("token") == null) {
      navigate("/account");
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      setLoginState(false);
    } else {
      setLoginState(true);
    }
  }, [loginState]);

  const itemClick = (index) => {
    switch (index) {
      case 0:
        setListSelect("PLANNED");
        break;
      case 1:
        setListSelect("DONE");
        break;
      default:
        setListSelect("CANCEL");
        break;
    }
  };

  const itemContainer = () => {
    if (listSelect === "PLANNED") {
      return (
        <div className="mt-[70px]">
          <span className="block text-center mb-[20px] text-[#c8c8c8] text-[16px] text-bold">
            방문예정이 없습니다. <br /> 캐치테이블을 통해 편리하게 예약해
            보세요!
          </span>
          <Link
            className="flex-row flex items-center justify-center gap-[4px] text-[#0091ff] text-medium cursor-pointer"
            to={"/"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.56604 2.0625C5.28489 2.0625 2.625 4.72239 2.625 8.00354C2.625 11.2847 5.28489 13.9446 8.56604 13.9446C10.0188 13.9446 11.3498 13.4231 12.382 12.5572L14.4359 14.4396C14.7413 14.7195 15.2157 14.6988 15.4956 14.3935C15.7755 14.0881 15.7548 13.6137 15.4494 13.3338L13.4012 11.4565C14.0974 10.4834 14.5071 9.29132 14.5071 8.00354C14.5071 4.72239 11.8472 2.0625 8.56604 2.0625ZM4.125 8.00354C4.125 5.55082 6.11332 3.5625 8.56604 3.5625C11.0188 3.5625 13.0071 5.55082 13.0071 8.00354C13.0071 10.4563 11.0188 12.4446 8.56604 12.4446C6.11332 12.4446 4.125 10.4563 4.125 8.00354Z"
                fill="#0091FF"
              ></path>
            </svg>
            레스토랑 둘러보기
          </Link>
        </div>
      );
    } else if (listSelect === "DONE") {
      return (
        <div className="mt-[70px]">
          <span className="block text-center mb-[20px] text-[#c8c8c8] text-[16px] text-bold">
            예약 히스토리가 없습니다.
            <br /> {"즐거운 미식 생활을 함께해요 :" + ")"}
          </span>
          <Link
            className="flex-row flex items-center justify-center gap-[4px] text-[#0091ff] text-medium cursor-pointer"
            to={"/"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.56604 2.0625C5.28489 2.0625 2.625 4.72239 2.625 8.00354C2.625 11.2847 5.28489 13.9446 8.56604 13.9446C10.0188 13.9446 11.3498 13.4231 12.382 12.5572L14.4359 14.4396C14.7413 14.7195 15.2157 14.6988 15.4956 14.3935C15.7755 14.0881 15.7548 13.6137 15.4494 13.3338L13.4012 11.4565C14.0974 10.4834 14.5071 9.29132 14.5071 8.00354C14.5071 4.72239 11.8472 2.0625 8.56604 2.0625ZM4.125 8.00354C4.125 5.55082 6.11332 3.5625 8.56604 3.5625C11.0188 3.5625 13.0071 5.55082 13.0071 8.00354C13.0071 10.4563 11.0188 12.4446 8.56604 12.4446C6.11332 12.4446 4.125 10.4563 4.125 8.00354Z"
                fill="#0091FF"
              ></path>
            </svg>
            레스토랑 둘러보기
          </Link>
        </div>
      );
    } else {
      return (
        <span className="block text-center mb-[20px] mt-[100px] text-[#c8c8c8] text-[16px] text-bold">
          취소/노쇼하신 예약이 없습니다.
          <br />
          건강한 예약문화 만들기,
          <br />
          앞으로도 함께해 주세요!
        </span>
      );
    }
  };

  const {
    data: reservationRes,
    isLoading,
    error,
  } = useQuery({
    queryKey: [listSelect],
    queryFn: () => {
      return GetReservationRes(listSelect)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    enabled: loginState,
  });
  // console.log("restaurantValue", restaurantValue);
  console.log("reservationRes", reservationRes);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <MyDiningContents className="">
      <TabContens className="tab-contens">
        {loginState ? (
          <div className="login-tab">
            <section className={`reserve-wrap`}>
              <div className=" mb-[20px] container">
                <div className="flex gap-x-[10px] py-[10px] sticky top-0 bg-white z-[99] left-0">
                  {stateList.map((item, index) => {
                    return (
                      <span
                        key={item.id}
                        onClick={() => itemClick(index)}
                        className={` ${
                          listSelect === item.id
                            ? " rounded-full border-black "
                            : " text-[#666] border-transparent"
                        } px-[15px] box-border font-medium text-[14px] leading-[32px] h-8 cursor-pointer  border-[1px]`}
                      >
                        {item.title}
                      </span>
                    );
                  })}
                </div>
                {reservationRes && reservationRes.length > 0
                  ? reservationRes.map((item, index) => {
                      return (
                        <Visitcomponent
                          key={index}
                          itemList={item}
                        ></Visitcomponent>
                      );
                    })
                  : itemContainer()}
              </div>
            </section>
          </div>
        ) : (
          <div className="logout-tab">
            <section className={`reserve-wrap`}>
              <div
                className=" my-[30px] cursor-pointer"
                onClick={moveLoginPage}
              >
                <img
                  src={require("../../assets/icons/mydining-img1-v3.png")}
                ></img>
              </div>
              <RecommendPage
                title={"미쉐린 가이드 2024"}
                pageList={restaurantValue}
                toggleDrawerBox={toggleDrawer}
              ></RecommendPage>
              <RecommendPage
                title={"캐치테이블 ON"}
                pageList={restaurantValue}
                toggleDrawerBox={toggleDrawer}
              ></RecommendPage>
            </section>
          </div>
        )}
      </TabContens>
    </MyDiningContents>
  );
}

const MyDiningContents = styled.div`
  padding-bottom: 48px;
  box-sizing: border-box;
  min-height: calc(100vh - 47px);
  margin-top: 47px;
`;
const TabContens = styled.div`
  overflow: auto;
  height: calc(100vh - 48px - 49px);
`;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
const stateList = [
  {
    id: "0",
    title: "방문예정",
  },
  {
    id: "1",
    title: "방문완료",
  },
  {
    id: "2",
    title: "취소/노쇼",
  },
];
const alarmList = [
  {
    id: "0",
    title: "빈자리알림",
  },
  {
    id: "1",
    title: "예약 오픈 알림",
  },
];
export default function MyDining() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);
  const [isSelect, setIsSelect] = useState(true);
  const [listSelect, setListSelect] = useState(0);
  const [alarmSelect, setAlarmSelect] = useState(0);
  const menuClick = (e, index) => {
    if (index === 0) {
      setIsSelect(true);
      setAlarmSelect(0);
    } else {
      setListSelect(0);
      setIsSelect(false);
      moveLoginPage();
    }
  };

  const moveLoginPage = () => {
    if (localStorage.getItem("id") === "") {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("id") === "") {
      setLoginState(false);
    } else {
      setLoginState(true);
    }
  }, [loginState]);

  const itemClick = (index) => {
    setListSelect(index);
  };
  const alarmClick = (index) => {
    setAlarmSelect(index);
  };
  const itemContainer = () => {
    if (listSelect === 0) {
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.56604 2.0625C5.28489 2.0625 2.625 4.72239 2.625 8.00354C2.625 11.2847 5.28489 13.9446 8.56604 13.9446C10.0188 13.9446 11.3498 13.4231 12.382 12.5572L14.4359 14.4396C14.7413 14.7195 15.2157 14.6988 15.4956 14.3935C15.7755 14.0881 15.7548 13.6137 15.4494 13.3338L13.4012 11.4565C14.0974 10.4834 14.5071 9.29132 14.5071 8.00354C14.5071 4.72239 11.8472 2.0625 8.56604 2.0625ZM4.125 8.00354C4.125 5.55082 6.11332 3.5625 8.56604 3.5625C11.0188 3.5625 13.0071 5.55082 13.0071 8.00354C13.0071 10.4563 11.0188 12.4446 8.56604 12.4446C6.11332 12.4446 4.125 10.4563 4.125 8.00354Z"
                fill="#0091FF"
              ></path>
            </svg>
            레스토랑 둘러보기
          </Link>
        </div>
      );
    } else if (listSelect === 1) {
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

  const alarmContainer = () => {
    if (alarmSelect === 0) {
      return (
        <div className="mt-[30px]">
          <div className=" bg-[#f9f9f9] py-[20px] px-[30px]">
            <span className="text-[14px] flex items-center">
              <i className="icon bg-[url('./assets/icons/alarm-normal.svg')] w-[16px] h-[16px]"></i>
              이번 달
              <em className="text-[#0091ff] font-bold ml-[7px]">
                남은 신청 수 10개 (0개 사용)
              </em>
            </span>
            <small className="text-[#666] text-[12px] ml-[27px]">
              매월 1일 ~ 말일까지 10개의 빈자리 알림 신청이 가능합니다.
            </small>
          </div>
          <div className="how-to">
            <p class=" text-center  font-16 bold text-[#c8c8c8] text-[16px] font-medium mt-[70px] mb-[30px]">
              신청하신 빈자리 알림이 없습니다.
              <br />
              원하는 레스토랑에 빈자리 알림을 신청하고
              <br />
              예약 취소 발생 시 알림을 받아보세요.
            </p>
            <div className=" border-t p-[30px]">
              <span className="text-[14px] font-bold">
                빈자리 알림 이용 방법
                <p className="text-[#ccc] text-[12px] mt-[6px]">
                  예약 취소 등의 이유로 마감된 시간에 빈자리가 발생하게 <br />
                  되면 알림을 발송해 알려드립니다.
                </p>
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <span className="block text-center mb-[20px] mt-[80px] text-[#c8c8c8] text-[16px] font-bold">
          신청하신 예약 오픈 알림 내역이 존재하지 않습니다.
        </span>
      );
    }
  };
  return (
    <MyDiningContents className="">
      <ul className="tab-menu sticky top-[0px] left-0 bg-white">
        <li
          className={`w-[50%] leading-[48px] text-center ${
            isSelect ? " active" : ""
          }`}
          onClick={(e) => menuClick(e, 0)}
        >
          나의 예약
        </li>
        <li
          className={`w-[50%] leading-[48px] text-center ${
            isSelect ? "" : "active"
          }`}
          onClick={(e) => menuClick(e, 1)}
        >
          {loginState ? "나의 알림" : "빈자리 알람"}
        </li>
      </ul>
      <div className="tab-contens">
        {loginState ? (
          <div className="login-tab">
            {isSelect ? (
              <section className={`reserve-wrap`}>
                <div className="__banner">
                  <img src={require("../../assets/icons/banner.webp")}></img>
                </div>
                <div className=" my-[30px] container">
                  <div className="flex gap-x-[10px]">
                    {stateList.map((item, index) => {
                      return (
                        <span
                          key={item.id}
                          onClick={() => itemClick(index)}
                          className={` ${
                            listSelect === index
                              ? " rounded-full border-black "
                              : " text-[#666] border-transparent"
                          } px-[15px] box-border font-medium text-[14px] leading-[32px] h-8 cursor-pointer  border-[1px]`}
                        >
                          {item.title}
                        </span>
                      );
                    })}
                  </div>
                  {itemContainer()}
                </div>
              </section>
            ) : (
              <section className={`recommend-wrap`}>
                <div className="__banner">
                  <img src={require("../../assets/icons/banner.webp")}></img>
                </div>
                <div className=" my-[30px] ">
                  <div className="flex gap-x-[10px] container">
                    {alarmList.map((item, index) => {
                      return (
                        <span
                          key={item.id}
                          onClick={() => alarmClick(index)}
                          className={` ${
                            alarmSelect === index
                              ? " rounded-full border-black "
                              : " text-[#666] border-transparent"
                          } px-[15px] box-border font-medium text-[14px] leading-[32px] h-8 cursor-pointer  border-[1px]`}
                        >
                          {item.title}
                        </span>
                      );
                    })}
                  </div>
                  {alarmContainer()}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="logout-tab">
            {isSelect ? (
              <section className={`reserve-wrap`}>
                <div
                  className=" my-[30px] cursor-pointer"
                  onClick={moveLoginPage}
                >
                  <img
                    src={require("../../assets/icons/mydining-img1-v3.png")}
                  ></img>
                </div>
              </section>
            ) : (
              <section className={`recommend-wrap`}></section>
            )}
          </div>
        )}
      </div>
    </MyDiningContents>
  );
}

const MyDiningContents = styled.div`
  height: calc(100vh - 49px);
  padding-top: 47px;
  box-sizing: border-box;
  overflow: auto;
`;

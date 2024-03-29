import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HeaderItem = [
  {
    id: 0,
    name: "home",
    to: "/",
  },
  {
    id: 1,
    name: "search",
    to: "/search",
  },
  {
    id: 3,
    name: "mydining/my",
    to: "/mydining/my",
  },
  {
    id: 4,
    name: "mydining",
    to: "/mydining",
  },
  {
    id: 5,
    name: "account",
    to: "/account",
  },
];
const Header = () => {
  const location = useLocation().pathname;
  useEffect(() => {}, [location]);
  console.log(useLocation().pathname === "/ct/shop");
  const onClickBack = () => {
    window.history.back();
  }
  const headerContent = () => {
    switch (location) {
      case "/":
        return (
          <div className="header-wrapper flex justify-between w-full px-[20px] items-center">
            <div className="header-left items-center">
              <h1 className="w-[30px] h-[30px] bg-main bg-[30px] bg-no-repeat mr-[8px]"></h1>
            </div>
            <form className="keyword-search keyword-search-main">
              <input
                className="pl-[44px] pr-[15px] text-xs h-[30px]"
                type="text"
                placeholder="지역, 음식, 매장명 검색"
              ></input>
            </form>
            <div className="header-right flex">
              <a className="w-[30px] h-[30px] bg-bookmark bg-[30px] bg-no-repeat ml-[8px]"></a>
              <button className="w-[30px] h-[30px] bg-alert bg-[30px] bg-no-repeat ml-[8px]"></button>
            </div>
          </div>
        );
      case "/ct/shop":
        return (
          <div className="header-tp-wrapper flex justify-between w-full px-[20px] items-center opacity-100 h-[48px]">
            <div className="header-left items-center flex gap-[12px]">
              <a className="back header-icon" onClick={onClickBack}>뒤로</a>
              <a className="tohome header-icon">홈</a>
            </div>
            <div className="header-right flex gap-[12px]">
              <button className="bookmark header-icon">저장</button>
              <a className="share header-icon">공유</a>
            </div>
          </div>
        );
      case "/search":
        return (
          <div className="">
            <h1 className="text-xl h-[47px] leading-[47px] font-bold px-[20px]">
              검색하기
            </h1>
          </div>
        );
      case "/dialog":
        return (
          <div className="">
            <h1 className="text-xl h-[47px] leading-[47px] font-bold px-[20px]">
              채팅하기
            </h1>
          </div>
        );
      case "/mydining/my":
        return (
          <div className="">
            <h1 className="text-xl h-[47px] leading-[47px] font-bold px-[20px]">
              마이다이닝
            </h1>
          </div>
        );
      case "/mypage" :
        return (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left flex items-center">
              <h1 className="text-xl h-[47px] leading-[47px] font-bold">
                마이페이지
              </h1>
            </div>
            <div className="header-right flex items-center ml-auto">
              <button type="button" className="btn-icon alarm"></button>
              <button type="button" className="btn-icon setting"></button>
            </div>
          </div>
        );
      case "/account":
        return localStorage.getItem("token") !== null ? (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left flex items-center">
              <h1 className="text-xl h-[47px] leading-[47px] font-bold">
                마이페이지
              </h1>
            </div>
            <div className="header-right flex items-center ml-auto">
              <button type="button" className="btn-icon alarm"></button>
              <button type="button" className="btn-icon setting"></button>
            </div>
          </div>
        ) : (
          ""
        );
      default:
        break;
    }
  };
  return (
    <header className={`${location === "/ct/shop" ? "bg-transparent" : ""} `}>
      {headerContent()}
    </header>
  );
};

export default Header;

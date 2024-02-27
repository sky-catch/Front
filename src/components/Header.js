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
    id: 2,
    name: "review",
    to: "/review",
  },
  {
    id: 3,
    name: "mydining",
    to: "/mydining",
  },
  {
    id: 4,
    name: "login",
    to: "/login",
  },
];
const Header = () => {
  const location = useLocation().pathname;
  useEffect(() => {
    console.log(`${location}`);
  }, [location]);

  const headerContent = () => {
    switch (location) {
      case "/" :
        return (
          <div className="flex justify-between w-full h-[47px] px-[20px] items-center">
            <div className="header-left items-center">
              <h1 className="w-[30px] h-[30px] bg-main bg-[30px] bg-no-repeat mr-[8px]"></h1>
            </div>
            <form className="keyword-search keyword-search-main">
              <input className="pl-[44px] pr-[15px] text-xs h-[30px]" type="text" placeholder="지역, 음식, 매장명 검색"></input>
            </form>
            <div className="header-right flex">
              <a className="w-[30px] h-[30px] bg-bookmark bg-[30px] bg-no-repeat ml-[8px]"></a>
              <button className="w-[30px] h-[30px] bg-alert bg-[30px] bg-no-repeat ml-[8px]"></button>
            </div>
          </div>
        );
      case "/mydining":
        return (
          <div className="">
            <h1 className="text-xl h-[47px] leading-[47px] font-bold px-[20px]">
              마이다이닝
            </h1>
          </div>
        );

      default:
        break;
    }
  };
  return <header>{headerContent()}</header>;
};

export default Header;

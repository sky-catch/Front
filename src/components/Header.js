import React, { useEffect, useState } from "react";
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
  const [isMenu, setIsPopUp] = useState({});
  const location = useLocation().pathname;
  useEffect(() => {
    console.log(`${location}`);
  }, [location]);
  const menuClick = () => {};
  const headerContent = () => {
    switch (location) {
      case "/mydining":
        return (
          <div className="">
            <h1 className="text-xl h-[47px] leading-[47px] font-bold px-[20px]">
              마이다이닝
            </h1>
            <ul className="tab-menu">
              <li
                className=" w-[50%] leading-[48px] text-center"
                onClick={menuClick}
              >
                나의 예약
              </li>
              <li
                className="w-[50%] leading-[48px] text-center "
                onClick={menuClick}
              >
                빈자리 알림
              </li>
            </ul>
          </div>
        );

      default:
        break;
    }
  };
  return <header>{headerContent()}</header>;
};

export default Header;

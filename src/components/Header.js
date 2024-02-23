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

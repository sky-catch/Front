import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { LoginState } from "../States/LoginState";
import { getUserInfo } from "../respository/userInfo.js"

const navItem = [
  {
    id: 0,
    name: "home",
    to: "/",
    image: "dock-home",
    imageOn: "dock-home-on",
    selectItem: false,
  },
  {
    id: 1,
    name: "search",
    to: "/search",
    image: "dock-search",
    imageOn: "dock-search-on",
    selectItem: false,
  },
  {
    id: 2,
    name: "dialog",
    to: "/dialog",
    image: "dock-review",
    imageOn: "dock-review-on",
    selectItem: false,
  },
  {
    id: 3,
    name: "mydining",
    to: "/mydining/my",
    image: "dock-mydining",
    imageOn: "dock-mydining-on",
    selectItem: false,
  },
  {
    id: 4,
    name: "account",
    to: "/account",
    image: "dock-account",
    imageOn: "dock-account-on",
    selectItem: false,
  },
];

const Navbar = () => {
  const location = useLocation().pathname;
  const [user, setUser] = useRecoilState(LoginState);
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
  });


  useEffect(() => {
    // recoil 및 user 세팅
    setUser((prevUser)=> ({
      ...prevUser,
      nickname : userData?.nickname,
      name : userData?.name,
      owner : userData?.owner,
      profileImg : userData?.profileImageUrl,
      saveRestaurants : userData?.savedRestaurants,
      reviews : userData?.reviews,
    }));
  }, [userData]);

  return (
    <NavbarContents
      className={`${
        location === "/ct/shop" ||
        location === "/chat" ||
        location === "/my/myshop" ||
        location === "/owner" ||
        location.indexOf("my/myshop/edit") > 0 ||
        location === "/my/myshop/notifications" ||
        location === "/paymentpage"
          ? " hidden"
          : " block"
      } z-50`}
    >
      <NavbarWrap>
        {navItem.map((item) => {
          return (
            <Link to={item.to} key={item.id}>
              <i>
                {item.to === location ? (
                  <img
                    src={require("../assets/icons/" + item.imageOn + ".svg")}
                  />
                ) : (
                  <img
                    src={require("../assets/icons/" + item.image + ".svg")}
                  />
                )}
              </i>
            </Link>
          );
        })}
      </NavbarWrap>
    </NavbarContents>
  );
};

export default Navbar;
const NavbarContents = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  border-top: 1px solid #f9f9f9;
  margin: 0 auto;
  width: 100%;
  max-width: 480px;
  left: 0;
`;
const NavbarWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 48px;
  background-color: #fff;
  && i,
  a {
    width: 100%;
    display: block;
    height: 48px;
  }
  && i {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  && img {
    width: 32px;
    height: 32px;
  }
`;

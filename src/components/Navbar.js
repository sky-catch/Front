import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Navbar = () => {
  return (
    <NavbarContents>
      <NavbarWrap>
        <Link to="/">
          <i>
            <img src={require("../assets/icons/dock-home.svg").default} />
          </i>
        </Link>
        <Link to="/search">
          <i>
            <img src={require("../assets/icons/dock-search.svg").default} />
          </i>
        </Link>
        <Link to="/review">
          <i>
            <img src={require("../assets/icons/dock-review.svg").default} />
          </i>
        </Link>
        <Link to="/mydining">
          <i>
            <img src={require("../assets/icons/dock-mydining.svg").default} />
          </i>
        </Link>
        <Link to="/account">
          <i>
            <img src={require("../assets/icons/dock-account.svg").default} />
          </i>
        </Link>
      </NavbarWrap>
    </NavbarContents>
  );
};

export default Navbar;
const NavbarContents = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
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

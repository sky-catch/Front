import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import MyPage from "./MyPage";
function Account() {
  const [userInfo, setUserInfo] = useState(false);
  const location = useLocation();
  const myData = { ...location.state };
  useEffect(() => {
    if (Object.keys(myData).length === 0) {
      setUserInfo(false);
    } else {
      setUserInfo(true);
    }
  }, [myData]);

  //로그인 상태가 아닐때
  if (!userInfo) {
    return <Login></Login>;
  } else {
    // 로그인 할때
    return <MyPage></MyPage>;
  }
}

export default Account;

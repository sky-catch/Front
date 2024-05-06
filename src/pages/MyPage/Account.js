import React, { useEffect, useState } from "react";
import Login from "./Login";
import MyPage from "./MyPage";
function Account() {
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {

    if (sessionStorage.getItem("token") === null) {
      setUserInfo(false);
    } else {
      setUserInfo(true);
    }
  }, []);

  //로그인 상태가 아닐때
  if (userInfo === false) {
    return <Login></Login>;
  } else {
    // 로그인 할때
    return <MyPage></MyPage>;
  }
}

export default Account;

import React, { useEffect, useState } from "react";
import Login from "./Login";
import MyPage from "./MyPage";
function Account() {
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMTk4MzI3NiwiZXhwIjoxNzEyMDY5Njc2fQ.bnx3m5LJfqZFMRj81F_SK8qw67c6tVmjTpWGHQnaL8H7-mCV50q3GzmB_TO0OPvuTRG0nKUAlegZsod1UHuluA");
    if (localStorage.getItem("token") === null) {
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

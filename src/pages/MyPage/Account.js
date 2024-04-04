import React, { useEffect, useState } from "react";
import Login from "./Login";
import MyPage from "./MyPage";
function Account() {
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMjI0MTkwOCwiZXhwIjoxNzEyMzI4MzA4fQ.95cjFXM0XY-oy-oXFikRT_4R6hB_4y-4jJYXK3VuXTLLV0Uwt98QVPCwrDMVLooIeMF2ApOvQronHMDIuvqMOw");
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

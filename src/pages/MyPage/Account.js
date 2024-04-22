import React, { useEffect, useState } from "react";
import Login from "./Login";
import MyPage from "./MyPage";
function Account() {
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    // localStorage.setItem("token", "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMzEwMDMzMCwiZXhwIjoxNzEzMTg2NzMwfQ.aMMvk3PnBzYIcDNrvOQ8eOWcZ08B5vLBYsFOjIBpwifQlPlM0myWmrfkWoRovsHQOvmDO6kKwPqghN0SK0nb6Q");
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

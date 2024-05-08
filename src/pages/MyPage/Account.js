import React, { useEffect, useState } from "react";
import Login from "./Login";
import MyPage from "./MyPage";
function Account() {
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    // localStorage.setItem("token", "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOmZhbHNlLCJpYXQiOjE3MTQzNTkwMjAsImV4cCI6MTcxNDQ0NTQyMH0.xWE4pGDywtq7lkLlBFeLO6rOAnTPtEydQfl1Vi-vH_Zk4UE95M34wjOKQ9X0VADCvbcuBR3S5JN5G8u--56QPg");
    // const user_token = JSON.parse(localStorage.getItem("token"));
    // console.log(localStorage.getItem("token"));
    if (sessionStorage.getItem("token") === null) {
      setUserInfo(false);
    } else {
      setUserInfo(true);
    }
    console.log(userInfo);
  }, []);

  //로그인 상태가 아닐때
  if (!userInfo) {
    return <Login></Login>;
  } else {
    // 로그인 할때
    return <MyPage></MyPage>;
  }
}

export default Account;

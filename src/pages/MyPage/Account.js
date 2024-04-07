import React, { useEffect, useState } from "react";
import Login from "./Login";
import MyPage from "./MyPage";
function Account() {
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMjQ5NjUyNCwiZXhwIjoxNzEyNTgyOTI0fQ.LY4RePR11OeSVhDvf7DYrNvTqs0lWV5TmK-tPGsSLIc3R4zic9ANQASF-YHINNo3LVCuKZ7IvYi2LzJMogYpmA");
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

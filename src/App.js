import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import { userInfoState } from "../../recoil/atoms/userState";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home/Home.js";
import EmptySlotGuide from "./pages/MyDining/EmptySlotGuide.js";
import MyDining from "./pages/MyDining/MyDining.js";
import Account from "./pages/MyPage/Account.js";
import KakoRedirectPage from "./pages/MyPage/KakoRedirectPage.js";
import Login from "./pages/MyPage/Login.js";
import MyPage from "./pages/MyPage/MyPage.js";
// import socket from "./server.js";
import Restaurant from "./pages/Restaurant/Restaurant.js";
// import RestaurantWrapper from "./pages/Restaurant/RestaurantWrapper.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dialog from "./pages/Dialog/Dialog.js";
import RestaurantSetting from "./pages/MyPage/RestaurantSetting.js";
function App() {
  // locasocket xlStorage.clear();
  // const socket
  // const socket = new WebSocket(`ws://15.164.89.177:8080/chat`, {
  //   header: {},
  // });
  // socket.addEventListener("open", () => {
  //   // connection이 open되면 아래 콘솔 출력
  //   console.log("Connected to Server 💫");
  // });

  // socket.addEventListener("message", (message) => {
  //   // 메세지를 받을 때마다 내용을 출력하는 message
  //   console.log("Just got this: ", message, "from the server");
  //   // message.data -> hi!!!
  // });

  // socket.addEventListener("close", () => {
  //   // 서버가 오프라인이 될때 아래 콘솔 출력
  //   console.log("Disconnect from Server 🔥");
  // });

  return (
    <div>
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/mydining/my`} element={<MyDining />} />
          <Route path="/dialog" element={<Dialog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route
            // path="/oauth/login/KAKAO"
            path="/oauth/redirected/kakao"
            element={<KakoRedirectPage />}
          />
          <Route path="/emptySlotGuide" element={<EmptySlotGuide />}></Route>
          {/* 네비바 변경 페이지 */}
          {/* <Route path="/ct" element={<RestaurantWrapper />} > */}
          <Route path="/ct/shop" element={<Restaurant />} />
          <Route path="/ct/my" element={<RestaurantSetting />} />
          {/* </Route> */}
        </Routes>
        <ReactQueryDevtools initialIsOpen={true} />
        <Navbar />
      </RecoilRoot>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import { userInfoState } from "../../recoil/atoms/userState";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import ChatRoom from "./pages/Dialog/ChatRoom.js";
import Home from "./pages/Home/Home.js";
import EmptySlotGuide from "./pages/MyDining/EmptySlotGuide.js";
import MyDining from "./pages/MyDining/MyDining.js";
import Account from "./pages/MyPage/Account.js";
import KakoRedirectPage from "./pages/MyPage/KakoRedirectPage.js";
import Login from "./pages/MyPage/Login.js";
import MyPage from "./pages/MyPage/MyPage.js";
import MyProfileInfo from "./pages/MyPage/MyProfileInfo.js";
import Restaurant from "./pages/Restaurant/Restaurant.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dialog from "./pages/Dialog/Dialog.js";
import RestaurantSetting from "./pages/MyPage/RestaurantSetting.js";
import RestaurantInfo from "./pages/MyPage/RestaurantInfo.js";
function App() {
  // 오류 발생

  // function sendMessage() {
  //   const message = document.getElementById("message").value;
  //   webSocket.send(message);
  // }

  return (
    <div>
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/mydining/my`} element={<MyDining />} />
          <Route path="/dialog" element={<Dialog />} />
          <Route path="/account" element={<Account />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="my" element={<MyPage />} />
          <Route path="my/myProfileInfo" element={<MyProfileInfo/>}/>
          <Route path="my/myshop" element={<RestaurantSetting />} />
          <Route path="my/myshop/edit" element={<RestaurantInfo />} />
          <Route
            // path="/oauth/login/KAKAO"
            path="/oauth/redirected/kakao"
            element={<KakoRedirectPage />}
          />
          <Route path="/emptySlotGuide" element={<EmptySlotGuide />}></Route>
          {/* 네비바 변경 페이지 */}
          {/* <Route path="/ct" element={<RestaurantWrapper />} > */}
          <Route path="/ct/shop" element={<Restaurant />} />
          {/* <Route path="/ct/my"  /> */}
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={true} />
        <Navbar />
      </RecoilRoot>
    </div>
  );
}

export default App;

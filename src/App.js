import { Route, Routes, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import ChatRoom from "./pages/Dialog/ChatRoom.js";
import Dialog from "./pages/Dialog/Dialog.js";
import Home from "./pages/Home/Home.js";
import EmptySlotGuide from "./pages/MyDining/EmptySlotGuide.js";
import MyDining from "./pages/MyDining/MyDining.js";
import Account from "./pages/MyPage/Account.js";
import KakoRedirectPage from "./pages/MyPage/KakoRedirectPage.js";
import Login from "./pages/MyPage/Login.js";
import MyPage from "./pages/MyPage/MyPage.js";
import MyProfileInfo from "./pages/MyPage/MyProfileInfo.js";
import Owner from "./pages/MyPage/Owner.js";
import RestaurantInfo from "./pages/MyPage/RestaurantInfo.js";
import RestaurantSetting from "./pages/MyPage/RestaurantSetting.js";
import ReserveForm from "./pages/Restaurant/ReserveForm.js";
import Restaurant from "./pages/Restaurant/Restaurant.js";
import ReviewList from "./pages/Restaurant/ReviewList.js";
import Search from "./pages/Search/Search.js";
import SearchTotal from "./pages/Search/SearchTotal.js";

function App() {
  // localStorage.clear();
  // localStorage.setItem(
  //   "token",
  //   `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN5a29yQGtha2FvLmNvbSIsImlzT3duZXIiOmZhbHNlLCJpYXQiOjE3MTQzOTA5NTEsImV4cCI6MTcxNDQ3NzM1MX0.YhETtTyHIA6QKjY3hJJTxg2i5dnFZnw8awYZDlsUB4KN7Yy06e6TP7UUgr4d8v3XAI3JDZadua0toABAeGFlxA`
  // );
  // localStorage.setItem(
  //   "data",
  //   JSON.stringify({
  //     usersDTO: {
  //       id: 0,
  //       nickname: "string",
  //       profileImageUrl: "string",
  //       email: "string",
  //       name: "string",
  //       status: "ACTIVE",
  //       owner: false,
  //     },
  //   })
  // );
  const location = useLocation();
  if (useLocation().pathname === "/ct/shop") {
    document.title = `${location.state}`;
  } else {
    document.title = "즐거운 미식 생활의 시작, 캐치테이블";
  }
  return (
    <div>
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />}></Route>
          <Route path="/search/total" element={<SearchTotal />}></Route>
          <Route path={`/mydining/my`} element={<MyDining />} />
          <Route path="/dialog" element={<Dialog />} />
          <Route path="/account" element={<Account />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="my" element={<MyPage />} />
          <Route path="my/myProfileInfo" element={<MyProfileInfo />} />
          <Route path="my/myshop" element={<RestaurantSetting />} />
          <Route path="my/myshop/edit" element={<RestaurantInfo />} />
          <Route
            path="/oauth/redirected/kakao"
            element={<KakoRedirectPage />}
          />
          <Route path="/emptySlotGuide" element={<EmptySlotGuide />}></Route>
          {/* 네비바 변경 페이지 */}
          {/* <Route path="/ct" element={<RestaurantWrapper />} > */}
          {/* <Route path={`/ct/shop/`} element={<Restaurant />} /> */}
          <Route path="/ct/shop/:restaurantName" element={<Restaurant />} />
          <Route
            path="/ct/shop/:restaurantName/reviewList"
            element={<ReviewList />}
          />
          <Route path="/ct/shop/reservation/form" element={<ReserveForm />} />
          <Route path="/ct/my" element={<RestaurantSetting />} />
          <Route path={`/chat`} element={<ChatRoom />} />
          <Route path="/owner" element={<Owner />}></Route>
        </Routes>
        <Navbar />
      </RecoilRoot>
    </div>
  );
}

export default App;

import { useState } from "react";
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
import Notifications from "./pages/MyPage/Notifications.js";
import Owner from "./pages/MyPage/Owner.js";
import RestaurantInfo from "./pages/MyPage/RestaurantInfo.js";
import RestaurantSetting from "./pages/MyPage/RestaurantSetting.js";
import ReserveForm from "./pages/Restaurant/ReserveForm.js";
import Restaurant from "./pages/Restaurant/Restaurant.js";
import ReviewList from "./pages/Restaurant/ReviewList.js";
import Search from "./pages/Search/Search.js";
import SearchList from "./pages/Search/SearchList.js";
import SearchTotal from "./pages/Search/SearchTotal.js";

function App() {
  const [search, setSearch] = useState({});
  const updateSearch = (param) => {
    setSearch(param);
  };

  /* 카카오 로그인 구현 시 뜨는 에러로 인해 현재 sessionStorage에 임시저장하여 기능 구현중 */

  sessionStorage.setItem(
    "token",
    'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6ImZyb250QGZyb250LmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxNTk0NzUyMSwiZXhwIjoxNzE2MDMzOTIxfQ.OpKDND3GKa4mVCQZumGEPMUL5bAy_9nF2fSjNYfsMiHYp7MXNf9tLjOG-Kv7-MVSWX-URuMRHXmdsV5ceFPrLQ'
  );
  sessionStorage.setItem(
    "data",
    JSON.stringify({
      "id": 1,
      "nickname": "홍길동3",
      "profileImageUrl": "https://skyware-toy-project-imgae-bucket.s3.ap-northeast-2.amazonaws.com/image/319a423b-ee58-405a-9a10-0cee06f96dd5.jpg",
      "email": "hong@example.com",
      "name": "홍길동3",
      "status": "ACTIVE",
      "owner": true
    })
  );

  const location = useLocation();
  if (useLocation().pathname === "/ct/shop") {
    document.title = `${location.state}`;
  } else {
    document.title = "즐거운 미식 생활의 시작, 캐치테이블";
  }
  return (
    <div>
      <RecoilRoot>
        <Header setSearch={() => setSearch} updateSearch={updateSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />}></Route>
          <Route
            path="/search/total"
            element={<SearchTotal search={search} />}
          ></Route>
          <Route path="/search/list" element={<SearchList />}></Route>
          <Route path={`/mydining/my`} element={<MyDining />} />
          <Route path="/dialog" element={<Dialog />} />
          <Route path="/account" element={<Account />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="my" element={<MyPage />} />
          <Route path="my/myProfileInfo" element={<MyProfileInfo />} />
          <Route path="my/myshop" element={<RestaurantSetting />} />
          <Route path="my/myshop/edit/:text" element={<RestaurantInfo />} />
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
          <Route
            path="/my/myshop/notifications"
            element={<Notifications />}
          ></Route>
        </Routes>
        <Navbar />
      </RecoilRoot>
    </div>
  );
}

export default App;

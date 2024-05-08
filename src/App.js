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
    // console.log(param);
  };

  // sessionStorage.clear();
  sessionStorage.setItem(
    "token",
    `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN1cGVyc3V0ZTE0MkBnbWFpbC5jb20iLCJpc093bmVyIjp0cnVlLCJpYXQiOjE3MTUwNzkyODAsImV4cCI6MTcxNTE2NTY4MH0.Op4vetSTp-UPbSSodVxvpdPPA1RrT6bUhLzHTG8VhHjmZ3YcomaOoWrmRJA_XAeSWh6wV9cri8tzwWUPs5BLtg`
  );
  sessionStorage.setItem(
    "data",
    JSON.stringify({
      usersDTO: {
        id: 0,
        nickname: "string",
        profileImageUrl: "string",
        email: "string",
        name: "string",
        status: "ACTIVE",
        owner: false,
      },
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

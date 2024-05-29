import { useState, useEffect } from "react";
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
import { MenuList } from "./pages/Restaurant/MenuList.js";
import { PhotoList } from "./pages/Restaurant/PhotoList.js";
import ReserveForm from "./pages/Restaurant/ReserveForm.js";
import Restaurant from "./pages/Restaurant/Restaurant.js";
import ReviewList from "./pages/Restaurant/ReviewList.js";
import Search from "./pages/Search/Search.js";
import SearchList from "./pages/Search/SearchList.js";
import SearchTotal from "./pages/Search/SearchTotal.js";
import { getTestLogin } from "./respository/userInfo.js";

function App() {
  const [search, setSearch] = useState();
  const updateSearch = (param) => {
    setSearch(param);
  };

  // sessionStorage.setItem(
  //   "token",
  //   "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN1cGVyc3V0ZTE0MkBnbWFpbC5jb20iLCJpc093bmVyIjpmYWxzZSwiaWF0IjoxNzE2OTg3MTQwLCJleHAiOjE3MTcwNzM1NDB9.PQYbcEv1_dzq8aE1Foi-xVTeFSI8dMc1yqXlFO35X3pgoRybuUEZoYaeO_Z1aUvGxBUJ8uk49U5d1bCo660ZvA"
  // );

  // sessionStorage.setItem(
  //   "data",
  //   JSON.stringify({
  //     email: "sykor@kakao.com",
  //     id: 6,
  //     name: "조소연",
  //     nickname: "조소연",
  //     owner: true,
  //     profileImageUrl:
  //       "http://k.kakaocdn.net/dn/2afaP/btsE5DK6vhb/Gl1oZJKX0wN2tVbjpVeBLk/img_640x640.jpg",
  //     status: "ACTIVE",
  //   })
  // );


  useEffect(()=>{
    getTestLogin();
  },[])
  

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
          <Route path="/ct/shop/:restaurantName" element={<Restaurant />} />
          <Route
            path="/ct/shop/:restaurantName/reviewList"
            element={<ReviewList />}
          />
          <Route
            path="/ct/shop/:restaurantName/menuList"
            element={<MenuList />}
          />
          <Route
            path="/ct/shop/:restaurantName/photoList"
            element={<PhotoList />}
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

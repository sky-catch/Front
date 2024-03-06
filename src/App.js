import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import { userInfoState } from "../../recoil/atoms/userState";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import Dialog from "./pages/Dialog/Dialog.js";
import Home from "./pages/Home/Home.js";
import EmptySlotGuide from "./pages/MyDining/EmptySlotGuide.js";
import MyDining from "./pages/MyDining/MyDining.js";
import Account from "./pages/MyPage/Account.js";
import KakoRedirectPage from "./pages/MyPage/KakoRedirectPage.js";
import Login from "./pages/MyPage/Login.js";
import MyPage from "./pages/MyPage/MyPage.js";
function App() {
  // console.log("key", localStorage.getItem("id"));
  // console.log("key", JSON.parse(localStorage.getItem("data")));
  return (
    <div>
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/restaurant" element={<Restaurant />} /> */}
          <Route path="/mydining" element={<MyDining />} />
          <Route path="/dialog" element={<Dialog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route
            path="/oauth/redirected/kakao"
            element={<KakoRedirectPage />}
          />
          <Route path="/emptySlotGuide" element={<EmptySlotGuide />}></Route>
        </Routes>
        <Navbar />
      </RecoilRoot>
    </div>
  );
}

export default App;

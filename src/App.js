import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import { userInfoState } from "../../recoil/atoms/userState";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import Restaurant from "./pages//Restaurant/Restaurant.js";
import Home from "./pages/Home/Home.js";
import MyDining from "./pages/MyDining/MyDining.js";
import Account from "./pages/MyPage/Account.js";
import KakoRedirectPage from "./pages/MyPage/KakoRedirectPage.js";
import Login from "./pages/MyPage/Login.js";
import MyPage from "./pages/MyPage/MyPage.js";
import Review from "./pages/Review/Review.js";
function App() {
  // const [userInfo] = useRecoilState(userInfoState);
  // console.log("userInfo", userInfo);
  return (
    <div>
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/mydining" element={<MyDining />} />
          <Route path="/review" element={<Review />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route
            path="/oauth/redirected/kakao"
            element={<KakoRedirectPage />}
          />
        </Routes>
        <Navbar />
      </RecoilRoot>
    </div>
  );
}

export default App;

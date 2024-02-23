import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import Restaurant from "./pages//Restaurant/Restaurant.js";
import Home from "./pages/Home/Home.js";
import MyDining from "./pages/MyDining/MyDining.js";
import KakoRedirectPage from "./pages/MyPage/KakoRedirectPage.js";
import Login from "./pages/MyPage/Login.js";
import Review from "./pages/Review/Review.js";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/mydining" element={<MyDining />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kakako" target="_blank" element={<KakoRedirectPage />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;

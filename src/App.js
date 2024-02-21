import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Restaurant from "./pages//Restaurant/Restaurant.js";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import MyDining from "./pages/MyDining/MyDining.js";
import Review from "./pages/Review/Review.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/mydining" element={<MyDining />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;

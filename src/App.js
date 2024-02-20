import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Restaurant from "./pages//Restaurant/Restaurant.js";
import Home from "./pages/Home/Home.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;

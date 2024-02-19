import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from './pages/Home/Home.js'
import Restaurant from './pages//Restaurant/Restaurant.js'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/restaurant" element={<Restaurant/>}/>
      </Routes>
    </div>
  );
}

export default App;

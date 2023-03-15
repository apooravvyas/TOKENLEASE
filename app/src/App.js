import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Lending from "./components/Lending";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lending" element={<Lending />} />
        <Route path="/about" element={<About />} />
        <Route path="/profilie" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;

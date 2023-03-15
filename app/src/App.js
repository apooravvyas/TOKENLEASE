import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Lending from "./components/Lending";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lending" element={<Lending />} />
      </Routes>
    </>
  );
}

export default App;

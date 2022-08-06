import React from "react";
import "./assets/styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyMessage from "./components/VerifyMessage";
import SignMessage from "./components/SignMessage";
import Header from "./components/common/Header/Header";

function App() {
  return (
    <div className="main-app">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<SignMessage />} />
            <Route path="/verify" element={<VerifyMessage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

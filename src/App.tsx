import React, { createContext, useState } from "react";
import "./assets/styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyMessage from "./components/VerifyMessage";
import SignMessage from "./components/SignMessage";
import Header from "./components/common/Header/Header";
import { UserContext } from "./context/UserContext";

function App() {
  const [signMessageDetails, setSignMessageDetails] = useState({});
  return (
    <div className="main-app">
      <UserContext.Provider
        value={{ signMessageDetails, setSignMessageDetails }}
      >
        <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<SignMessage />} />
              <Route path="/verify" element={<VerifyMessage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;

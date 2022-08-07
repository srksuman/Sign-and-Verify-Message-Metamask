import React, { createContext, useState } from "react";
import "@assets/styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyMessage from "@components/VerifyMessage";
import SignMessage from "@components/SignMessage";
import Header from "@components/common/Header/Header";
import { SignMessageContext, VerifyMessageContext } from "@context/UserContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [signMessageDetails, setSignMessageDetails] = useState({});
  const [verifyMessageDetails, setVerifyMessageDetails] = useState({});
  return (
    <div className="main-app">
      <SignMessageContext.Provider
        value={{ signMessageDetails, setSignMessageDetails }}
      >
        <VerifyMessageContext.Provider
          value={{ verifyMessageDetails, setVerifyMessageDetails }}
        >
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<SignMessage />} />
              <Route path="/verify" element={<VerifyMessage />} />
            </Routes>
          </BrowserRouter>
        </VerifyMessageContext.Provider>
      </SignMessageContext.Provider>
    </div>
  );
}

export default App;

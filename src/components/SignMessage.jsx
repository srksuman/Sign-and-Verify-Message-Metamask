import { ethers } from "ethers";
import { useRef, useState, useContext } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { UserContext } from "../context/UserContext";

const SignMessage = () => {
  const trackMessage = useRef(null);
  const { signMessageDetails, setSignMessageDetails } = useContext(UserContext);
  const signMessage = async () => {
    const userMessage = trackMessage.current.value;
    if (userMessage.trim()) {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(userMessage.trim());
        console.log(signature);
        setSignMessageDetails({
          message: userMessage,
          address: address[0],
          signature,
        });
        trackMessage.current.value = "";
      } else {
        console.log("metamask dosent exists!!!");
      }
    } else {
      console.log("Empty message cannot be signed");
    }
  };
  const copyTheResult = (event) => {
    const value = event.target.attributes.getNamedItem("custom-value").value;
    window.navigator.clipboard.writeText(value);
  };
  return (
    <div className="sign-msg-wrapper">
      <textarea
        ref={trackMessage}
        className="sign-msg"
        name="textarea"
        id=""
        cols="60"
        rows="10"
      ></textarea>
      <button
        onClick={() => {
          signMessage();
        }}
        type="button"
        className="sign-btn"
      >
        Sign Message
      </button>
      {Object.keys(signMessageDetails).length > 0 && (
        <div className="sign-details">
          <div className="sign-address">
            <p>Address:</p>
            <p
              custom-value={signMessageDetails.address}
              onClick={(e) => {
                copyTheResult(e);
              }}
              className="address"
            >
              {`${signMessageDetails.address
                .toString()
                ?.slice(0, 4)}...${signMessageDetails.address
                .toString()
                ?.slice(-4)}`}{" "}
              <AiOutlineCopy />
            </p>
          </div>
          <div className="sign-message">
            <p>Message:</p>
            <p
              custom-value={signMessageDetails.message}
              onClick={(e) => {
                copyTheResult(e);
              }}
            >
              {signMessageDetails.message} <AiOutlineCopy />
            </p>
          </div>
          <div className="sign-signature">
            <p>Signature:</p>
            <p
              custom-value={signMessageDetails.signature}
              className="address"
              onClick={(e) => {
                copyTheResult(e);
              }}
            >
              {`${signMessageDetails.signature
                .toString()
                ?.slice(0, 4)}...${signMessageDetails.signature
                .toString()
                ?.slice(-4)}`}{" "}
              <AiOutlineCopy color="black" />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignMessage;

import { ethers } from "ethers";
import { useRef, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";

const SignMessage = () => {
  const trackMessage = useRef(null);
  const [details, setDetails] = useState({});
  const signMessage = async () => {
    const userMessage = trackMessage.current.value;
    console.log(userMessage);
    if (userMessage.trim()) {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = await provider.send("eth_requestAccounts", [])[0];
        const signer = provider.getSigner(address);
        const signature = await signer.signMessage(userMessage.trim());
        console.log(signature);
        setDetails({ message: userMessage, address, signature });
        trackMessage.current.value = "";
      } else {
        console.log("metamask dosent exists!!!");
      }
    } else {
      console.log("Empty message cannot be signed");
    }
  };
  const copyTheResult = (event) => {
    const text = event.target.innerText;
    console.log(text);
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
      {Object.keys(details) && (
        <div className="sign-details">
          <div className="sign-address">
            <p>Address:</p>
            <p
              onClick={(e) => {
                copyTheResult(e);
              }}
              className="address"
            >
              0x726...603 <AiOutlineCopy />
            </p>
          </div>
          <div className="sign-message">
            <p>Message:</p>
            <p
              onClick={(e) => {
                copyTheResult(e);
              }}
            >
              Suman raj khanal <AiOutlineCopy />
            </p>
          </div>
          <div className="sign-signature">
            <p>Signature:</p>
            <p
              className="address"
              onClick={(e) => {
                copyTheResult(e);
              }}
            >
              0xdba...fb1b <AiOutlineCopy color="black" />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignMessage;

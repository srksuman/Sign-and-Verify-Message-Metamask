import { ethers } from "ethers";
import { useRef, useState } from "react";

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
        setDetails({ message: userMessage, address, signature });
        trackMessage.current.value = "";
      } else {
        console.log("metamask dosent exists!!!");
      }
    } else {
      console.log("Empty message cannot be signed");
    }
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
    </div>
  );
};

export default SignMessage;

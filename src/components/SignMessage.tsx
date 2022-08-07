import { ethers } from "ethers";
import { useRef, useContext } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { AUDIO } from "../constants/Audio";

declare var window: any;

const SignMessage = () => {
  const trackMessage = useRef<any>(null);
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
        AUDIO.successAudio.play();
        trackMessage.current.value = "";
      } else {
        AUDIO.warnAudio.play();
        toast.warning(
          `Metamask dosent exists! Add metamask before signing message.`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      AUDIO.dangerAudio.play();
      toast.error(`Empty message cannot be signed!.`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const copyTheResult = (event: any) => {
    const value = event.target.attributes.getNamedItem("custom-value").value;
    window.navigator.clipboard.writeText(value);
  };
  return (
    <div className="sign-msg-wrapper">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <textarea
        ref={trackMessage}
        className="sign-msg"
        name="textarea"
        id=""
        placeholder="Enter message"
        cols={60}
        rows={10}
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

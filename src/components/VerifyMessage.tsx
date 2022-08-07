import { useContext } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import { VerifyMessageContext } from "../context/UserContext";

interface iFormDefails {
  message: string;
  signature: string;
  address: string;
}

const VerifyMessage = () => {
  const { verifyMessageDetails, setVerifyMessageDetails } =
    useContext(VerifyMessageContext);
  const verifyMessage = () => {
    if (
      verifyMessageDetails.message.trim() &&
      verifyMessageDetails.signature.trim() &&
      verifyMessageDetails.address.trim()
    ) {
      try {
        console.log(verifyMessageDetails);
        const signAddress = ethers.utils.verifyMessage(
          verifyMessageDetails.message.trim(),
          verifyMessageDetails.signature.trim()
        );
        console.log( verifyMessageDetails.address.trim())
        console.log( signAddress)
        console.log(signAddress.toLowerCase().trim()===verifyMessageDetails.address.toLowerCase().trim());
        if (signAddress.toString().toLowerCase() !== verifyMessageDetails.address.toString().toLowerCase()) {
         console.log("Test");
          toast.error(`Message varification failed!!!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          console.log("signAddress");
          toast.success(`Congratulation!!! Message is Verified.`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (e) {
        console.log("failed")
        toast.error(`Message varification failed!!!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error(`Empty Fields! Message Cannot be verified.`, {
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
  return (
    <>
      <div className="verify-bg"></div>
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
      <div className="verify-msg-wrapper common-div">
        <h4 className="verify-text">Verify Message:</h4>
        <div className="verify-form">
          <input
            placeholder="Wallet Address"
            className="verify-address"
            type="text"
            name="address"
            value={verifyMessageDetails.address}
            onChange={(e) => {
              setVerifyMessageDetails((prev: any) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
          />
          <input
            placeholder="Signature"
            className="verify-signature"
            type="text"
            value={verifyMessageDetails.signature}
            name="signature"
            onChange={(e) => {
              setVerifyMessageDetails((prev: any) => ({
                ...prev,
                signature: e.target.value,
              }));
            }}
          />
          <textarea
            className="verify-message"
            name=""
            id=""
            value={verifyMessageDetails.message}
            cols={30}
            rows={10}
            placeholder="Message"
            onChange={(e) => {
              setVerifyMessageDetails((prev: any) => ({
                ...prev,
                message: e.target.value,
              }));
            }}
          ></textarea>
        </div>
        <div className="verify-btn">
          <button type="button" onClick={verifyMessage}>
            Verify Message
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyMessage;

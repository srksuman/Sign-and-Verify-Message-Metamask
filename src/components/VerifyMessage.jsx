import { useState } from "react";
import { ethers } from "ethers";

const VerifyMessage = () => {
  const [formDetails, setFormDetails] = useState({});
  const verifyMessage = () => {
    console.log(formDetails);
    console.log(formDetails.message);
    if (
      formDetails.message.trim() &&
      formDetails.signature.trim() &&
      formDetails.address.trim()
    ) {
      try {
        const signAddress = ethers.utils.verifyMessage(
          formDetails.message.trim(),
          formDetails.signature.trim()
        );
        console.log(signAddress);
        if (signAddress !== formDetails.address) {
          console.log("Invalid");
        } else {
          console.log(signAddress);
          console.log("validate");
        }
      } catch (e) {
        console.log("varification failed!!!");
      }
    }
  };
  return (
    <div className="verify-msg-wrapper">
      <h4 className="verify-text">Verify Message:</h4>
      <div className="verify-form">
        <input
          placeholder="Wallet Address"
          className="verify-address"
          type="text"
          name="address"
          onChange={(e) => {
            setFormDetails((prev) => ({ ...prev, address: e.target.value }));
          }}
        />
        <input
          placeholder="Signature"
          className="verify-signature"
          type="text"
          name="signature"
          onChange={(e) => {
            setFormDetails((prev) => ({ ...prev, signature: e.target.value }));
          }}
        />
        <textarea
          className="verify-message"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Message"
          onChange={(e) => {
            setFormDetails((prev) => ({ ...prev, message: e.target.value }));
          }}
        ></textarea>
      </div>
      <div className="verify-btn">
        <button type="button" onClick={verifyMessage}>
          Verify Message
        </button>
      </div>
    </div>
  );
};

export default VerifyMessage;

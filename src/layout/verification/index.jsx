import React, { useEffect, useState } from "react";
import Navbar from "components/navbar";
import { SuccessWrapper, Image } from "./styled";
import verify from "asset/images/verify.png";
import OtpInput from "react-otp-input";
import { HeadText } from "components/texts";
import TextsWithLink from "components/texts/TextWithLinks";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = ({ title, paragraph }) => {
  const [otpcode, setOtpCode] = useState("");

  const handleChange = (otp) => {
    setOtpCode(otp);
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (otpcode.length === 6) {
      navigate(`${location.pathname}/success`);
    }
  }, [otpcode, navigate]);

  return (
    <>
      <Navbar />
      <SuccessWrapper>
        <Image src={verify} alt="verify" />
        <HeadText
          title={title}
          body={paragraph}
          titleAlign="center"
          bodyAlign="center"
          gap="clamp(8px, 1.5vw, 16px)"
        />
        <OtpInput
          value={otpcode}
          onChange={handleChange}
          numInputs={6}
          inputStyle={{
            maxWidth: "92px",
            maxHeight: "72px",
            width: "100%",
            height: "8vw",
            margin: "30px clamp(5px, 12%, 16px)",
            fontSize: "18px",
            borderRadius: 8,
            border: "1px solid #ECECEC",
            backgroundColor: "#f1f1f1",
            outlineColor: "#00A2D4",
            minWidth: "30px",
            minHeight: "30px",
          }}
        />
        <TextsWithLink
          text={[
            {
              text: "Didn't get the code? ",
              link: { text: "Resend verification", to: location.pathname },
            },
          ]}
        />
      </SuccessWrapper>
    </>
  );
};

export default Verify;

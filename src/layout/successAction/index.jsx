import React, { useEffect } from "react";
import Navbar from "components/navbar";
import { SuccessWrapper, Image } from "./styled";
import success from "asset/images/Success.png";
import { HeadText } from "components/texts";
import { useNavigate } from "react-router-dom";

const Success = ({ title, paragraph }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTine = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => {
      clearTimeout(redirectTine);
    };
  }, [navigate]);

  return (
    <>
      <Navbar />
      <SuccessWrapper>
        <Image src={success} alt="success" />
        <HeadText
          title={title}
          body={paragraph}
          titleAlign="center"
          bodyAlign="center"
          gap="clamp(8px, 1.5vw, 16px)"
        />
      </SuccessWrapper>
    </>
  );
};

export default Success;

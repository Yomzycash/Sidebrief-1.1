import React, { useEffect, useState } from "react";
import Navbar from "components/navbar";
import { SuccessWrapper, Image } from "./styled";
import success from "asset/svg/SuccessImage.svg";
import { HeadText } from "components/texts";
import { useNavigate } from "react-router-dom";

const Success = ({ title, paragraph }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer =
      count > 0
        ? setInterval(() => {
            setCount(count - 1);
          }, 1000)
        : navigate("/dashboard");
    return () => clearInterval(timer);
  }, [count]);

  return (
    <>
      <Navbar />
      <SuccessWrapper>
        <Image src={success} alt="success" />
        <HeadText
          title={title}
          body={paragraph}
          time={count}
          titleAlign="center"
          bodyAlign="center"
          gap="clamp(8px, 1.5vw, 16px)"
        />
      </SuccessWrapper>
    </>
  );
};

export default Success;

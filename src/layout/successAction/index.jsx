import React, { useEffect, useState } from "react";
import Navbar from "components/navbar";
import { SuccessWrapper, Image } from "./styled";
import success from "asset/svg/SuccessImage.svg";
import { HeadText } from "components/texts";
import { useNavigate } from "react-router-dom";
import { checkStaffEmail } from "utils/globalFunctions";

const Success = ({ title, paragraph }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  let userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const timer =
      count > 0
        ? setInterval(() => {
            setCount(count - 1);
          }, 1000)
        : handleNavigate();
    // : navigate("/dashboard");
    return () => clearInterval(timer);
  }, [count]);

  let staffCheck = checkStaffEmail(userEmail);

  const handleNavigate = () => {
    if (staffCheck) {
      navigate("/staff-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Navbar />
      <SuccessWrapper>
        <Image src={success} alt="success" />
        <HeadText
          title={title}
          body={paragraph}
          time={`${count} Sec`}
          titleAlign="center"
          bodyAlign="center"
          gap="clamp(8px, 1.5vw, 16px)"
        />
      </SuccessWrapper>
    </>
  );
};

export default Success;

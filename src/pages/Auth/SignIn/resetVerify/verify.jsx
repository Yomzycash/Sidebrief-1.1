import React from "react";
import { Verify } from "layout";

const ResetVerify = () => {
  return (
    <Verify
      title={"Reset your password"}
      paragraph={
        "Kindly input the 6-digit verification code that we sent to your email address."
      }
    />
  );
};

export default ResetVerify;

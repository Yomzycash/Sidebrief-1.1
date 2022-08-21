import React from "react";
import { Verify } from "layout";

const EmailVerify = () => {
	return (
		<Verify
			title={"Verify your email address"}
			paragraph={
				"Kindly input the 6-digit verification code that we sent to your email address."
			}
		/>
	);
};

export default EmailVerify;

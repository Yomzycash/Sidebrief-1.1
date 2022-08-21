import React from "react";
import { Success } from "layout";

const EmailSuccess = () => {
	return (
		<Success
			title={"Account Creation Success"}
			paragraph={
				"Your Sidebrief account has been successfully created. We are redirecting you to your dashboard."
			}
		/>
	);
};

export default EmailSuccess;

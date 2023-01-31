import React from "react";
import { ButtonContainer } from "./styled";

const CommonButton = ({
	LeftIcon,
	text,
	RightIcon,
	action = () => {},
	style,
	leftIconColor,
	rightIconColor,
	classname,
}) => {
	return (
		<ButtonContainer onClick={action} style={style} className={classname}>
			{LeftIcon && (
				<LeftIcon size={24} color={leftIconColor || "white"} />
			)}
			{text && <span>{text}</span>}
			{RightIcon && (
				<RightIcon size={24} color={rightIconColor || "white"} />
			)}
		</ButtonContainer>
	);
};

export default CommonButton;

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
	component,
	type
}) => {
	return (
		<ButtonContainer onClick={action} style={style} className={classname} type = {type || 'button'}>
			{LeftIcon && (
				<LeftIcon size={24} color={leftIconColor || "white"} />
			)}
			{text && <span>{text}</span>}
			{RightIcon && (
				<RightIcon size={24} color={rightIconColor || "white"} />
			)}
			{component && <>{component}</>}
		</ButtonContainer>
	);
};

export default CommonButton;

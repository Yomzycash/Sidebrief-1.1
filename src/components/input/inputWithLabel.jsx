import React, { useState } from "react";
import {
	InputWrapper,
	Wrapper,
	Input,
	Label,
	Iconwrapper,
	ErrMsg,
	Top,
	Show,
} from "./styled";

const InputWithLabel = ({
	label,
	labelStyle,
	containerStyle,
	edit,
	error,
	errorMessage,
	rightText,
	leftIcon,
	container,
	placeholder,
	secureTextEntry,
	type,
	name,
	register,
	...rest
}) => {
	const [show, setShow] = useState(true);
	return (
		<Wrapper className={containerStyle}>
			<Top>
				{label && <Label className={labelStyle}>{label}</Label>}

				{errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
			</Top>

			<InputWrapper>
				{leftIcon && <Iconwrapper>{leftIcon}</Iconwrapper>}

				<Input
					placeholder={placeholder}
					secureTextEntry={secureTextEntry}
					edit={edit}
					type={show ? type || "text" : "password"}
					name={name}
					{...register(name)}
					{...rest}
				/>

				{rightText ? (
					<div onClick={() => setShow(!show)}>
						<Show>{show ? "hide" : "show"}</Show>
					</div>
				) : null}
			</InputWrapper>
		</Wrapper>
	);
};

export default InputWithLabel;

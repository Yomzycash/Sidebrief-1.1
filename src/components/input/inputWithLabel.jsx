import React, { useState, useEffect, useRef } from "react";
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
	errorMessage=false,
	rightText,
	leftIcon,
	container,
	placeholder,
	secureTextEntry,
	type,
	text,
	name,
	password,
	register,
	...rest
}) => {
	const [show, setShow] = useState(false);
	const [active, setActive] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		if (active) {
			inputRef.current.focus();
		}
	}, [active])
	const handleBorder =() => {
		setActive(!active);
	};
	return (
		<Wrapper className={containerStyle}>
			<Top>
				{label && <Label className={labelStyle}>{label}</Label>}

				{errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
			</Top>

			<InputWrapper border={
				errorMessage ? 
				'1px solid red' : active ? '1px solid #00A2D4' : '1px solid #ececec'
				}
				ref={inputRef} onFocus={handleBorder} >
				{leftIcon && <Iconwrapper>{leftIcon}</Iconwrapper>}

				<Input
					placeholder={placeholder}
					secureTextEntry={secureTextEntry}
					edit={edit}
					type={!show ? type || "password" : "text"}
					name={name}
					{...register(name)}
					{...rest}
				/>

				{rightText ? (
					<div onClick={() => setShow(!show)}>
						<Show>{!show ? "show" : "hide"}</Show>
					</div>
				) : null}
			</InputWrapper>
		</Wrapper>
	);
};

export default InputWithLabel;

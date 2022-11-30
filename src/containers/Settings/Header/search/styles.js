import styled from "styled-components";

export const Input = styled.input`
	height: 100%;
	width: 100%;
	border: none;
	padding-inline: 16px;

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;

	letter-spacing: 0.02em;
	color: #000;

	&::placeholder {
		color: #959697;
	}

	&:focus {
		outline: none;
	}
`;

export const Container = styled.form`
	width: 384px;
	height: 40px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	border-radius: 12px;
	display: flex;
	align-items: center;
	overflow: hidden;
	padding-left: 16px;
	transition: all 0.2s;

	&:has(${Input}:focus) {
		border: 1px solid #00a2d4;
	}
`;

import styled from "styled-components";

export const HeadText = styled.h5`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 131%;
	letter-spacing: 0.02em;
	padding-inline: ${({ nopadding }) => (nopadding ? `0` : `24px`)};

	color: #151717;
`;

export const BodyText = styled.p`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 131%;
	letter-spacing: 0.02em;
	padding-inline: 24px;

	color: #151717;

	// background-color: blueviolet;
`;

export const Checkbox = styled.input`
	cursor: pointer;
	width: 20px;
	height: 20px;
	margin-right: 30px;
`;

export const Clickable = styled.button`
	height: 56px;
	width: 100%;
	display: flex;
	align-items: center;
	border: none;
	background-color: transparent;
	cursor: pointer;
`;

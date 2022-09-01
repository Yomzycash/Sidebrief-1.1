import styled from "styled-components";

export const Container = styled.div`
	width: 725px;
	height: 74px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding-inline: 24px;
	display: flex;
	align-items: center;
`;

export const TextContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
	flex: 1;
`;

export const ThreeDotContainer = styled.button`
	border-radius: 2px;
	background: transparent;
	border: none;
`;

export const Name = styled.h4`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.02em;
	color: #151717;
`;

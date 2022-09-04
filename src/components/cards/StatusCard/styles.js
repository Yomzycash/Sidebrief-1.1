import styled from "styled-components";

export const Container = styled.div`
	width: 725px;
	/* height: 74px; */
	height: fit-content;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding: 24px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	transition: all 0.2s;

	${({ hover }) =>
		hover &&
		`
		border: 1px solid #00C3FF;
		box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1);
	`}
`;

export const TextContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;

export const Top = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
	flex: 1;
`;

export const Description = styled.p`
	max-width: 575px;
	padding-top: 8px;
	height: 0;

	font-family: "BR Firma";
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.01em;
	color: #4e5152;
	overflow: hidden;

	transition: all 0.2s;

	${({ hover }) =>
		hover &&
		`
		height: fit-content;
	`}
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

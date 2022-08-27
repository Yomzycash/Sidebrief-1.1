import styled from "styled-components";

export const Container = styled.div`
	width: 550px;
	height: 124px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding: 24px;
	display: flex;
	gap: 20px;
`;

export const FirstPart = styled.div`
	display: flex;
	gap: 16px;
	width: 100%;
`;

export const IconWrapper = styled.div``;

export const MiddlePart = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex: 1;
`;

export const Title = styled.h4`
	font-family: "BR Firma";
	font-weight: 600;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: #151717;
`;

export const Body = styled.p`
	font-family: "BR Firma";
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.01em;
	color: #727474;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const LongButton = styled.button`
	width: 155px;
	height: 36px;
	background: #00a2d4;
	border-radius: 8px;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	position: relative;
	overflow: hidden;

	${({ notReady }) =>
		notReady &&
		`&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(255, 255, 255, 0.6);
	}`}

	p {
		font-family: "BR Firma";
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;
		letter-spacing: -0.5px;
		color: #ffffff;
	}
`;

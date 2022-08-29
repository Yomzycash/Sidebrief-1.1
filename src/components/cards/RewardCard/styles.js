import styled from "styled-components";

export const Container = styled.div`
	width: 263px;
	height: 238px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding-block: 24px;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	${({ isBig }) =>
		isBig
			? `
                width: 359px;
                height: 238px;
                background: #DCF7FF;
            `
			: null}
`;

export const StartButton = styled.button`
	width: 155px;
	height: 36px;
	border-radius: 8px;
	border: none;
	background: transparent;
	display: flex;
	gap: 12px;
	align-items: center;
	justify-content: center;

	p {
		text-transform: capitalize;
		font-family: "BR Firma";
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;
		letter-spacing: -0.5px;
		color: #00a2d4;
	}
`;

export const Corner = styled.div`
	position: absolute;
	top: 0;
	right: 0;
`;

export const Frame = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding-inline: 24px;
`;

export const ImageHolder = styled.div`
	height: 32px;
	width: 32px;
	border-radius: 50%;
	overflow: hidden;

	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;

	${({ isBig }) => isBig && `margin-top: 56px;`}
`;

export const Title = styled.h4`
	font-family: "BR Firma";
	font-weight: 500;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: 0.02em;
	color: #151717;
`;

export const Body = styled.p`
	font-family: "BR Firma";
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	color: #727474;
`;

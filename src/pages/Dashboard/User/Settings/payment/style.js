import styled from "styled-components";

export const Container = styled.div`
	margin-top: 40px;
`;

export const InvoiceContainer = styled.div`
	border: 1px solid #edf1f7;
	border-radius: 16px;
	overflow: hidden;
`;

export const InvoiceHeader = styled.div`
	display: flex;
	height: 134px;
	padding-inline: 24px;
	align-items: center;
	justify-content: space-between;
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;

	h6 {
		font-weight: 600;
		font-size: 20px;
		line-height: 30px;
		letter-spacing: -0.02em;
		color: #242627;
	}

	p {
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: -0.02em;
		color: #727474;
	}
`;

export const Download = styled.button`
	background: #00a2d4;
	border-radius: 8px;
	padding: 10px 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: none;
	cursor: pointer;

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.5px;

	color: #ffffff;

	svg {
		transform: scale(1.1);

		path {
			fill: #fff;
		}
	}
`;

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

export const DownloadTag = styled.a`
	background: transparent;
	border-radius: 8px;
	padding: 10px 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: none;
	cursor: pointer;

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.5px;

	color: #00a2d4;
	text-decoration: none;
`;

export const ThreeDotContainer = styled.button`
	border-radius: 2px;
	background: transparent;
	border: none;
	width: 24px;
	height: 24px;
`;

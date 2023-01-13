import styled from "styled-components";

export const Container = styled.div`
	min-height: 74px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding: 24px 24px;
	display: flex;
	flex-flow: column;
	align-items: stretch;
	justify-content: center;
	transition: 0.3s all ease;
	position: relative;

	&:hover {
		border: 1px solid #00c3ff;
		box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1),
			0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	}
`;

export const TextContainer = styled.div`
	display: flex;
	flex-flow: row nowrap;
	width: 100%;
`;

export const Top = styled.div`
	display: flex;
	align-items: center;
	gap: clamp(11px, 2vw, 24px);
	flex: 1;
`;

export const Description = styled.p`
	padding-top: 8px;
	min-height: 0;
	max-height: 0;

	display: flex;
	font-family: "BR Firma";
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.01em;
	color: #4e5152;
	overflow: hidden;

	transition: 0.3s all ease;

	${({ hover }) =>
		hover &&
		`
		height: fit-content;
    min-height: 40px;
    max-height: 100px;
	`}
`;

export const ThreeDotContainer = styled.button`
	border-radius: 2px;
	background: transparent;
	border: none;
	cursor: pointer;
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

export const ContextMenu = styled.div`
	position: absolute;
	z-index: 6;
	width: 192px;
	height: 150px;
	top: 50px;
	right: 24px;

	/* White */

	background: #ffffff;
	/* Border Color */

	border: 1px solid #edf1f7;
	box-shadow: -4px 10px 16px 8px rgba(149, 150, 151, 0.08),
		0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

export const ContextButton = styled.button`
	flex: 1;
	border: none;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 16px;
	background-color: #ffffff;

	&:nth-child(even) {
		background-color: #fafafa;
		border-inline: 1px solid #edf1f7;
	}

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: -0.01em;

	color: #727474;
`;

export const DeleteButton = styled(ContextButton)`
	color: #ed4e3a;
`;

export const InvisibleBackDrop = styled.div`
	background-color: transparent;
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 3;
`;

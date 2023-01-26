import styled from "styled-components";

export const Container = styled.div`
	position: relative;
`;

export const ThreeDotContainer = styled.button`
	border-radius: 2px;
	background: transparent;
	border: none;
	cursor: pointer;
`;

export const ContextMenu = styled.div`
	position: absolute;
	z-index: 6;
	width: 192px;
	height: 150px;
	top: 34px;
	right: 0px;

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
	/* flex: 1; */
	height: 50px;
	border: none;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 16px;
	background-color: #ffffff;

	&:not(:last-child) {
		border-bottom: 1px solid #edf1f7;
	}

	&:hover {
		background-color: #fafafa;
	}

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: -0.01em;

	color: ${({ look }) => (!(look === "danger") ? `#727474` : "#ed4e3a")};

	svg {
		height: 16px;
		width: 16px;

		path {
			fill: currentColor;
		}
	}
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

import styled from "styled-components";
import tinycolor from "tinycolor2";

export const Container = styled.div`
	width: max-content;
	border-radius: 8px;
	padding: 3px 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 18px;
	text-align: center;

	background: ${({ color }) => tinycolor(color).setAlpha(0.1)};
	color: ${({ color }) => color};

	text-transform: capitalize;
`;

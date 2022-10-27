import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
	width: 100%;
	border: 1px solid #edf1f7;
	border-top: none;
`;

export const Top = styled.div`
	padding-inline: 40px;
	padding-block: 40px 0;
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const BackContainer = styled(Link)`
	display: flex;
	align-items: center;
	gap: 8px;
	text-decoration: none;
	align-self: flex-start;
`;

export const Text = styled.p`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	color: #151717;
`;

export const TitleContainer = styled.div`
	padding-block: 28px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 24px;
	width: 100%;
`;

export const TopInfo = styled.div`
	display: flex;
	gap: 24px;
	align-items: center;
`;

export const CompanyName = styled.h2`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 36px;
	color: #242627;
`;

export const LHS = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const RHS = styled.div``;

export const BottomInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const UserName = styled.p`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	text-decoration-line: underline;
	color: #00a2d4;
	text-transform: capitalize;
`;

export const DotSeperator = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: #959697;
`;

export const DateText = styled.p`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: #4e5152;
`;

export const DeleteButton = styled.button`
	border: none;
	background-color: transparent;
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 8px;

	p {
		font-family: "BR Firma";
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;
		letter-spacing: 0.02em;
		color: #ed4e3a;
	}
`;

export const SubHeader = styled.div`
	border-top: 1px solid #edf1f7;
	display: flex;
	gap: 24px;
	padding-inline: 24px;
	width: 100%;
	overflow-x: auto;
	overflow-y: hidden;
`;

export const SearchAndSort = styled.div`
	padding: 40px 24px;
	border-top: 1px solid #edf1f7;
	display: flex;
	gap: 24px;
`;

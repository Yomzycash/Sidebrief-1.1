import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-flow: column;
	background-color: #fcfcfc;
	flex: 1;
	min-height: 100vh;
`;
export const Header = styled.div``;
export const Body = styled.form`
	display: flex;
	flex-flow: column;
	height: 100%;
	margin: auto;
	width: 100%;
	max-width: 962px;
	background-color: white;
	border: 1px solid #edf1f6;
	border-top: none;
	flex: 1;
	padding-bottom: 50px;
	border-top: none;
`;

export const SectionTitle = styled.p`
	font-size: 18px;
	font-weight: 500px;
`;

export const DataTitle = styled.p`
	font-size: 14px;
	color: #d5d5d5;
	margin: 0px;
`;

export const Data = styled.div`
	background-color: #edf1f6;
	border-radius: 8px;
	padding: 10px 24px;
	margin-bottom: 25px;
	margin-top: -10px;

	p {
		font-size: 14px;
		color: ${({ theme }) => theme.grey1};
	}
`;

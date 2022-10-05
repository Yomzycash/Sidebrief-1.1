import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	border: 1px solid #edf1f7;
	border-radius: 0px 0px 16px 16px;
	overflow: hidden;
`;

export const Table = styled.table`
	width: 100%;
	border-spacing: 0;
`;

export const Head = styled.thead`
	height: 56px;

	tr {
		background: #fafafa;
	}
`;

export const HeadData = styled.th`
	text-align: left;

	${Head} &:first-child {
		padding-left: 24px;
	}

	${Head} &:last-child {
		padding-right: 24px;
	}
`;

export const Row = styled.tr`
	height: 56px;
	padding-inline: 24px;
	background: grey;
	border-top: 1px solid #edf1f7;
	background: #fff;

	&:nth-child(even) {
		background: #fcfcfc;
	}

	& > :first-child {
		padding-left: 24px;
		width: 48px;
	}

	& > :last-child {
		padding-right: 50px;
		width: 50px;
	}
`;

export const RowData = styled.td`
	border: none;
`;

export const HeadText = styled.h5`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 131%;
	letter-spacing: 0.02em;

	color: #151717;
`;

export const BodyText = styled.p`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 131%;
	letter-spacing: 0.02em;

	color: #151717;
`;

export const Checkbox = styled.input`
	cursor: pointer;
	width: 20px;
	height: 20px;
	margin-right: 30px;
`;

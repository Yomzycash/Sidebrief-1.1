import styled from "styled-components";

/**
 * MAKE TABLES RESPONSIVE
 *
 * 1. Add overflow-x scroll to Container (Wrapping the table)
 * 2. Add a padding to the text, both head and body
 * */

export const Container = styled.div`
	width: 100%;
	border: 1px solid #edf1f7;
	border-radius: 0px 0px 16px 16px;
	/* overflow: hidden; */

	overflow-x: auto;
	overflow-y: hidden;
`;

export const Table = styled.table`
	width: 100%;
	border-spacing: 0;
	// position: relative;
`;

export const Head = styled.thead`
	height: 56px;

	tr {
		background: #fafafa;
	}
`;

export const HeadData = styled.th`
	text-align: left;
	// position: sticky;

	/* ${Head} &:first-child {
		padding-left: 24px;
	} */

	${Head} &:last-child {
		padding-right: 24px;
	}
`;

export const Row = styled.tr`
	// height: 56px;
	// padding-inline: 24px;
	padding-left: 24px;
	background: grey;
	border-top: 1px solid #edf1f7;
	background: #fff;

	&:nth-child(even) {
		background: #fcfcfc;
	}

	/* & > :first-child {
		padding-left: 24px;
		width: 48px;
	} */

	& > :last-child {
		padding-right: 24px;
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

export const Clickable = styled.button`
	height: 56px;
	width: 100%;
	display: flex;
	align-items: center;
	border: none;
	background-color: transparent;
`;

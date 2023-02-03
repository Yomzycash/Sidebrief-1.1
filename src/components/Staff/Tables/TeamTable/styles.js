import styled from "styled-components";

export const ThreeDotContainer = styled.button`
	border-radius: 2px;
	background: transparent;
	border: none;
	width: 24px;
	height: 24px;
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
		width: 48px;
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
	}

	& > :last-child {
		padding-right: 24px;
		width: 48px;
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
	line-height: 21px;
	letter-spacing: 0.02em;
	color: ${({ theme }) => theme.grey1};
`;

export const BodyText = styled.p`
	font-family: "BR Firma";
	font-weight: 400;
	line-height: 21px;
	letter-spacing: 0.02em;
	font-size: 16px;
	color: ${({ theme }) => theme.grey1};
`;

export const NameContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

export const Email = styled(BodyText)`
	color: #727474;
`;

export const Checkbox = styled.input`
	cursor: pointer;
	width: 24px;
	height: 24px;
	margin-right: 30px;
`;

export const Delete = styled.button`
	background: transparent;
	border: none;

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 21px;
	letter-spacing: -0.02em;
	color: #727474;

	cursor: pointer;
	text-transform: capitalize;

	&:hover,
	&:active {
		border-bottom: 1px solid #727474;
	}
`;

export const Edit = styled(Delete)`
	color: #00a2d4;

	&:hover,
	&:active {
		border-bottom: 1px solid #00a2d4;
	}
`;

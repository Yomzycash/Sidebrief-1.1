import styled from "styled-components";

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

	${Head} &:first-child {
		padding-left: 24px;
	}

	${Head} &:last-child {
		padding-right: 24px;
	}
`;

export const Row = styled.tr`
	height: 56px;
	// padding-inline: 24px;
	padding-left: 24px;
	background: grey;
	border-top: 1px solid #edf1f7;
	background: #fff;

	&:nth-child(even) {
		background: #fcfcfc;
	}

	& > :first-child {
		padding-left: 24px;
		${({ selectionRow }) =>
			selectionRow
				? `
                    width: 48px;
                `
				: null}
	}

	& > :last-child {
		padding-right: 24px;
		width: 50px;
	}
`;

export const RowData = styled.td`
	border: none;
`;

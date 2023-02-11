import styled from "styled-components";

export const TableContainer = styled.table`
	width: 100%;
	color: ${({ theme }) => theme.grey1};
	border-spacing: 0;
	background: #fafafa;

	tr {
		width: 100%;
	}

	th,
	td {
		font-size: clamp(14px, 1.4vw, 16px);
		line-height: 21px;
		text-align: left;
		padding: 20px 24px;
		margin: 0;
	}
`;

export const TableHead = styled.thead`
	width: 100%;
	background: #fafafa;

	th {
		font-weight: 500;
	}
`;

export const TableBody = styled.tbody`
	width: 100%;

	tr {
		:nth-of-type(even) {
			background: #fafafa;
		}
		:nth-of-type(odd) {
			background: #fff;
		}
	}

	td {
		font-weight: 400;
	}

	div,
	a {
		display: flex;
		gap: 8px;
		align-items: center;
		text-decoration: none;

		img {
			width: 20px;
		}
	}
`;

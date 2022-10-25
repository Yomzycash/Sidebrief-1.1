import styled from "styled-components";

export const Container = styled.div`
	position: relative;
`;

export const SortButton = styled.button`
	border: none;
	background: transparent;
	display: flex;
	align-items: center;
	gap: 16px;
	padding-inline: 16px;
	height: 40px;
	background: #fafafa;
	border: 1px solid #f1f1f1;
	border-radius: 12px;
	z-index: 2;

	p {
		font-family: "BR Firma";
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;
		color: #4e5152;
	}

	svg {
		transition: all 0.2s;
		${({ showing }) => showing && `transform: rotate(180deg)`};
	}
`;

export const Hidden = styled.div`
	width: 100%;
	/* background-color: grey; */

	position: absolute;
	height: 0;
	transform: translateY(-10px);
	transition: all 0.3s;
	z-index: 1;

	${({ show }) =>
		show &&
		`
        height: 150px; 
        transform: translateY(0);
        `}
`;

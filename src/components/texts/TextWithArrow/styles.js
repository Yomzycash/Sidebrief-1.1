import styled from "styled-components";

export const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
`;

export const Text = styled.p`
	font-family: "BR Firma";
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.5px;
	color: #ffffff;
	text-transform: capitalize;

	${({ isBlue }) =>
		isBlue
			? `
                color: #00a2d4 
            `
			: null}
`;

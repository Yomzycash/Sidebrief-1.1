import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Container = styled.div`
	max-width: 80%;
	padding: 24px 16px;
	background: #fafafa;
	border-radius: 10px;

	p {
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: -0.5px;
		color: #242627;
	}
`;

export const FileContainer = styled.div`
	max-width: 260px;
	height: 58px;
	display: flex;
	align-items: center;
	gap: 8px;
	padding-inline: 16px;

	border: 1px solid #fafafa;
	border-radius: 10px;

	transition: all 0.3s;

	&:focus-within {
		border: 1px solid #00c3ff;
		box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1),
			0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	}

	&:hover {
		border: 1px solid #00c3ff;
		box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1),
			0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	}
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Name = styled.h6`
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	color: #242627;
`;

export const Size = styled.p`
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	color: #4e5152;
`;

export const ContextContainer = styled.div`
	margin-left: auto;
`;

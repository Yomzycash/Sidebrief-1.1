import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 500px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  background: #fafafa;
`;

export const Container = styled.div`
	max-width: 95%;
	padding: 24px 16px;
	border-radius: 10px;
`;

export const Title = styled.p`
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: -0.5px;
	color: ${({ theme }) => theme.grey1};
	text-transform: capitalize;
	margin-bottom: 10px;
`;

export const Body = styled.p`
	font-weight: 300;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.5px;
	color: ${({ theme }) => theme.grey1};

	& > * {
		margin-top: 1em;
	}

	blockquote {
		margin-left: 0px;
		margin-right: 0px;
		padding-left: 10px;
		color: rgb(170, 170, 170);
		font-style: italic;
		border-left: 2px solid rgb(221, 221, 221);
	}

	ol {
		list-style-type: decimal;
	}

	ul {
		list-style-type: disc;
	}

	ol,
	ul {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		padding-inline-start: 40px;
	}
`;
export const CardContainer = styled.div`
	width: 100%;
	padding: 24px 16px;
	display: flex;
	flex-direction: column;
	gap: 10px;
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
		box-shadow: 0px 20px 25px -5px #95969719, 0px 10px 10px -5px #9596970a;
	}

	&:hover {
		border: 1px solid #00c3ff;
		box-shadow: 0px 20px 25px -5px #9596970a,
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
	color: ${({ theme }) => theme.grey1};
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

export const TimeStamp = styled.div`
	display: flex;
	gap: 10px;
	justify-content: flex-end;
	font-size: 10px;
	padding: 10px;
`;

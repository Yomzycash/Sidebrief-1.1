import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  gap: 24px;
  display: flex;
  flex-flow: column;
  padding: 40px 24px;
  width: 100%;
`;

export const FullContentWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	row-gap: 24px;
	column-gap: 24px;
	padding-bottom:10px;

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

export const ContentWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, minmax(50px, 1fr));
	row-gap: 24px;
	column-gap: 24px;
	padding-bottom:10px;

	@media screen and (max-width: 900px) {
		display: flex;
		flex-flow: column;
	}
`;
export const TextWithLabel = styled.div`
	width: 100%;
`;

export const Label = styled.p`
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	margin-bottom: 10px;
	color: #4e5152;
`;

export const TextWrapper = styled.div`
	padding: 16px 24px;
	gap: 16px;
	display: flex;
	align-items: center;
	width: 100%;
	background: #fafafa;
	border: 1px solid #edf1f7;
	border-radius: 8px;
	max-width: 100%;
`;
export const Text = styled.div`
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	/* identical to box height, or 150% */

	display: flex;
	align-items: center;

	/* Grey 1 */

	color: ${({ theme }) => theme.grey1};
`;
export const LinkText = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	text-decoration-line: underline;
	color: #00a2d4;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	cursor: pointer;
	max-width: 100%;
`;

export const ImageLink = styled(LinkText)`
	@media screen and (max-width: 700px) {
		width:200px;
	}
	
`
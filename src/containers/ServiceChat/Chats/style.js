import styled from "styled-components";

export const Container = styled.div`
	border-right: 1px solid #edf1f7;
	height: calc(100vh - 56px);
	display: flex;
	flex-direction: column;
	overflow-y: auto;

	::-webkit-scrollbar {
		display: none;
	}
`;

export const Head = styled.div`
	padding-inline: 24px;
	padding-top: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Heading = styled.h3`
	font-weight: 600;
	font-size: 24px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: ${({ theme }) => theme.grey1};
`;

export const DropDown = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 4px 12px;
	gap: 16px;
	background: #fafafa;
	position: relative;
	width: 109px;
	height: max-content;
	border: 1px solid #f1f1f1;
	border-radius: 12px;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
export const DropDownBtn = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`;

export const DropDownContent = styled.div`
	position: absolute;
	top: 48px;
	background: #fafafa;
	z-index: 1;

	border: 1px solid #edf1f7;
	box-shadow: -4px 10px 16px 8px rgba(149, 150, 151, 0.08),
		0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 12px;
	width: 100%;
`;
export const DropDownItems = styled.div`
	padding: 4px 12px;
	cursor: pointer;
	transition: all 0.2s;
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
`;
export const TextContainer = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	/* identical to box height, or 150% */

	display: flex;

	text-align: right;

	/* Grey 3 */

	color: #4e5152;
`;
export const ArrowDown = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	transform: ${({ isActive }) => (isActive ? "rotate(180deg)" : "")};
	transition: 0.3s transform ease;
	padding: 0 5px;
`;
export const TopContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-bottom: 40px;
`;

export const SearchContainer = styled.div`
	padding-inline: 24px;
`;
export const ChatContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0px;
	/* border: 1px solid red; */
	height: 100%;
`;

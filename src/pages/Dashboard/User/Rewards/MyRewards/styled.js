import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-flow: column;
	flex: 1;
`;
export const Header = styled.div`
	position: sticky;
	top: 65px;
	display: flex;
	flex-flow: column;
	background-color: white;
	z-index: 2;
	box-shadow: ${(props) =>
		props.boxshadow === "true" ? "0px 10px 15px -5px #9596971a" : ""};
`;
export const MainHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 48px;
	width: 100%;
	height: clamp(80px, 10vw, 120px);
	padding-inline: 24px;
	border: 1px solid #edf1f7;
	border-top: none;
	transition: 0.2s all ease;

	> p {
		display: flex;
		align-items: center;
		font-size: clamp(20px, 1.5vw, 24px);
		font-weight: 700;
		color: #151717;
	}

	> div {
		display: flex;
		gap: 48px;
		flex: 1;
		justify-content: space-between;
	}
`;
export const SubHeader = styled.div`
	display: flex;
	gap: 24px;
	border: 1px solid #edf1f7;
	border-top: none;
`;
export const Body = styled.div`
	display: flex;
	gap: 42px;
	padding: 40px 24px 24px;
	border: 1px solid #edf1f7;
	border-top: none;
`;
export const BodyLeft = styled.div`
	position: sticky;
	top: 220px;
	height: max-content;
	display: flex;
	flex-flow: column;
	gap: 16px;
	white-space: nowrap;
	font-size: clamp(14px, 1.5rem, 16px);

	h3 {
		font-weight: 600;
		color: #151717;
	}

	h4 {
		color: #00a2d4;
		font-weight: 500;
	}

	ul {
		display: flex;
		flex-flow: column;
		gap: 16px;
		color: #4e5152;
		font-weight: 500;
		list-style-type: none;
		> li {
			cursor: pointer;
		}
	}
`;
export const BodyRight = styled.div`
	display: flex;
	flex-flow: row wrap;
	gap: 24px;
`;
export const Footer = styled.div``;

export const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 40px;
	height: ${({ height }) => height && height};
`;

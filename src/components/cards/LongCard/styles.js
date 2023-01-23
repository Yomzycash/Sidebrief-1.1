import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
	cursor: ${({ notready }) => (notready ? "not-allowed" : "")};
	width: 100%;
	/* width: 600px; */
	min-height: 124px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding: clamp(15px, 1.5vw, 24px);
	display: flex;
	gap: 22px;
	transition: 0.3s all ease;
	opacity: ${({ notready }) => (notready ? "0.6" : "")};

	@media screen and (max-width: 1140px) {
		&:hover {
			cursor: ${({ notready }) => (notready ? "" : "pointer")};
			background-color: ${({ notready }) => (notready ? "" : "#00a2d4 ")};
			h4,
			p {
				color: ${({ notready }) => (notready ? "" : "#ffffff")};
			}
		}
	}
	@media screen and (min-width: 1140px) {
		&:hover {
			border: ${({ notready }) => (notready ? "" : "1px solid #00a2d4")};
		}
	}
`;

export const FirstPart = styled.div`
	display: flex;
	flex: 2;
	gap: 8px;
	width: 100%;
	min-width: 40%;
	@media screen and (max-width: 600px) {
		flex-flow: column;
	}
`;

export const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 36px;
	width: 36px;
	border-radius: 8px;
	background-color: ${({ notready }) =>
		notready === "true" ? "#F9C4BD" : "rgba(0, 162, 212, 0.1)"};
	transition: 0.3s all ease;
`;

export const MiddlePart = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex: 1;
`;

export const Title = styled.h4`
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	gap: 7px;
	font-family: "BR Firma";
	font-weight: 600;
	font-size: 14px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: #151717;
	transition: 0.3s all ease;
	span {
		display: none;
		font-size: 12px;
		font-weight: 500;
		font-style: italic;
		white-space: nowrap;
		color: #ed4e3a;
		@media screen and (max-width: 1140px) {
			display: block;
		}
	}
`;

export const Body = styled.p`
	font-family: "BR Firma";
	font-weight: 400;
	font-size: clamp(13px, 1.5vw, 14px);
	line-height: 21px;
	letter-spacing: -0.01em;
	color: #727474;
	transition: 0.3s all ease;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 1140px) {
		display: none;
	}
`;

export const LongButton = styled.button`
	cursor: ${({ notready }) => (notready ? "not-allowed" : "pointer")};
	text-decoration: none;
	padding: 6px 20px;
	background: #00a2d4;
	border-radius: 8px;
	border: none;
	overflow: hidden;

	${({ notReady }) =>
		notReady &&
		`
        cursor: not-allowed;
        background: rgba(0, 162, 212, 0.72);
        p {
            color: rgba(255, 255, 255, 0.64);
        }
        svg {
            path {
                fill:  rgba(255, 255, 255, 0.64);
            }
        }
    `}
`;

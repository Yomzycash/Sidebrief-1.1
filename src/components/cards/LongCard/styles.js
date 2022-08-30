import styled from "styled-components";

export const Container = styled.div`
	width: 550px;
	height: 124px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding: 24px;
	display: flex;
	gap: 20px;
`;

export const FirstPart = styled.div`
	display: flex;
	gap: 16px;
	width: 100%;
`;

export const IconWrapper = styled.div``;

export const MiddlePart = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex: 1;
`;

export const Title = styled.h4`
	font-family: "BR Firma";
	font-weight: 600;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: #151717;
`;

export const Body = styled.p`
	font-family: "BR Firma";
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.01em;
	color: #727474;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const LongButton = styled.button`
	height: 36px;
	padding-inline: 24px;
	background: #00a2d4;
	border-radius: 8px;
	border: none;
	overflow: hidden;
	cursor: pointer;

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

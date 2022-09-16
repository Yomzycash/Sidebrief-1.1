import styled from "styled-components";

export const Container = styled.div`
  min-width: 230px;
  max-width: 300px;
  max-height: 238px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  padding-block: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;
  flex: 1;

  ${({ hover }) =>
    hover &&
    `
			background: #00a2d4;
			box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1);
		`};
`;

export const StartButton = styled.button`
  height: 36px;
  border-radius: 8px;
  border: none;
  background: transparent;
  padding-inline: 24px;
`;

export const Corner = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  svg {
    ellipse {
      fill: rgba(204, 243, 255, 0.48);
      fill-opacity: 1;
    }
  }

  ${({ hover }) =>
    hover &&
    `
		svg {
			ellipse {
				fill: rgba(255, 255, 255, 0.64);
			}
		}
		`};
`;

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-inline: 24px;
`;

export const ImageHolder = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h4`
  font-family: "BR Firma";
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #151717;

  ${({ hover }) =>
    hover &&
    `
			color: #ffffff;
		`};
`;

export const Body = styled.p`
  font-family: "BR Firma";
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #727474;

  ${({ hover }) =>
    hover &&
    `
			color: #f1f1f1;
		`};
`;

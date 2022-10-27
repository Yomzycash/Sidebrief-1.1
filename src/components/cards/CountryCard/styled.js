import styled from "styled-components";

export const Edit = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  p {
    color: #4e5152;
    font-size: 12px;
    line-height: 18px;
  }
`;
export const Add = styled.div`
  border-top: 1px solid #edf1f7;
  border-bottom: 1px solid #edf1f7;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  p {
    color: #4e5152;
    font-size: 12px;
    line-height: 18px;
  }
`;
export const Delete = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  p {
    color: #4e5152;
    font-size: 12px;
    line-height: 18px;
  }
`;
export const ModalWrapper = styled.div`
  border: solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #edf1f7;
  border-radius: 12px;
  z-index: 999;
  position: relative;
  left: 100px;
  bottom: 50px;
`;
export const LogoWrapper = styled.div`
  padding: 0;
  margin: 0;
`;
export const CardName = styled.p`
  color: #242627;
  font-weight: 600;
  font-size: 20px;
  line-height: 21px;
`;
export const CountryContainer = styled.div`
  /* position: relative;
  min-width: 230px;
  max-width: 342px;
  background: #ffffff;
  height: 108px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);

  ${({ hover }) =>
    hover &&
    `
      border: 1px solid #00A2D4;
			box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1);
		`}; */

  background-image: url("./countryC.png"); /* The image used */
  height: 500px; /* You must set a specified height */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire 
                          container */
`;

export const Bg = styled.div`
  position: absolute;
  top: -4px;
  right: -8px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

export const TopLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const TopRight = styled.div`
  cursor: pointer;
`;

export const Content = styled.div`
  z-index: 0;
  padding: 14px 24px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
`;
export const Item = styled.div`
  border-right: 1px solid #edf1f7;
  display: flex;
  gap: 8px;
  align-items: center;
  padding-inline: 8px;
  p {
    color: #4e5152;
  }
`;

// t

export const Container = styled.div`
  /* min-width: 230px;
  max-width: 300px;
  max-height: 238px;
  background: #ffffff; */
  min-width: 230px;
  max-width: 342px;
  background: #ffffff;
  height: 108px;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  /* padding: 2px; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;
  flex: 1;
  /* cursor: ${({ rewardspage }) => (rewardspage ? "pointer" : "")}; */
  cursor: pointer;
  overflow: hidden;

  ${({ hover }) =>
    hover &&
    `
			// background: #00a2d4;
      border: 1px solid #00A2D4;
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
  right: -7px;

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
				// fill: rgba(255, 255, 255, 0.64);
			}
		}
		`};
`;

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  /* padding-inline: 24px; */
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
			// color: #ffffff;
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
			// color: #f1f1f1;
		`};
`;

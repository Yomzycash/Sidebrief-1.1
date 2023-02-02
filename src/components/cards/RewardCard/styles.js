import styled from "styled-components";

export const Container = styled.div`
  min-width: clamp(181px, 18vw, 263px);
  width: 100%;
  /* max-width: 263px; */
  max-width: 300px;
  min-height: 120px;
  max-height: 238px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  padding: clamp(16px, 1.5vw, 24px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 17px;
  transition: all 0.2s;
  flex: 1;
  cursor: ${({ rewardspage }) => (rewardspage ? "pointer" : "")};
  overflow: hidden;

  ${({ hover }) =>
    hover &&
    `
      border: 1px solid #00A2D4;
			box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1);
		`};

  @media screen and (max-width: 700px) {
    max-width: 100%;
  }
`;

export const Corner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  /* 
	svg {
		ellipse {
			fill: rgba(204, 243, 255, 0.48);
			fill-opacity: 1;
		}
	} */

  /* ${({ hover }) =>
    hover &&
    `
		svg {
			ellipse {
				// fill: rgba(255, 255, 255, 0.64);
			}
		}
		`}; */
`;

export const CornerMobile = styled.div`
  @media screen and (min-width: 801px) {
    display: none;
  }
`;

export const CornerDesktop = styled.div`
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 1.6vw, 24px);

  @media screen and (max-width: 532px) {
    flex-direction: row;
  }
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
  gap: clamp(4px, 1.5vw, 8px);
`;

export const Title = styled.h4`
  font-family: "BR Firma";
  font-weight: 600;
  font-size: clamp(15px, 1.5vw, 20px);
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #242627;

  ${({ hover }) =>
    hover &&
    `
			// color: #ffffff;
		`};

  @media screen and (max-width: 532px) {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const Message = styled.h5`
  font-family: "BR Firma";
  font-weight: 600;
  font-size: clamp(15px, 1.5vw, 20px);
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #242627;

  ${({ hover }) =>
    hover &&
    `
			// color: #ffffff;
		`};

  @media screen and (max-width: 532px) {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const Body = styled.p`
  font-family: "BR Firma";
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;

  ${({ hover }) =>
    hover &&
    `
			// color: #f1f1f1;
		`};

  @media screen and (max-width: 532px) {
    font-size: 14px;
  }
`;

export const StartButton = styled.button`
  height: 36px;
  border-radius: 8px;
  border: none;
  background: transparent;
  display: ${({ hide }) => (hide ? "none" : "")};

  @media screen and (max-width: 760px) {
    display: none;
  }
`;

export const Badge = styled.div`
  position: relative
  text-decoration: none
  padding: 3px 15px
  color: white
  font-weight: 500
  border-radius: 0px

  &:before
    content: ""
    position: absolute
    z-index: -1
    background: yellow
    color: blue
    top: -1px
    right: -1px
    bottom: -1px
    left: -1px
    border-radius: 12px
  
`
export const CategoryName = styled.p`
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
`;

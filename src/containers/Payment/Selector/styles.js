import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid #edf1f7;
  border-bottom: 1px solid #edf1f7;

  @media screen and (max-width: 600px) {
    border-bottom: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;
    padding: 24px 48px;
  }
`;

export const PayProvide = styled.button`
  flex: 1;
  max-height: 80px;

  background: #fff;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;

  ${({ active }) =>
    active
      ? `
   background: #edf1f755;
  box-shadow: 0 0 15px 4px #bbbbbb55 inset;

   `
      : null}

  @media screen and (max-width: 600px) {
    flex: none;
    height: 60px;
    border: 1px solid #edf1f7;
  }

  &:hover {
    background: ${({ active }) => (active ? "" : "#edf1f788")};
  }

  img {
    height: 100%;
    max-width: 150px;
    width: 100%;
    object-fit: contain;
  }

  p {
    font-family: BR Firma;
    font-size: clamp(18px, 1.8vw, 20px);
    font-weight: 600;
    line-height: 21px;
    text-align: center;
    color: #151717;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

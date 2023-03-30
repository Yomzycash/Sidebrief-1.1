import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% - clamp(24px, 3.4vw, 40px) clamp(24px, 3.4vw, 40px));
  margin-inline: clamp(24px, 3.4vw, 40px);
  margin-block: clamp(10px, 2vw, 20px);
  min-height: 150px;

  background: ${({ theme }) => theme.blue2};
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 5px;
  padding: 55px 63px 52px;
  color: white;
  font-family: "BR Firma";

  display: flex;
  justify-content: space-between;
`;

export const LHS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const RHS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  min-width: max-content;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const NormalText = styled.p`
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;

  display: flex;
  gap: 9px;
  align-items: center;
`;

export const BigText = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  display: flex;
  gap: 9px;
  align-items: center;
`;

export const CountryName = styled(BigText)`
  display: flex;
  align-items: center;
  font-weight: 900;
  text-transform: uppercase;

  img {
    width: 22px;
    height: auto;
    text-transform: none;
  }
`;

export const Documents = styled.div`
  display: flex;
  column-gap: 25px;
  flex-wrap: wrap;
`;

export const Doc = styled(NormalText)`
  font-weight: 700;
  line-height: 21px;
`;

export const DocumentList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

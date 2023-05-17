import styled from "styled-components";

export const StaffContainer = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  /* padding-top: 40px; */

  h3 {
    font-size: 24px;
    margin-left: 40px;
  }
`;

export const StatusCardContainer = styled.div`
  margin-block: 8px;
  width: 100%;

  @media screen and (max-width:800px) {
    display:none;
  }
  
`;
export const Top = styled.div``;
export const Body = styled.div`
  display: flex;
  flex-flow: column;
`;
export const Main = styled.div`
  display: flex;
  flex-flow: column;
  gap: 30px;
`;
export const Recently = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex: 1;
  gap: 16px;
`;

export const Contain = styled.div`
  display:none;

  @media screen and (max-width:700px) {
    display:flex;
    flex-direction:column;
    width:100%;
  }
`

export const BusinessSummaryCard = styled.div`

  @media screen and (max-width:700px) {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    grid-gap: 10px;
    
  }
 

  @media screen and (max-width:500px) {
    display: grid;
    grid-template-columns:1fr;
    grid-gap: 10px;
    padding-top:25px; 
  }

`;

export const Wrapper = styled.div`
  @media screen and (max-width:700px) {
    box-sizing: border-box;
    width: 100%;
    padding: 0px 5px ;
    border-left: 2px solid #00A2D4;
  }
 

`;

export const TitleWrapper = styled.div`
  @media screen and (max-width:700px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
`;
export const Title = styled.h2`
@media screen and (max-width:700px) {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  letter-spacing: -0.01em;

  color: #000;
}
`;
export const ArrowDown = styled.div`
  @media screen and (max-width:700px) {
    display: flex;
    align-items: center;
    cursor: pointer;
    transform: ${({ isActive }) => (isActive ? "rotate(45deg)" : "")};
    transition: 0.3s transform ease;
    padding: 0 5px;
  }
  
`;

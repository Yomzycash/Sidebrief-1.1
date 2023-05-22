import styled from "styled-components";

export const Container = styled.div`
  padding-inline: clamp(0px, 2vw, 40px);
  /* padding-inline: 40px; */
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 40px;
  height: max-content;

  /* @media screen and (max-width: 1050px) {
    padding-inline: 0;
  } */

  @media screen and (max-width: 700px) {
    padding-inline: 0;
    gap: 24px;
    height: 100%;
    flex: 1;
  }
`;

export const Body = styled.div`
  @media screen and (max-width: 700px) {
    padding-inline: 24px;
  }
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;

  & > div:first-of-type {
    flex: 1;
  }
`;
export const DetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;

  & > div:first-of-type {
    flex: 2;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

export const Loader = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100px;
`;
export const LastWrapper = styled.div`
  max-width: 100%;
  @media screen and (max-width: 700px) {
    max-width: 100%;

    position: sticky;
    bottom: 0px;
    padding: 24px;
    z-index: 1000;
    background-color: #ffffff;
  }
`;


export const DocumentWrapper = styled.div`
  width: 100%;
  height: 190px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 16px;
  padding: 40px 24px 56px 24px;
`;


export const DocumentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const Title = styled.h2`
  font-weight: 500;
  line-height: 20px;
  color: #4E5152;
`

export const SubText = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #959697;
  padding:20px 0;
  max-width:500px;
`
// STAFF SIDE
export const TopContainer = styled.div`
  display:flex;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    display:flex;
    flex-direction:column;
    gap:10px;
  }

`

export const Left = styled.div`

  span {
    color : #00A2D4;
    font-weight:500;
    font-size:14px;
    padding-left:10px;
  }

`
export const Image = styled.img`
  width: 55px;
  object-fit: contain;
`;

export const Right = styled.div` 
`

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
  

  h5 {
    color: #959697;
    font-weight:normal;
  }
`;
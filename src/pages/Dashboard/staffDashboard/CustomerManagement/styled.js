import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0 40px;
  height: calc(100vh - 57px);
  overflow: scroll;
`;

export const Header = styled.div`
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 20px;
  margin: 0 0 24px;
  border: 1px solid #edf1f7;
  border-top: none;
  border-radius: 16px;
  background-color: #fff;
  z-index: 3;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

export const TopSection = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 20px;
  border: 1px solid #edf1f7;
  border-top: none;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  height: 100%;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`;

export const SearchBlock = styled.div`
  position: relative;
  right: 30px;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;

  @media screen and (max-width: 700px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  width: max-content;
`;

export const EachDate = styled.div`
  border: 1px solid #edf1f7;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;

  input {
    border: none;
    margin-left: 5px;
  }
`;

export const HeaderText = styled.h3`
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.grey1};
`;

export const MainSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding-right: 20px;
`;
export const LeftSection = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
  width: 70%;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MetricSection = styled.div``;

export const MetricContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem 4rem;
  gap: 2rem;
  width: 100%;
  padding: 0px;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const Users = styled.div`
  span {
    color: #d400cc;
  }
`;

export const LaunchClients = styled.div`
  span {
    :nth-of-type(1) {
      color: #00d448;
    }
    :nth-of-type(2) {
      color: #c54130;
    }
  }
`;

export const ManageClients = styled.div`
  span {
    :nth-of-type(1) {
      color: #1f9fbd;
    }
    :nth-of-type(2) {
      color: #d400cc;
    }
  }
`;

export const TextWrapper = styled.div``;

export const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #fff
  border-bottom: 1px solid #edf1f7;
`;

export const TableSection = styled.div`
  padding: 24px;
  border: 1px solid #edf1f7;
  border-radius: 8px;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;

  > p {
    font-weight: 600;
    font-size: clamp(18px, 2vw, 20px);
    color: #242627;
  }
`;

export const SubHeader = styled.div`
  position: sticky;
  top: 135px;
  display: flex;
  height: clamp(48px, 10vw, 58px);
  gap: 24px;
  border-top: none;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #fff;
  // @media screen and (max-width: 700px) {
  //   display:none;
  // }
`;
export const RightSection = styled.div`
  position: sticky;
  top: 143px;
  width: 30%;
  min-width: 250px;
  max-width: max-content;
  height: max-content;

  > div {
    border: 1px solid #edf1f7;
    border-radius: 8px;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const UserInfoCard = styled.div`
  padding: 10px;
`;

export const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  width: "100%",
  height: "40px",
  flex: "1",
};

export const iconStyle = { width: "17px", height: "17px" };
export const BackContainer = styled.div`
  display: flex;
  justify-content: flex-start
  align-content: center;
  padding-top:15px;
  gap: 8px;
  cursor: pointer;

`;

export const UserSection = styled.div`
  position: sticky;
  top: 143px;
  width: 30%;
  min-width: 320px;
  max-width: max-content;
  height: max-content;

  > div {
    border: 1px solid #edf1f7;
    border-radius: 8px;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const EmailSection = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  border: 1px solid #edf1f7;
  width: 100%;
  padding: 0px 15px 20px;
  border-radius: 8px;

  .input-container-class {
    margin: 0;
  }
`;

export const ToContainer = styled.div`
  // display: flex;
  // align-items: center;
  padding: 15px;
  bottom: 10px;
`;

export const SubjectContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
export const IntroTextContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  textarea {
    height: 150px;
  }
`;

export const SendContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: normal;
  padding: 0px 15px;
`;

export const InitialsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const Initials = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 102px;
  height: 102px;
  background: #00a2d4;
  color: #fff;
  font-size: 2em;
`;
export const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;
export const CategoryContainer = styled.div`
  display: flex;
  flex-basis: 33.33%;
  flex-direction: column;
  padding-top: 14px;
  padding-right: 10px;
`;
export const Category = styled.p`
  text-transform: uppercase;
  font-weight: light;
  font-style: normal;
  font-size: 10px;
  color: #9e9ea7;
  // color:#00A2D4;
`;
export const CategoryItem = styled.p`
  font-weight: 600;
  color: #000;
  font-size: 12px;
  white-space: nowrap;
`;

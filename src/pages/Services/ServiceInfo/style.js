import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #fcfcfc;
  width: 100%;
  flex: 1;
  min-height: 100vh;

  .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
    border-radius: 16px !important;
    /* width: 100% !important;
  max-width: 962px !important; */
    max-width: max-content !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }
`;

export const Body = styled.form`
  display: flex;
  flex-flow: column;
  height: 100%;
  margin: auto;
  width: 100%;
  max-width: 962px;
  background-color: white;
  border: 1px solid #edf1f6;
  border-top: none;
  flex: 1;
  padding-bottom: 100px;
  border-top: none;
`;

export const Bottom = styled.div`
  display: flex;
  width: 100%;
  padding: 32px clamp(24px, 3.4vw, 40px);
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  row-gap: 24px;
  column-gap: 20px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
export const DownLoadText = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  margin-top: 48px;
  margin-bottom: 32px;
  color: #242627;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-bottom: 20px;
`;

export const InfoContainer = styled.div`
  min-height: 150px;
  width: calc(100% - 32px clamp(24px, 3.4vw, 40px));
  margin-inline: 32px clamp(24px, 3.4vw, 40px);
  margin-block: clamp(20px, 2vw, 24px);

  border: 1px solid ${({ theme }) => theme.grey5};
  border-radius: 16px;
  padding: 20px;

  display: flex;
`;

export const Bullet = styled.div`
  display: flex;
  gap: 16px;
  flex-flow: ${(props) => (props.flow ? props.flow : "")};

  font-size: 20px;
  color: #00a2d4;
`;

export const Content = styled.p`
  text-transform: capitalize;
  font-family: "BR Firma";
  font-weight: 400;
  font-size: clamp(12px, 1.2vw, 14px);
  line-height: 21px;
  color: #4e5152;
`;

export const InfoFrame = styled.div`
  flex: ${({ space }) => (space ? 1.5 : 1)};
  position: relative;

  &::after {
    content: "";
    display: block;
    height: 80%;
    width: 1px;
    background: ${({ theme }) => theme.grey5};
    position: absolute;
    right: 10%;
    top: 20%;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }
`;

export const InfoFrameHead = styled.h5`
  font-weight: 600;
  font-size: 24px;
  line-height: 21px;
  margin-bottom: 20px;
`;

export const BigContent = styled(Content)`
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
`;

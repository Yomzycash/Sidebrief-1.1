import styled from "styled-components";

export const NotificationWrapper = styled.div`
  min-width: 300px;
  width: 32%;
  max-width: 450px;
  position: fixed;
  top: 50px;
  right: 24px;
  z-index: 10;
  box-shadow: 0 10px 10px 5px #95969714;
  border-radius: 10px;
  overflow-x: hidden;
  background-color: white;
  border: 1px solid #edf1f6;
  padding: 10px;
`;

export const NotificationHeader = styled.div`
  padding: 16px 16px 0;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #151717;
  }

  > p {
    font-size: 17px;
  }
`;

export const HeaderToggle = styled.div`
  display: flex;
  margin-block: 20px 10px;
  border-bottom: 2px solid #edf1f7;
`;

export const HeaderActive = styled.div`
  cursor: pointer;
  padding: 10px;
  font-size: 12px;
  border-bottom: ${({ active, theme }) =>
    active ? `2px solid ${theme.blue2}` : ""};
`;

export const NotificationMessages = styled.div`
  max-height: 270px;
  width: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #edf1f7;
  }

  // ::-webkit-scrollbar-thumb:hover {
  //   background-color: #00a2d4;
  // }
`;

export const NotificationContainer = styled.div`
  display: flex;
  gap: 12px;

  padding: 16px;
  border-bottom: "1px solid #edf1f6";
  border-radius: 10px;

  opacity: ${({ $read }) => ($read ? 0.6 : 1)};

  :hover {
    background-color: #00a2d419;
    cursor: pointer;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 40px;
  max-width: 40px;
  min-height: 40px;
  max-height: 40px;
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: 700;

  color: #fff;
  background-color: ${({ theme, isMyMessage }) =>
    isMyMessage ? "#00B895" : "#6a00c1"};
`;

export const Message = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;

  h6 {
    color: #151717;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
  }
  > p {
    color: #959697;
    font-size: 12px;
  }
`;

export const MessageTIme = styled.div`
  align-self: flex-end;
  color: #00a2d4;
  font-size: 11px;
  margin-top: 10px;
`;

export const MessageSubject = styled.h5`
  line-height: 24px;
  color: #4e5152;

  span {
    float: right;
    color: #151717;
    font-size: 14px;
    font-weight: 300;
  }
`;

export const MessageBody = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #151717;
`;

export const NotificationBadge = styled.div`
  border-radius: 100%;
  background-color: ${({ theme }) => theme.blue2};
  padding: 2px 5px 2px;
  display: flex;
  position: absolute;
  top: -10px;
  right: -10px;
  color: white;
  p {
    font-size: 12px;
    font-weight: bold;
  }
`;

import styled from "styled-components";

export const Registration = styled.div`
  display: flex;
  flex-flow: column;
  height: max-content;
  gap: 12px;
`;
export const TestBlock = styled.div`
  height: 1px;
  width: 100%;
`;
export const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: clamp(32px, 3.2vw, 40px);
  height: max-content;

  @media screen and (max-width: 1000px) {
    margin-top: 20px;
  }
`;
export const Body = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;

export const Bottom = styled.div`
  display: flex;
`;

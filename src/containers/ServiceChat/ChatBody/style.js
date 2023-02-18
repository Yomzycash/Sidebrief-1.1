import styled from "styled-components";
export const Wrapper = styled.div``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Messages = styled.div`
  padding-inline: 24px;
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column-reverse;
  gap: 8px;

  margin-bottom: 40px;
`;

export const TextInputForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-inline: 24px;
`;
export const TextBody = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;

  button {
    margin-top: 25px;
  }
`;
export const SubjectInput = styled.input`
  padding: 16px 13px;
  flex: 1;
  border: none;
  width: 100%;
  border-bottom: 0.5px solid #4a4a4a;
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000;
  resize: none;

  &::placeholder {
    color: #727474;
  }
`;

export const TextInput = styled.textarea`
  height: 120px;
  padding: 16px 13px;
  flex: 1;
  border: none;

  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000;
  resize: none;

  &::placeholder {
    color: #727474;
  }
  margin-bottom: 40px;
`;

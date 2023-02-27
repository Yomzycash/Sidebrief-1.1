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
  max-height: calc(100vh - 482px);

  display: flex;
  flex-direction: column-reverse;
  gap: 12px;

  padding-block: 24px;

  ::-webkit-scrollbar {
    width: 5px;
    background-color: #f4f4f4;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
  }
`;

export const TextInputForm = styled.form`
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

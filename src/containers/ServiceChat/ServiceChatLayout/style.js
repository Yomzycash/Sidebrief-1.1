import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(350px, 400px) minmax(500px, 1fr);
  max-height: calc(100vh - 57px);
  border-inline: 1px solid #edf1f7;
`;

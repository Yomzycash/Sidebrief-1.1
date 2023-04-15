import styled from "styled-components";

export const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 24px;
  padding: 30px clamp(24px, 3.4vw, 40px);

  @media screen and (max-width: 600px) {
    display: flex;
    flex-flow: row wrap;
  }
`;

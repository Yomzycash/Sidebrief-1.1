import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  padding: 40px 40px 20px;
`
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;

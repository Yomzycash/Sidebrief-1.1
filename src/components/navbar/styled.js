import styled from 'styled-components';

export const NavWrapper = styled.div`
    align-items: center;
    display: flex;  
    flex-direction: row;
    padding: 48px 80px;

    @media screen and (max-width: 550px) {
        padding: 48px 24px;
      }
`;

export const Image = styled.img`
    @media screen and (max-width: 550px) {
        width: 84px;
        height: 20px;
      }
`;
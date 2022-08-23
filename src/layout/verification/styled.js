import styled from 'styled-components';

export const SuccessWrapper = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;  
    flex-direction: column;
    margin-top: 67px;

    @media screen and (max-width: 600px) {
        padding: 0px 24px;
      }

`;
export const TextWrapper = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;  
    flex-direction: column;
    max-width: 590px;
    min-width: 300px;
`;

export const ParagraphText = styled.p`
    color: #4E5152;
    font-size: 20px;
    font-weight: 400;
    text-align: center;

    @media screen and (max-width: 600px) {
    font-size: 14px;
      }
`;

export const Image = styled.img`
    @media screen and (max-width: 600px) {
        width: 128px;
        height: 128px;
      }
`;

export const ResendTextWrapper = styled.div`
    display: flex;
`;



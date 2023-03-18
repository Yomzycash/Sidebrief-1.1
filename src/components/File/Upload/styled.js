import styled from "styled-components"

export const DocumentSection = styled.div``

export const Paragraph = styled.p`
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0px;
    text-align: left;
    padding-top:20px
`
export const Divider = styled.hr`
    width:100%;
    color:#EDF1F6;
   // padding-top:5px;
`

export const Document = styled.div`
    display: flex;
	flex-direction: row;
    padding:10px;
`
export const DocumentDownload = styled.div`
    width: 100%;
    max-width: 195px;
    min-height: 120px;
    max-height: 238px;
    background: #ffffff;
    border: 1px solid #edf1f7;
    box-shadow: 0px 10px 10px -5px #9596970a;
    border-radius: 16px;
    padding: clamp(16px, 1.5vw, 24px);
    margin:10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 17px;
`
export const DocumentFrame = styled.div`
	display: flex;
	flex-direction: column;
    justify-content:center;
    align-items:center;
	gap: clamp(16px, 1.6vw, 24px);
`;

export const DocumentText = styled.p`
    color: #4E5152;
    font-size: 14px;
    font-weight: 500;
    text-align:center;
`
export const SmallText = styled.h5`
    font-size: 8px;
    color: #4E5152;
    font-weight: 500;
    opacity:0.5;
`
import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    padding-left: 20px;
`
export const Header = styled.div`
    display: flex;
    flex-flow: column;
   

    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;

export const TopSection = styled.div`
    width: 100%;
    height:100%;
    padding-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block-end: 20px;
    border: 1px solid #edf1f7;
    border-top: none;
`;

export const LeftContainer = styled.div`
    width:100%;
    height:100%;
    padding-inline:24px;
`
export const ButtonContainer = styled.div`
    position:relative;
    top:15px;
`

export const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 200px;
`;

export const SearchBlock = styled.div`
    position:relative;
    right:30px;

    @media screen and (max-width:700px){
      display:none;
    }
`

export const SearchWrapper = styled.div`
  max-width: 384px;
  height: 40px;
  width: 100%;
  @media screen and (max-width: 700px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const HeaderText = styled.h3`
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 30px;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.grey1};
    padding-top:10px;

    @media screen and (max-width:700px){
      font-size:1rem;
    }
`

export const MainSection = styled.div`
  width:100%;
  display:flex;
  flex-direction: row;
  gap:30px;
  // padding-right: 20px
`
export const LeftSection = styled.div`
  display:flex
 // max-height: calc(100vh - 136.96px);
  overflow-y: auto;
  width: 70%;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width:700px){
    width:100%;
  }

`;

export const MetricSection = styled.div`
`

export const StyledWrapper = styled.div`
	width: 100%;
	height: 168px;
	padding: 24px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px #9596970a;
	border-radius: 16px;

	@media screen and (min-width: 701px) {
		grid-row: span 2;
		grid-column: span 1;
		width:auto
	}
	
	@media screen and (max-width: 700px) {
		grid-row: span 2;
		grid-column: span 1;
		width:100%;
	}
`;
export const MetricContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap:3rem 4rem;
    gap:2rem;
    width: 100%;
    padding: 0px;

    @media screen and (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`

export const TextWrapper = styled.div`

`


export const Number = styled.h3`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: #242627;
  padding:10px 0;
	// margin-block-end: 8px;
`;

export const TopText = styled.h4`
	font-weight: 500;
	font-size: clamp(12px, 1.2vw, 14px);
	line-height: 21px;
	letter-spacing: -0.01em;
	color: #4e5152;
  white-space: nowrap;

`
export const Divider = styled.hr`
    width:100%;
    height:1px;
    border-bottom: 1px solid #edf1f7;
    margin-top: .5rem;
    margin-bottom: .5rem;
    
`
export const BottomText = styled.h4`
  font-weight: 500;
  font-size: clamp(10px, 1vw, 12px);
  line-height: 21px;
	letter-spacing: -0.01em;
	color: #4e5152;
  white-space: nowrap;

`

export const TableSection = styled.div`
  
`

export const SubHeader = styled.div`
  display: flex;
  height: clamp(48px, 10vw, 58px);
  gap: 24px;
  border: 1px solid #edf1f7;
  border-top: none;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-inline: 24px;

  // @media screen and (max-width: 700px) {
  //   display:none;
  // }
`;
export const RightSection = styled.div`
  width: 25%;
  max-width: max-content;
  height:100%
  // max-height: calc(100vh - 106.96px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  
  @media screen and (max-width:700px){
    display:none;
  }
`;

export const BackContainer = styled.div`
  display: flex;
  justify-content: flex-start
  align-content: normal;
  padding-top:15px;
  gap: 8px;
  cursor: pointer;
`;

export const EmailSection = styled.div`
  border: 1px solid #edf1f7;
  height:480px;
  width:100%;
`

export const ToContainer = styled.div`
  // display: flex;
  // align-items: center;
  padding:15px;
  bottom:10px;
`

export const SubjectContainer = styled.div`
  display: flex;
  align-items: center;
  padding:0px 15px;
  position:relative;
  bottom:30px;
`
export const IntroTextContainer = styled.div`
  display: flex;
  align-items: center;
  padding:0px 15px;
  position:relative;
  bottom:40px;
`

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding:0px 15px;
  width:100%;
  // height:150px;
  position:relative;
  bottom:50px;
`


export const SendContainer = styled.div`
  display:flex;
  justify-content:flex-end;
  align-content:normal;
  padding:0px 15px;
`


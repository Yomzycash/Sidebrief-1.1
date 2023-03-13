import styled from "styled-components";

export const NavigationWrapper = styled.div``;

export const TabWrapper = styled.div`
  padding: 10px;
  display:inline-block;
  border-bottom: ${(props) =>
    props.isActive ? "3px solid #00A2D4" : "3px solid transparent"};
  cursor: pointer;
  color: ${(props) =>
    props.isActive ? "#242627" : "#4E5152"};
`;

export const ContentWrapper = styled.div`
	margin-top:30px;
	padding:35px 10px;
	border: 1px solid #EDF1F7;
	border-radius:5px;
`

export const TemplateBtn = styled.div`
	display
`;
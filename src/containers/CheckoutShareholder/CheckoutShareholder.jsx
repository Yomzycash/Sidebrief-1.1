import React from 'react';
import styled from "styled-components";
import {  InputWithLabel, DropDown} from "components/input";
import Checkbox from "components/input/Checkbox";
import NumberInput from "components/input/phoneNumberInput";



const CheckoutShareholder = ({
    title ='Shareholder’s Information', 
    page= "1"}
) => 

{
  return (
    <Wrapper>
       <TitleWrapper>
            <Title>
                {title}:
            </Title>
            <NumberPage>{page} of 4</NumberPage>
            </TitleWrapper>
        
        <ContentWrapper>
        
       <InputWithLabel
			label="Full Name"
			bottomText="Please start with the first name then the middle name (if available) and finally the last name"
			type="text"
			register={() => {}}/>


         <DetailedSection>  
         <NumberInput
            
			label="Phone number"
            /> 


        <InputWithLabel
		
	
			label="Email Address"
			type="email"
			register={() => {}}
            /> 

        </DetailedSection>
        <DetailedSection>
         <DropDown
            containerStyle={"DetailedSection"}
            labelStyle={"Label"}
            label="Share Percentage"
        /> 

        <DropDown
            containerStyle={"DetailedSection"}
            labelStyle={"Label"}
            label="Share Type"
        /> 
            </DetailedSection>
            </ContentWrapper>

        <DetailedSection> 

               
        <Checkbox/>
        
        <Checkbox
        text1="Click here if "
        styledSpan1="shareholder "
        text2= "is also a "
        styledSpan2="Director "
        />  
        </DetailedSection>

        




            
    </Wrapper>
    
  )
}

export default CheckoutShareholder

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
gap: 32px;

`
const ContentWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 2px;
justify-content: center;

`
const TitleWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color:#00A2D4;

`
const Title = styled.h3`
font-family: 'BR Firma';
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 21px;


`
const NumberPage = styled.h4`
font-family: 'BR Firma';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 21px;
letter-spacing: -0.5px;
`
const DetailedSection= styled.div`
display: flex;
flex-direction: flex;
align-items: center;
gap: 20px;
width: 100%;
`


import DynamicForm from "components/Form/DynamicForm";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutSection } from "containers";
import { ServiceID } from "containers/ServiceChat/ChatHead/style";
import React from "react";
import { Body, Container, Inputs } from "../styled";
import { FormContainer, formInputsStyle, formStyle } from "./style";

const ServiceForm = () => {

// name uniqueness has to be validated
const formInfo = [
  {
    question: "When did you register your company",
    type: "number",
    name: "registration",
    required: true,
  },
  {
    question: "Who is your favourite artist",
    type: "text",
    options: ["davido", "wizkid", "burna"],
    name: "artist",
    required: true,
  },
  {
    question: "How many shareholders do you have",
    type: "number",
    name: "shareholders",
    required: true,
  },{
    question: "How many directors do you have",
    type: "number",
    name: "directors",
    required: true,
  },{
    question: "How many beneficiaries do you have",
    type: "number",
    name: "beneficiaries",
    required: true,
  },
];

  return <Container>
    <ServicesCheckoutHeader/>
    <Body>
      <CheckoutSection title='Service Form' HeaderParagraph='Please answer the questions below' />
      <FormContainer>
        
      <DynamicForm formInfo={formInfo} style={formStyle} inputsStyle={formInputsStyle} />
      </FormContainer>

    </Body>
  </Container>;
};

export default ServiceForm;

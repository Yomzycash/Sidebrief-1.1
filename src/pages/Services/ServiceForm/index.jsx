import DynamicForm from "components/Form/DynamicForm";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutController, CheckoutSection } from "containers";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setServiceCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { Body, Container } from "../styled";
import { Bottom, FormContainer, formInputsStyle, formStyle } from "./style";

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
    },
    {
      question: "How many directors do you have",
      type: "number",
      name: "directors",
      required: true,
    },
    {
      question: "How many beneficiaries do you have",
      type: "number",
      name: "beneficiaries",
      required: true,
    },
  ];

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    console.log(formData);
    // store.dispatch();
    navigate("/services/documents");
  };

  const handlePrev = () => {
    const servicePaymentDetails = JSON.parse(localStorage.getItem("servicePaymentDetails"));
    if (servicePaymentDetails) {
      navigate("/services");
    } else {
      navigate("/services/payment");
    }
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 4, current: 2 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <ServicesCheckoutHeader />
      <Body>
        <CheckoutSection title="Service Form" HeaderParagraph="Please answer the questions below" />
        <FormContainer>
          <DynamicForm
            formInfo={formInfo}
            style={formStyle}
            inputsStyle={formInputsStyle}
            submitAction={handleSubmit}
          />
        </FormContainer>

        <Bottom>
          <CheckoutController
            backText={"Previous"}
            forwardSubmit
            backAction={handlePrev}
            forwardAction={handleSubmit}
            forwardText="Next"
          />
        </Bottom>
      </Body>
    </Container>
  );
};

export default ServiceForm;

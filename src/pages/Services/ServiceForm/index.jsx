import DynamicForm from "components/Form/DynamicForm";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutController, CheckoutSection } from "containers";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setServiceCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { useGetSingleServiceQuery } from "services/staffService";
import { handleError } from "utils/globalFunctions";
import { Body, Container } from "../styled";
import { FormContainer, formInputsStyle, formStyle } from "./style";

const ServiceForm = () => {
  const { data } = useGetSingleServiceQuery("2673756897");
  const [serviceInfo, setServiceInfo] = useState({});

  // name uniqueness has to be validated
  const formInfo = [
    {
      question: "When did you register your company",
      questionType: "input",
      name: "registration",
      required: true,
    },
    {
      question: "Who is your favourite artist",
      questionType: "radio",
      options: ["davido", "wizkid", "burna"],
      name: "artist",
      required: true,
    },
    {
      question: "How many shareholders do you have",
      questionType: "number",
      name: "shareholders",
      required: true,
    },
    {
      question: "How many directors do you have",
      questionType: "number",
      name: "directors",
      required: true,
    },
    {
      question: "Select your favourite colors",
      questionType: "checkbox",
      options: ["black", "white", "green", "yellow"],
      name: "beneficiaries",
      required: true,
    },
  ];

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    console.log(formData);
    // store.dispatch();
    // navigate("/services/documents");
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
            formInfo={data?.serviceForm}
            style={formStyle}
            inputsStyle={formInputsStyle}
            submitAction={handleSubmit}
          />
        </FormContainer>
      </Body>
    </Container>
  );
};

export default ServiceForm;

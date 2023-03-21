import DynamicForm from "components/Form/DynamicForm";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutController, CheckoutSection } from "containers";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setServiceCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { useAddComplyDataQAMutation } from "services/complyService";
import { useGetSingleServiceQuery } from "services/staffService";
import { handleError } from "utils/globalFunctions";
import { Body, Container } from "../styled";
import { FormContainer, formInputsStyle, formStyle } from "./style";

const ServiceForm = () => {
  const { data } = useGetSingleServiceQuery("2673756897");
  const [serviceInfo, setServiceInfo] = useState({});
  const [addComplyData, addState] = useAddComplyDataQAMutation();

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    let payload = data?.serviceForm?.map((el) => ({
      complyCode: "302033545077050509",
      complyData: {
        complyQuestion: el.fieldQuestion,
        complyAnswer: formData[el.fieldName],
      },
    }));

    let addArray = payload.map((el, i) => addComplyData(el));
    let responses = await Promise.all(addArray);

    let error = responses.find((el) => el?.error);

    if (error?.error) {
      handleError(error);
      return;
    } else {
      toast.success("Questions submitted successfully");
      navigate("/services/documents");
    }

    console.log(responses);

    // payload.forEach((el, i) => {
    //   let response = await addComplyData(payload[i])
    // });
    // console.log(payload);
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

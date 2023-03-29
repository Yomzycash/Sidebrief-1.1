import DynamicForm from "components/Form/DynamicForm";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutController, CheckoutSection } from "containers";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Puff } from "react-loading-icons";
import { useNavigate } from "react-router-dom";
import { setServiceCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { useAddComplyDataQAMutation, useViewComplyQuery } from "services/complyService";
import { useGetSingleServiceQuery } from "services/staffService";
import { handleError } from "utils/globalFunctions";
import { Body, Container } from "../styled";
import { FormContainer, formInputsStyle, formStyle, Loading } from "./style";

const ServiceForm = () => {
  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
  let serviceId = complyInfo?.serviceId;

  let complyCode = complyInfo?.complyCode;

  const { data, isLoading } = useGetSingleServiceQuery(serviceId);
  const [addComplyData, addState] = useAddComplyDataQAMutation();
  const viewComply = useViewComplyQuery({ complyCode: complyCode });

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    let payload = data?.serviceForm?.map((el) => ({
      complyCode: complyCode,
      complyData: {
        complyQuestion: el.fieldQuestion,
        complyAnswer: formData[el.fieldName],
      },
    }));

    console.log(payload);
    let addArray = payload.map((el, i) => addComplyData(el));
    let responses = await Promise.all(addArray);
    console.log(responses);

    let error = responses.find((el) => el?.error)?.error;

    if (error) {
      console.log(error);
      handleError(error);
      return;
    } else {
      // toast.success("Submitted successfully");

      let link = "/services/documents";
      link = data?.serviceRequirements?.length < 1 ? "/services/review" : link;
      navigate(link);
    }
  };

  const handlePrev = () => {
    const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
    if (paymentDetails?.paymentStatus === "successful") {
      navigate("/services");
    } else {
      navigate("/services/payment");
    }
  };

  // Set the progress of the application
  useEffect(() => {
    viewComply.refetch();
    store.dispatch(setServiceCheckoutProgress({ total: 2, current: 1.4 })); // total- total pages and current - current page
  }, []);

  console.log(viewComply.data?.complyData);
  return (
    <Container>
      <ServicesCheckoutHeader />
      <Body>
        <CheckoutSection title="Service Form" HeaderParagraph="Please answer the questions below" />
        {isLoading && (
          <Loading>
            <Puff stroke="#00A2D4" width={35} />{" "}
          </Loading>
        )}
        <FormContainer>
          <DynamicForm
            formInfo={data?.serviceForm}
            previewInfo={viewComply.data?.complyData}
            style={formStyle}
            inputsStyle={formInputsStyle}
            handlePrev={handlePrev}
            submitAction={handleSubmit}
            loading={addState.isLoading}
          />
        </FormContainer>
      </Body>
    </Container>
  );
};

export default ServiceForm;

import React from "react";
import DynamicForm from "components/Form/DynamicForm";
import ServiceInfo from "./Services/ServiceInfo";
// import PaymentPage from "./Dashboard/User/Manage/Payment";
import QuestionnaireInput from "components/input/QuestionnaireInput";
import ToggleButton from "components/input/ToggleButton";
import Questionnaire from "components/input/Questeionnaire";
import QuestionReview from "components/input/Questeionnaire/QuestionReview";

const Test = () => {
  return (
    <div style={{}}>
      {/* <QuestionnaireInput/> */}
      {/* <ToggleButton rightText="Compulsory" /> */}
      <Questionnaire />
      <QuestionReview />
    </div>
  );
};

export default Test;

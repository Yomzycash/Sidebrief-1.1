import React from "react";
import DynamicForm from "components/Form/DynamicForm";
import ServiceInfo from "./Services/ServiceInfo";
// import PaymentPage from "./Dashboard/User/Manage/Payment";
import QuestionnaireInput from "components/input/QuestionnaireInput";
import AddDocument from "containers/AddDocument";
import ServiceTabbedNavigation from "components/tabbedDocument";
import TemplateCard from "components/cards/TemplateCard";
const Test = () => {
  return (
    <div>
      <TemplateCard />
      <ServiceTabbedNavigation/>
    </div>
  );
};

export default Test;

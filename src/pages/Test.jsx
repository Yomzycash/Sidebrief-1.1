import React from "react";
import DynamicForm from "components/Form/DynamicForm";
import ServiceInfo from "./Services/ServiceInfo";
// import PaymentPage from "./Dashboard/User/Manage/Payment";
// import QuestionnaireInput from "components/input/QuestionnaireInput";
// import AddDocument from "containers/AddDocument";
// import ServiceTabbedNavigation from "components/tabbedDocument";
import TemplateCard from "components/cards/TemplateCard";
import Download from "../components/File/Download"
import Upload from "../components/File/Upload"
const Test = () => {
  return (
    <div>
      <TemplateCard />
      <ServiceTabbedNavigation/>

      <Download />
      <Upload/>
    </div>
  );
};

export default Test;

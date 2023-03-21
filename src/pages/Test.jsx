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
import ServiceDocument from "./Services/ServiceDocuments";
import ReviewDocuments from "./Services/Review/ReviewDocuments";
import ServiceDetailHeader from "containers/ServiceDetailHeader";
import ServicesDetailLayout from "./Services/Detail/layout";
const Test = () => {
  const getStatus = (stat) => {
		switch (stat) {
			case "pending":
				return {
					text: "draft",
					color: "#00A2D4",
				};
			case "submitted":
				return {
					text: "submitted",
					color: "#D400CC",
				};
			default:
				return {
					text: stat,
					color: "black",
				};
		}
	};
  return (
    <div>
     {/* <TemplateCard /> */}
     

      {/* <Download /> */}
      {/* <Upload/>  */}
     <ServicesDetailLayout/>

    </div>
  );
};

export default Test;

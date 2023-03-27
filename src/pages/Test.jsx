import FormContainer from "containers/FormContainer";
import React from "react";
import UserService from "./Dashboard/User/Service"; // imp
import ServicesDetailLayout from "./Services/Detail/layout";
import ServiceInformation from "./Services/Detail/ServiceInformation";
import FormInformation from "./Services/Detail/FormInformation";
import DocumentInfoDetails from "./Services/Detail/DocumentInfoDetails";
import ServiceFormReview from "./Services/Review/ServiceForm";
import ServiceDocument from "./Services/ServiceDocuments";

const Test = () => {
  return (
    <div style={{}}>

      <UserService />
    </div>
  );
};

export default Test;

import React from "react";
import { Container, Name, ContentWrapper } from "./style";
import FileUpload from "components/FileUpload";

// Provides a container for the file upload inputs
// uses grid align already, responsive too
export const CheckoutInfoKYC = ({ name, errorMsg, inputName }) => {
  return (
    <Container>
      <Name>{name}</Name>
      <ContentWrapper>
        <FileUpload
          TopText={"Government Issued ID"}
          errorMsg={errorMsg}
          inputName={inputName}
          BottomText={
            "Driver’s Licence, National ID Card, Voters Card or International Passport"
          }
        />
        <FileUpload
          TopText={"Proof of Home Address"}
          errorMsg={errorMsg}
          inputName={inputName}
          BottomText={"Utility Bill, Water Corporation Bill or a Rent Invoice"}
        />
        <FileUpload
          TopText={"Passport Photograph"}
          errorMsg={errorMsg}
          inputName={inputName}
          BottomText={"Kindly ensure image is not larger than 3MB"}
        />
      </ContentWrapper>
    </Container>
  );
};

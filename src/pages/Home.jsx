import React from "react";
import FileUpload from "components/FileUpload";
import { ProgressBar } from "components/Indicators";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController, CheckoutSection } from "containers";

const Home = () => {
  return (
    <div style={{ maxWidth: "70%", margin: "auto" }}>
      <p>Welcome to sidebrief</p>

      <div>
        <ProgressBar progress={70} />
      </div>
      <FileUpload
        TopText="Government issued ID"
        BottomText="You can either upload a Driver's, National ID Card, Voters Card or International Passport "
      />

      <CheckoutSection
        title={"Mandatory Information"}
        subtitle={
          "Please provide Sidebrief with the following information or use side brief’s contact"
        }
      >
        Dummy Text
      </CheckoutSection>
      <CheckoutController
        backAction={() => console.log("Back button")}
        backText={"Previous"}
        forwardAction={() => console.log("Forward button")}
        forwardText={"Proceed"}
      />

      <HeaderCheckout />
    </div>
  );
};

export default Home;

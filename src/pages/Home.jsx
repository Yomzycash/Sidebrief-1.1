import React from "react";
import FileUpload from "components/FileUpload";
import { ProgressBar } from "components/Indicators";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController, CheckoutSection } from "containers";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RewardCard } from "components/cards";

const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
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
    </div>
  );
};

export default Home;

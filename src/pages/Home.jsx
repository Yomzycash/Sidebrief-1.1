import React, { useEffect, useState } from "react";
import RewardModal from "components/modal/RewardModal";
import StaffModalCards from "components/modal/StaffModalCards";
import PdfCards from "components/cards/PdfCard/PdfCards";
import { BusinessTable } from "components/Tables";
import {
  CheckoutFormInfo,
  PaymentForm,
  PaymentHeader,
  PaymentSelector,
} from "containers";
import SummaryCard from "components/cards/LaunchSummaryCard";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
import SuccessPage from "./Launch/PaymentSuccessPage/Index";
import FailedPage from "./Launch/FailedPage";
import ApplicationSuccessPage from "./Launch/ApplicationSuccessPage";
import FileUpload from "components/FileUpload";

const Home = () => {
  const [fileName, setFileName] = useState("");
  const [container, setContainer] = useState([]);

  //   const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  //   const { setUploadeddocs } = LaunchApplicationInfo;

  const handleSecondChange = (e) => {
    let f = e.target.name;
    let value = e.target.value;

    let type = e.target.files[0];
    console.log(type.type);
    let document = {};
    document = { [f]: value };
    setContainer([...container, document]);
  };

  console.log(container);

  return (
    <>
      <ApplicationSuccessPage />
      {/* <PaymentHeader />
			<PaymentSelector />
			<PaymentForm amount={22000} currency={"NGN"} USDprice={50.45} /> */}
      {/* <div style={{ width: '100%', padding: '20px' }}>
        <LaunchSummaryCard
          number={1}
          name="Femi Bamidele"
          shares="Preference Shares"
          email="oluwole5@gmail.com"
          phone={99999999}
          sharesPercentage={50}
      <div style={{ width: "100%", padding: "20px" }}>
        <FileUpload
          TopText={"Government ID"}
          onChange={handleSecondChange}
          // fileName={fileName}
          name="government"
          BottomText={"Utility Bill, Water Corporation Bill or a Rent Invoice"}
        />

        <FileUpload
          TopText={"Proof of Home Address"}
          name="proof"
          onChange={handleSecondChange}
          // fileName={fileName}
          BottomText={"Utility Bill, Water Corporation Bill or a Rent Invoice"}
        />

        <FileUpload
          TopText={"passport of Home Address"}
          name="passport"
          onChange={handleSecondChange}
          // fileName={fileName}
          BottomText={"Utility Bill, Water Corporation Bill or a Rent Invoice"}
        />
      </div> */}
    </>
  );
};
export default Home;

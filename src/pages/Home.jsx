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
      {/* <RewardModal />
			<StaffModalCards />
			<PdfCards />
			<CheckoutFormInfo title="Shareholder's Information" />
			<BusinessTable
				data={[
					{
						name: "Sidebrief Africa",
						type: "LLC",
						objective: "science",
						country: "Nigeria",
						date: "28/07/2022",
					},
					{
						name: "Quick chef",
						type: "LLC",
						objective: "construction",
						country: "Rwanda",
						date: "28/07/2022",
					},
				]}
			/> */}
      {/* <PaymentHeader />
			<PaymentSelector />
			<PaymentForm amount={22000} currency={"NGN"} USDprice={50.45} /> */}
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
      </div>
    </>
  );
};
export default Home;

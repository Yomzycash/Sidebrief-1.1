import React from "react";
import RewardModal from "components/modal/RewardModal";
import StaffModalCards from "components/modal/StaffModalCards";
import PdfCards from "components/cards/PdfCard/PdfCards";
import { BusinessTable } from "components/Tables";
import { CheckoutFormInfo, PaymentForm, PaymentHeader } from "containers";

const Home = () => {
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
			<PaymentHeader />
			<PaymentForm amount={22000} currency={"NGN"} USDprice={50.45} />
		</>
	);
};
export default Home;

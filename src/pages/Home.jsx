import React from "react";
import FileUpload from "components/FileUpload";
import { ProgressBar } from "components/Indicators";
import DropdownList from "react-widgets/DropdownList";
import {
	NigeriaFlag,
	KenyaFlag,
	SouthAfricaFlag,
	MalawiFlag,
	ZimbabweFlag,
} from "./Dashboard/assets";
import { CheckoutController, CheckoutSection } from "containers";

const Home = () => {
	const List = [
		{ id: 1, country: "Nigeria", flag: NigeriaFlag },
		{ id: 2, country: "Kenya", flag: KenyaFlag },
		{ id: 3, country: "South Africa", flag: SouthAfricaFlag },
		{ id: 4, country: "Malawi", flag: MalawiFlag },
		{ id: 5, country: "Zimbabwe", flag: ZimbabweFlag },
		{ id: 1, country: "Nigeria", flag: NigeriaFlag },
		{ id: 2, country: "Kenya", flag: KenyaFlag },
		{ id: 3, country: "South Africa", flag: SouthAfricaFlag },
		{ id: 4, country: "Malawi", flag: MalawiFlag },
		{ id: 5, country: "Zimbabwe", flag: ZimbabweFlag },
		{ id: 1, country: "Nigeria", flag: NigeriaFlag },
		{ id: 2, country: "Kenya", flag: KenyaFlag },
		{ id: 3, country: "South Africa", flag: SouthAfricaFlag },
		{ id: 4, country: "Malawi", flag: MalawiFlag },
		{ id: 5, country: "Zimbabwe", flag: ZimbabweFlag },
		{ id: 1, country: "Nigeria", flag: NigeriaFlag },
		{ id: 2, country: "Kenya", flag: KenyaFlag },
		{ id: 3, country: "South Africa", flag: SouthAfricaFlag },
		{ id: 4, country: "Malawi", flag: MalawiFlag },
		{ id: 5, country: "Zimbabwe", flag: ZimbabweFlag },
	];
	return (
		<div style={{ maxWidth: "70%", margin: "auto" }}>
			<p>Welcome to sidebrief</p>
			<DropdownList
				style={{ color: "#00A2D4" }}
				data={List}
				dataKey="id"
				textField="country"
				renderValue={({ item }) => (
					<span>
						<img src={item.flag} alt="" style={{ width: "20px" }} />
						{" " + item.country}
					</span>
				)}
				placeholder="Select Operational Country"
				groupBy={(data) => data.length}
				renderListGroup={() => (
					<span>{List.length + " countries available"}</span>
				)}
			/>
			<ProgressBar progress={70} />
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

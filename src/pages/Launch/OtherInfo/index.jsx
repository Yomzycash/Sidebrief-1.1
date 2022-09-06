import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Page, Inputs } from "../styled";
import { InputFrame, InputContainer, Gap } from "./styles";
import { CheckoutController, CheckoutSection } from "containers";
import { DropDownWithSearch } from "components/input";

const OtherInfo = () => {
	const [expectedNumOfShareHolders, setExpectedNumOfShareHolders] = useState([
		1, 2, 3, 4, 5,
	]);
	const [numOfShareHolders, setNumofShareHolders] = useState();
	const [expectedNumOfDirectors, setExpectedNumOfDirectors] = useState([
		1, 2, 3, 4, 5,
	]);
	const [numOfDirectors, setNumOfDirectors] = useState();
	const [expectedNumOfBeneficiary, setExpectedNumOfBeneficiary] = useState([
		1, 2, 3, 4, 5,
	]);
	const [numOfBeneficiary, setNumOfBeneficiary] = useState();

	const selectNumofShareholders = (data) => {
		setNumofShareHolders(data);
		console.log(data);
	};

	const selectNumofDirectors = (data) => {
		setNumOfDirectors(data);
		console.log(data);
	};

	const selectNumofBeneficiary = (data) => {
		setNumOfBeneficiary(data);
		console.log(data);
	};

	function handleCreate(number, where) {
		switch (where) {
			case "shareholder":
				setNumofShareHolders(number);
				setExpectedNumOfShareHolders((prev) => [...prev, number]);
				break;
			case "director":
				setNumOfDirectors(number);
				setExpectedNumOfDirectors((prev) => [...prev, number]);
				break;
			case "beneficiary":
				setNumOfBeneficiary(number);
				setExpectedNumOfBeneficiary((prev) => [...prev, number]);
				break;
			default:
				break;
		}
	}

	return (
		<>
			<HeaderCheckout />
			<Page>
				<CheckoutSection
					title={"Mandatory Information"}
					subtitle={
						"Please provide Sidebrief with the following information or use sidebrief's contact"
					}
				>
					<InputContainer>
						<InputFrame>
							<DropDownWithSearch
								name={"numOfShareholders"}
								title={"Shareholder’s Information"}
								list={expectedNumOfShareHolders}
								renderer={({ item }) => item}
								selectAction={selectNumofShareholders}
								bottomText={
									"Please provide sidebrief with the number of shareholders available in your company"
								}
								allowCreate={true}
								onCreate={(number) =>
									handleCreate(number, "shareholder")
								}
								value={numOfShareHolders}
								setValue={(value) =>
									setNumofShareHolders(value)
								}
							/>
						</InputFrame>
						<InputFrame>
							<DropDownWithSearch
								name={"numOfDirectors"}
								title={"Director’s Information"}
								list={expectedNumOfDirectors}
								renderer={({ item }) => item}
								selectAction={selectNumofDirectors}
								bottomText={
									"Please provide sidebrief with the number of directors available in your company" // shareholders?
								}
								allowCreate={true}
								onCreate={(number) =>
									handleCreate(number, "director")
								}
								value={numOfDirectors}
								setValue={(value) => setNumOfDirectors(value)}
							/>
						</InputFrame>
					</InputContainer>
				</CheckoutSection>
				<Gap height={40} />
				<CheckoutSection
					title={"Optional Information"}
					subtitle={
						"Please provide Sidebrief with the following information or use sidebrief's contact"
					}
				>
					<Inputs>
						<DropDownWithSearch
							name={"numOfBeneficiary"}
							title={"Beneficiary’s Information"}
							list={expectedNumOfBeneficiary}
							renderer={({ item }) => item}
							selectAction={selectNumofBeneficiary}
							bottomText={
								"Please provide sidebrief with the number of shareholders available in your company"
							}
							allowCreate={true}
							onCreate={(number) =>
								handleCreate(number, "beneficiary")
							}
							value={numOfBeneficiary}
							setValue={(value) => setNumOfBeneficiary(value)}
						/>
					</Inputs>
				</CheckoutSection>
				<CheckoutController
					backText={"Previous"}
					forwardText={"Next"}
				/>
			</Page>
		</>
	);
};

export default OtherInfo;

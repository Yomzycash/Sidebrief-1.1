import React from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import DropDownWithSearch from "components/input/DropDownWithSearch";
import TagInput from "components/input/TagInput";
import { CheckoutController, CheckoutSection } from "containers";
import {
	NigeriaFlag,
	KenyaFlag,
	SouthAfricaFlag,
	MalawiFlag,
	ZimbabweFlag,
} from "asset/flags";
import {
	Body,
	Bottom,
	Container,
	Header,
	InputsWrapper,
	CountryItem,
} from "../styled";

const BusinessInfo = () => {
	const Countries = [
		{ id: 1, text: "Nigeria", img: NigeriaFlag },
		{ id: 2, text: "Kenya", img: KenyaFlag },
		{ id: 3, text: "South Africa", img: SouthAfricaFlag },
		{ id: 4, text: "Malawi", img: MalawiFlag },
		{ id: 5, text: "Zimbabwe", img: ZimbabweFlag },
		{ id: 1, text: "Nigeria", img: NigeriaFlag },
		{ id: 2, text: "Kenya", img: KenyaFlag },
		{ id: 3, text: "South Africa", img: SouthAfricaFlag },
		{ id: 4, text: "Malawi", img: MalawiFlag },
		{ id: 5, text: "Zimbabwe", img: ZimbabweFlag },
		{ id: 1, text: "Nigeria", img: NigeriaFlag },
		{ id: 2, text: "Kenya", img: KenyaFlag },
		{ id: 3, text: "South Africa", img: SouthAfricaFlag },
		{ id: 4, text: "Malawi", img: MalawiFlag },
		{ id: 5, text: "Zimbabwe", img: ZimbabweFlag },
		{ id: 1, text: "Nigeria", img: NigeriaFlag },
		{ id: 2, text: "Kenya", img: KenyaFlag },
		{ id: 3, text: "South Africa", img: SouthAfricaFlag },
		{ id: 4, text: "Malawi", img: MalawiFlag },
		{ id: 5, text: "Zimbabwe", img: ZimbabweFlag },
	];

	const Objectives = [
		{ id: 1, text: "Marketing" },
		{ id: 2, text: "Art and Designs" },
		{ id: 3, text: "Construction" },
		{ id: 4, text: "Information and Technology" },
		{ id: 5, text: "Science and Technology" },
		{ id: 6, text: "Art and Design" },
		{ id: 7, text: "Musical Industry" },
		{ id: 8, text: "Technicial" },
	];

	const handleNext = () => {};

	return (
		<Container>
			<Header>
				<HeaderCheckout />
			</Header>
			<Body>
				<CheckoutSection title="Let's sail you through, take this swift walk with us." />
				<TagInput />
				<InputsWrapper>
					<DropDownWithSearch
						name="country"
						title="Operational Country"
						list={Countries}
						renderer={({ item }) => (
							<CountryItem>
								<img
									src={item.img}
									alt=""
									style={{ width: "20px" }}
								/>
								{item.text}
							</CountryItem>
						)}
						selectAction={(data) => {
							console.log("Hello");
							console.log(data);
						}}
					/>
					<DropDownWithSearch
						name="objective"
						title="Business Objectives"
						list={Objectives}
						renderer={({ item }) => <span>{item.text}</span>}
						selectAction={(data) => {
							console.log("Hello");
							console.log(data);
						}}
					/>
				</InputsWrapper>
			</Body>
			<Bottom>
				<CheckoutController
					backAction={() => console.log("Back button")}
					backText={"Previous"}
					forwardAction={() => console.log("Forward button")}
					forwardText={"Proceed"}
				/>
			</Bottom>
		</Container>
	);
};

export default BusinessInfo;

import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController, CheckoutSection } from "containers";
import { DropDownWithSearch, InputWithLabel } from "components/input";
import { Page, Inputs } from "../styled";
import { Country, State, City } from "country-state-city";

const BusinessAddress = () => {
	const [country, setCountry] = useState({ isoCode: "Nothing" });
	const [state, setState] = useState({ isoCode: "Nothing" });

	const selectCountry = (data) => {
		console.log(data);
		setCountry(data);
	};

	const selectState = (data) => {
		console.log(data);
		setState(data);
	};

	const countries = Country.getAllCountries();
	const states = State.getStatesOfCountry(country.isoCode);
	const cities = City.getCitiesOfState(country.isoCode, state.isoCode);

	return (
		<>
			<HeaderCheckout />
			<Page>
				<CheckoutSection
					title={"Business Address"}
					subtitle={"Please provide the address for this business"}
				>
					<Inputs>
						<DropDownWithSearch
							name={"country"}
							title={"Country"}
							list={countries}
							renderer={({ item }) => <span>{item.name}</span>}
							selectAction={selectCountry}
							filterBy={"name"}
						/>
						<DropDownWithSearch
							name={"state"}
							title={"State"}
							list={states}
							renderer={({ item }) => <span>{item.name}</span>}
							selectAction={selectState}
							filterBy={"name"}
						/>
						<DropDownWithSearch
							name={"city"}
							title={"City"}
							list={cities}
							renderer={({ item }) => <span>{item.name}</span>}
							selectAction={selectState}
							filterBy={"name"}
						/>
						<InputWithLabel
							containerStyle={"checkoutInput"}
							labelStyle={"checkoutInputLabel"}
							placeholder="--"
							label="Number and street"
							type="text"
							name="street"
							register={() => {}}
							// errorMessage={errors.Email?.message}
						/>
						<InputWithLabel
							containerStyle={"checkoutInput"}
							labelStyle={"checkoutInputLabel"}
							placeholder="--"
							label="Zip Code"
							type="text"
							name="zipCode"
							register={() => {}}
							// errorMessage={errors.Email?.message}
						/>
						<InputWithLabel
							containerStyle={"checkoutInput"}
							labelStyle={"checkoutInputLabel"}
							placeholder="example@example.com"
							label="Email Address"
							bottomText="Please provide sidebrief with a functional Email to help us contact you fast"
							type="email"
							name="email"
							register={() => {}}
							// errorMessage={errors.Email?.message}
						/>
					</Inputs>
				</CheckoutSection>
				<CheckoutController
					backText={"Previous"}
					forwardText={"Get started"}
				/>
			</Page>
		</>
	);
};

export default BusinessAddress;

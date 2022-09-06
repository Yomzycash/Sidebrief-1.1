import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController, CheckoutSection } from "containers";
import { DropDownWithSearch } from "components/input";
import { Page, InputWrapper } from "./styles";
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
					<InputWrapper>
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
					</InputWrapper>
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

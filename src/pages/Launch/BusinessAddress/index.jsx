import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController, CheckoutSection } from "containers";
import { DropDownWithSearch, InputWithLabel } from "components/input";
import { Page, Inputs } from "../styled";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setCheckoutProgress } from "redux/Slices";
import { defaultLocation } from "../constants";

const BusinessAddress = () => {
	const [country, setCountry] = useState(defaultLocation);
	const [state, setState] = useState(defaultLocation);
	const [city, setCity] = useState(defaultLocation);

	const selectCountry = (data) => {
		setCountry(data);
		setState(defaultLocation);
		setCity(defaultLocation);
	};

	const selectState = (data) => {
		setState(data);
		setCity(defaultLocation);
	};

	const selectCity = (data) => {
		setCity(data);
	};

	const countries = Country.getAllCountries();
	const states = State.getStatesOfCountry(country.isoCode);
	const cities = City.getCitiesOfState(country.isoCode, state.isoCode);

	const navigate = useNavigate();

	const handleNext = () => {
		navigate("/checkout/form-info");
		store.dispatch(setCheckoutProgress({ total: 10, current: 3 })); // total- total pages and current - current page
	};

	const handlePrev = () => {
		navigate(-1);
		store.dispatch(setCheckoutProgress({ total: 10, current: 2 })); // total- total pages and current - current page
	};

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
							value={country}
						/>
						<DropDownWithSearch
							name={"state"}
							title={"State"}
							list={states}
							renderer={({ item }) => <span>{item.name}</span>}
							selectAction={selectState}
							filterBy={"name"}
							value={state}
						/>
						<DropDownWithSearch
							name={"city"}
							title={"City"}
							list={cities}
							renderer={({ item }) => <span>{item.name}</span>}
							selectAction={selectCity}
							filterBy={"name"}
							value={city}
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
					forwardAction={handleNext}
					backAction={handlePrev}
				/>
			</Page>
		</>
	);
};

export default BusinessAddress;

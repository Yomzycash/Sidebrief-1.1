import { useState, useEffect, useCallback } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Container, Body, Bottom } from "./style";
import { CheckoutController, CheckoutSection } from "containers";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { useGetAllCountriesQuery } from "services/launchService";
import { resources } from "utils/config";

const ManageProduct = () => {
	const [selectedResource, setselectedResource] = useState("");
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("");

	const { data, isLoading } = useGetAllCountriesQuery();

	// Handle supported countries fetch
	const handleCountry = useCallback(
		async (value) => {
			let responseData = data;
			let countries = [];
			responseData?.forEach((data) => {
				countries = [...countries, data?.countryName];
			});
			if (responseData) {
				setCountries([...countries]);
				setSelectedCountry(value);
			}
		},
		[data]
	);

	const selectCountry = (value) => {
		setSelectedCountry(value);
	};

	// Update the supported countries when data changes
	useEffect(() => {
		handleCountry();
	}, [handleCountry]);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleResourceSelect = (valuesSelected) => {
		setselectedResource(valuesSelected);
	};

	return (
		<>
			<Container>
				<HeaderCheckout getStarted noProgress backToDashBoard />

				<Body onSubmit={handleSubmit}>
					<CheckoutSection
						title="Manage your product"
						HeaderParagraph="Make changes to already registered companies"
					/>
					<LaunchPrimaryContainer>
						<LaunchFormContainer>
							<div style={{ maxWidth: "450px" }}>
								<TagInputWithSearch
									label="Operational Country"
									list={countries}
									getValue={selectCountry}
									initialValue={selectedCountry}
									suggestionLoading={isLoading}
								/>
							</div>
							<TagInputWithSearch
								label="Resource"
								list={resources
									.filter(
										(el) =>
											el.country?.toLowerCase() ===
											selectedCountry?.toLowerCase()
									)
									.map((el) => el.resource)
									.sort()}
								getValue={handleResourceSelect}
								initialValue={selectedResource}
								MatchError="Please select resource from the list"
								EmptyError="Please select at least one resources"
							/>
						</LaunchFormContainer>
						<Bottom>
							<CheckoutController
								forwardText={"Submit"}
								forwardSubmit
								hidePrev
							/>
						</Bottom>
					</LaunchPrimaryContainer>
				</Body>
			</Container>
		</>
	);
};

export default ManageProduct;

import { useState, useEffect, useCallback } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Container, Body, Bottom } from "./style";
import { CheckoutController, CheckoutSection } from "containers";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { useGetAllCountriesQuery } from "services/launchService";

const ManageProduct = () => {
	const [selectedResource, setselectedResource] = useState("");
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("");

	const { data, error, isLoading, isSuccess } = useGetAllCountriesQuery();

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
		console.log(selectedResource, selectedCountry);
	};

	const resources = ["red", "orange", "green"];

	const handleResourceSelect = (valuesSelected) => {
		setselectedResource(valuesSelected);
	};

	return (
		<>
			<Container>
				<HeaderCheckout getStarted />

				<Body onSubmit={handleSubmit}>
					<CheckoutSection
						title="Manage your product"
						HeaderParagraph="Make changes to already registered companies"
					/>
					<LaunchPrimaryContainer>
						<LaunchFormContainer>
							<TagInputWithSearch
								label="Resource"
								list={resources.sort()}
								getValue={handleResourceSelect}
								initialValue={selectedResource}
								MatchError="Please select resource from the list"
								EmptyError="Please select at least one objective"
							/>
							<div style={{ maxWidth: "450px" }}>
								<TagInputWithSearch
									label="Operational Country"
									list={countries}
									getValue={selectCountry}
									initialValue={selectedCountry}
									suggestionLoading={isLoading}
								/>
							</div>
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

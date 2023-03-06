import { useState, useEffect, useCallback } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import {
	Container,
	Body,
	Bottom,
	InfoContainer,
	Bullet,
	Content,
	InfoFrame,
	InfoFrameHead,
	BigContent,
} from "./style";
import { CheckoutController, CheckoutSection } from "containers";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { useGetAllCountriesQuery } from "services/launchService";
import { useNavigate } from "react-router-dom";
import { resources } from "utils/config";
import { ReactComponent as Mark } from "asset/svg/mark.svg";
import { FiClock } from "react-icons/fi";
import { FaMoneyCheckAlt } from "react-icons/fa";

const ManageProduct = () => {
	const [selectedResource, setselectedResource] = useState("");
	const [countries, setCountries] = useState([]);

	const [selectedCountry, setSelectedCountry] = useState("");

	const { data, isLoading } = useGetAllCountriesQuery();
	const navigate = useNavigate();

	const handleNext = async () => {
		// store.dispatch();
		navigate("/launch/entity");
	};

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
						title="Manage your business"
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
						<InfoContainer>
							<InfoFrame space>
								<InfoFrameHead>Requirements</InfoFrameHead>
								<Bullet>
									<Mark />
									<Content>Passport</Content>
								</Bullet>
								<Bullet>
									<Mark />
									<Content>Proof of address</Content>
								</Bullet>
							</InfoFrame>
							<InfoFrame>
								<InfoFrameHead>Timeline</InfoFrameHead>
								<Bullet>
									<FiClock />
									<BigContent>20-30 days</BigContent>
								</Bullet>
							</InfoFrame>
							<InfoFrame>
								<InfoFrameHead>Pricing</InfoFrameHead>
								<Bullet>
									<FaMoneyCheckAlt />
									<BigContent>N22,000</BigContent>
								</Bullet>
							</InfoFrame>
						</InfoContainer>
						<Bottom>
							<CheckoutController
								forwardText={"Next"}
								forwardSubmit
								hidePrev
								forwardAction={handleNext}
							/>
						</Bottom>
					</LaunchPrimaryContainer>
				</Body>
			</Container>
		</>
	);
};

export default ManageProduct;

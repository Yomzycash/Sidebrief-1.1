import React, { useEffect, useState } from "react";
import { CheckoutController, CheckoutSection } from "containers";
import {
	Body,
	Bottom,
	Container,
	Header,
	EntityCardsWrapper,
	Loading,
} from "../styled";
import { EntityCard } from "components/cards";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { useNavigate } from "react-router-dom";
import {
	setCheckoutProgress,
	setGeneratedLaunchCode,
	setSelectedEntity,
	setLaunchResponse,
} from "redux/Slices";
import { store } from "redux/Store";
import { useSelector } from "react-redux";
import {
	useAddBusinessNamesMutation,
	useAddBusinessObjectivesMutation,
	useGetAllEntitiesQuery,
	useGetStartedMutation,
	useUpdateBusinessNamesMutation,
	useUpdateBusinessObjectivesMutation,
	useUpdateLaunchMutation,
} from "services/launchService";
import { Puff } from "react-loading-icons";
import toast from "react-hot-toast";
import { Dialog, DialogContent } from "@mui/material";

const EntitySelect = () => {
	const navigate = useNavigate();
	const [entities, setEntities] = useState([]);

	// Get necessary information from store
	// const countryISO = useSelector((store) => store.LaunchReducer.countryISO);
	// const selectCountry = useSelector(
	//   (store) => store.LaunchReducer.selectedCountry
	// );

	const LaunchInfo = useSelector((store) => store.LaunchReducer);
	const {
		selectedObjectives,
		generatedLaunchCode,
		businessNames,
		countryISO,
		selectedCountry,
		launchResponse,
	} = LaunchInfo;

	const countryISOView = launchResponse.registrationCountry;
	const launchCodeView = launchResponse.launchCode;
	const registrationTypeView = launchResponse.registrationType;

	const { data, error, isLoading, isSuccess } = useGetAllEntitiesQuery(
		countryISO ? countryISO : countryISOView
	);

	const [getStarted, launchState] = useGetStartedMutation();
	const [updateLaunch, launchUpdateState] = useUpdateLaunchMutation();
	const [addBusinessNames] = useAddBusinessNamesMutation();
	const [updateBusinessNames] = useUpdateBusinessNamesMutation();
	const [addBusinessObjectives] = useAddBusinessObjectivesMutation();
	const [updateBusinessObjectives] = useUpdateBusinessObjectivesMutation();

	// Set to state all entities of the specified country
	useEffect(() => {
		setEntities(data);
		if (error?.status === "FETCH_ERROR") {
			toast.error("Please check your internet connection");
		}
	}, [data]);

	// This fires off when the next button is clicked
	const handleNext = async (selectedItem) => {
		store.dispatch(setSelectedEntity(selectedItem));

		// To be sent to the backend to create a launch
		const requiredLaunchData = {
			registrationCountry: selectedItem.entityCountry,
			registrationType: selectedItem.entityCode,
		};

		// To be sent to the backend to update a launch
		const requiredLaunchUpdateData = {
			launchCode: generatedLaunchCode,
			registrationCountry: selectedItem.entityCountry,
			registrationType: selectedItem.entityCode,
		};

		let launchResponse = generatedLaunchCode
			? await updateLaunch(requiredLaunchUpdateData)
			: await getStarted(requiredLaunchData);

		if (generatedLaunchCode) {
			store.dispatch(setLaunchResponse(launchResponse.data[0]));
			localStorage.setItem(
				"launchInfo",
				JSON.stringify(launchResponse.data[0])
			);
		} else {
			store.dispatch(setLaunchResponse(launchResponse.data));
			localStorage.setItem(
				"launchInfo",
				JSON.stringify(launchResponse.data)
			);
		}

		if (launchResponse.data) {
			const launchCode = generatedLaunchCode
				? await launchResponse.data[0].launchCode
				: await launchResponse.data.launchCode;

			if (!generatedLaunchCode) {
				store.dispatch(setGeneratedLaunchCode(launchCode));
			}
			navigate("/launch/payment");

			handleBusinessInfo(launchCode);

			console.log(launchCode);
		} else {
			if (launchResponse?.error?.status === "FETCH_ERROR") {
				toast.error("Please check your internet connection");
			} else {
				toast.error(launchResponse?.error?.error);
			}
		}
	};

	// Send business information to the backend
	const handleBusinessInfo = (launchCode) => {
		const requiredBusinessNamesData = {
			launchCode: launchCode,
			businessNames: {
				businessName1: businessNames[0],
				businessName2: businessNames[1],
				businessName3: businessNames[2],
				businessName4: businessNames[3],
			},
		};

		const requiredBusinessObjectives = {
			launchCode: launchCode,
			businessObjects: {
				businessObject1: selectedObjectives[0],
				businessObject2: selectedObjectives[1] || "null",
				businessObject3: selectedObjectives[2] || "null",
				businessObject4: selectedObjectives[3] || "null",
			},
		};
		const businessNamesResponse = launchCode
			? updateBusinessNames(requiredBusinessNamesData)
			: addBusinessNames(requiredBusinessNamesData);

		const businessObjectivesResponse = launchCode
			? updateBusinessObjectives(requiredBusinessObjectives)
			: addBusinessObjectives(requiredBusinessObjectives);

		console.log(businessNamesResponse);

		let error = businessNamesResponse?.error;
		if (error) {
			toast.error(error.data.message);
		}
		console.log(businessObjectivesResponse);
	};

	// Navigate to the previous page
	const handlePrev = () => {
		navigate(-1);
	};

	// Launch loading state
	let loading = launchState.isLoading || launchUpdateState.isLoading;

	// Set the progress of the application
	useEffect(() => {
		store.dispatch(setCheckoutProgress({ total: 13, current: 1 })); // total- total pages and current - current page
	}, []);

	return (
		<Container>
			<Header>
				<HeaderCheckout />
			</Header>
			<Body style={{ maxWidth: "100%" }}>
				<CheckoutSection
					title={"Operational Country: " + selectedCountry}
				>
					{isLoading && (
						<Loading>
							<Puff stroke="#00A2D4" fill="white" width={60} />
						</Loading>
					)}
					<EntityCardsWrapper>
						{entities?.map((item, index) => (
							<EntityCard
								key={index}
								name={item?.entityName}
								shares={item?.entityShares}
								type={item?.entityType}
								timeline={item?.entityTimeline}
								requirement={item?.entityRequirements}
								price={item?.entityFee}
								currency={item?.entityCurrency}
								action={() => handleNext(item)}
							/>
						))}
					</EntityCardsWrapper>
				</CheckoutSection>

				<Bottom>
					<CheckoutController
						backText={"Previous"}
						backAction={handlePrev}
						forwardSubmit={true}
						entity
					/>
				</Bottom>
			</Body>
			{loading && (
				<Dialog open={true}>
					<DialogContent>
						<Puff stroke="#ffffff" fill="#ffffff" width={60} />
					</DialogContent>
				</Dialog>
			)}
		</Container>
	);
};

export default EntitySelect;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJpZCI6IjYzMjM5MjlhNDdkZjU3MjdlNWQzZTg4ZSIsImlhdCI6MTY2MzI3NTY3NCwiZXhwIjoyNTI3Mjc1Njc0fQ
//   .Ny2kvYtiUImSx6jmVHIhYp3MWWhlB9h2KrcZ1Sj10JI;

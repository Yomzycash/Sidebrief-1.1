import React, { useEffect, useState, useCallback } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController, CheckoutSection } from "containers";
import { DropDownWithSearch, InputWithLabel } from "components/input";
import { Page, Inputs, Bottom, Body, Container } from "../styled";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setBusinessAddress, setCheckoutProgress } from "redux/Slices";
import { defaultLocation, addressSchema } from "../constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddBusinessAddressMutation,
  useUpdateBusinessAddressMutation,
  useViewBusinessAddressQuery,
  useViewPayLaunchMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { Loading } from "notiflix";
import { useRef } from "react";

const BusinessAddress = () => {
  const [country, setCountry] = useState(defaultLocation);
  const [state, setState] = useState(defaultLocation);
  const [city, setCity] = useState(defaultLocation);
  // const [paid, setPaid] = useState(false);

  const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
  let paidStatus =
    paymentDetails?.paymentStatus === "successful" ? true : false;

  const [addBusinessAddress, addAddressState] = useAddBusinessAddressMutation();
  const [updateBusinessAddress, updateAddressState] =
    useUpdateBusinessAddressMutation();
  const [viewPayLaunch] = useViewPayLaunchMutation();

  const launchResponse = useSelector(
    (state) => state.LaunchReducer.launchResponse
  );

  const address = useViewBusinessAddressQuery(launchResponse, {
    refetchOnMountOrArgChange: true,
  });

  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.launchResponse.launchCode
  );

  // const loading = addAddressState.isLoading || updateAddressState.isLoading;

  // useEffect(() => {
  // 	loading
  // 		? Loading.pulse({
  // 				svgColor: "#fff",
  // 		  })
  // 		: Loading.remove();
  // }, [loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const selectCountry = useCallback(
    (data) => {
      setCountry(data);
      setValue("country", data.name, { shouldValidate: true });
      setState(defaultLocation);
      setCity(defaultLocation);
    },
    [setValue]
  );

  const selectState = useCallback(
    (data) => {
      setState(data);
      setValue("state", data.name, { shouldValidate: true });
      setCity(defaultLocation);
    },
    [setValue]
  );

  const selectCity = useCallback(
    (data) => {
      setCity(data);
      setValue("city", data.name, { shouldValidate: true });
    },
    [setValue]
  );

  const SubmitForm = async (data) => {
    const requiredAddressData = {
      launchCode: generatedLaunchCode,

      businessAddress: {
        addressCountry: data.country,
        addressState: data.state,
        addressCity: data.city,
        addressStreet: data.street,
        addressZipCode: data.zipcode,
        addressNumber: data.number,
        addressEmail: data.email,
      },
    };

    const response = (await address.currentData.businessAddress)
      ? await updateBusinessAddress(requiredAddressData)
      : await addBusinessAddress(requiredAddressData);
    // console.log(address.currentData.businessAddress ? 'true' : 'false')

    if (response.data) {
      store.dispatch(setBusinessAddress(requiredAddressData));
      handleNext();
    } else if (response.error) {
      // console.log(response.error?.data.message);
      toast.error(response.error?.data.message);
    }
  };
  let countries = useRef([defaultLocation]);

  useEffect(() => {
    countries.current = Country.getAllCountries();
  }, []);

  const states = State.getStatesOfCountry(country.isoCode);
  const cities = City.getCitiesOfState(country.isoCode, state.isoCode);

  const navigate = useNavigate();

  const handleNext = () => {
    let navigatedFrom = localStorage.getItem("navigatedFrom");

    if (navigatedFrom) {
      navigate(navigatedFrom);
      localStorage.removeItem("navigatedFrom");
    } else {
      navigate("/launch/shareholders-info");
    }
  };

  const handlePrev = () => {
    if (paidStatus) navigate("/launch");
    else navigate(-1);
  };

  if (address.isLoading) {
    Loading.pulse({
      svgColor: "#fff",
    });
  }

  // // Check the payment status of the launch
  // const handlePaymentStatus = async () => {
  //   let actionInfo = {
  //     ...launchResponse,
  //     viewPayLaunch: viewPayLaunch,
  //   };
  //   setPaid(await checkPaymentStatus(actionInfo));
  // };

  useEffect(() => {
    if (address.isSuccess) {
      Loading.remove();
      const addressData = address.currentData.businessAddress;
      // console.log(addressData);
      const theCountry = addressData
        ? countries.current.find(
            (country) => country.name === addressData.addressCountry
          )
        : defaultLocation;
      const theState = addressData
        ? State.getStatesOfCountry(theCountry.isoCode).find(
            (state) => state.name === addressData.addressState
          )
        : defaultLocation;
      const theCity = addressData
        ? City.getCitiesOfState(theCountry.isoCode, theState.isoCode).find(
            (city) => city.name === addressData.addressCity
          )
        : defaultLocation;

      if (addressData) {
        selectCountry(theCountry);
        selectState(theState);
        selectCity(theCity);
        setValue("street", addressData?.addressStreet, {
          shouldValidate: true,
        });
        setValue("number", addressData?.addressNumber, {
          shouldValidate: true,
        });
        setValue("zipcode", addressData?.addressZipCode, {
          shouldValidate: true,
        });
        setValue("email", addressData?.addressEmail, {
          shouldValidate: true,
        });
      }
    }
  }, [address, setValue, countries, selectCountry, selectCity, selectState]);

  // Set the progress of the application
  useEffect(() => {
    let review = localStorage.getItem("navigatedFrom");

    store.dispatch(
      setCheckoutProgress({ total: 13, current: review ? 13 : 5.5 })
    ); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body onSubmit={handleSubmit(SubmitForm)}>
        <CheckoutSection
          title={"Business Address"}
          subtitle={"Please provide the address for this business"}
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            <Inputs>
              <DropDownWithSearch
                name={"country"}
                title={"Country"}
                list={countries.current}
                renderer={({ item }) => <span>{item.name}</span>}
                selectAction={selectCountry}
                filterBy={"name"}
                value={country}
                errorMessage={errors.country?.message}
              />
              <DropDownWithSearch
                name={"state"}
                title={"State"}
                list={states}
                renderer={({ item }) => <span>{item.name}</span>}
                selectAction={selectState}
                filterBy={"name"}
                value={state}
                errorMessage={errors.state?.message}
              />
              <DropDownWithSearch
                name={"city"}
                title={"City"}
                list={cities}
                renderer={({ item }) => <span>{item.name}</span>}
                selectAction={selectCity}
                filterBy={"name"}
                value={city}
                errorMessage={errors.city?.message}
              />
              <InputWithLabel
                containerStyle={"checkoutInput"}
                labelStyle={"checkoutInputLabel"}
                placeholder="--"
                label="Street"
                type="text"
                name="street"
                register={register}
                errorMessage={errors.street?.message}
              />
              <InputWithLabel
                containerStyle={"checkoutInput"}
                labelStyle={"checkoutInputLabel"}
                placeholder="--"
                label="House Number"
                type="number"
                name="number"
                register={register}
                errorMessage={errors.number?.message}
              />
              <InputWithLabel
                containerStyle={"checkoutInput"}
                labelStyle={"checkoutInputLabel"}
                placeholder="--"
                label="Postal/Zip Code (Optional)"
                type="text"
                name="zipcode"
                register={register}
                errorMessage={errors.zipcode?.message}
              />
              <InputWithLabel
                containerStyle={"checkoutInput"}
                labelStyle={"checkoutInputLabel"}
                placeholder="example@example.com"
                label="Email Address"
                bottomText="Please provide sidebrief with a functional Email to help us contact you fast"
                type="email"
                name="email"
                register={register}
                errorMessage={errors.email?.message}
              />
            </Inputs>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backText={"Previous"}
              forwardText={"Next"}
              backAction={handlePrev}
              forwardSubmit={true}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
      {/* <AppFeedback subProject="Business Address" /> */}
    </Container>
  );
};

export default BusinessAddress;

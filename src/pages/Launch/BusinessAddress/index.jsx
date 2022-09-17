import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController, CheckoutSection } from "containers";
import { DropDownWithSearch, InputWithLabel } from "components/input";
import { Page, Inputs } from "../styled";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setCheckoutProgress } from "redux/Slices";
import { defaultLocation, addressSchema } from "../constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const BusinessAddress = () => {
  const [country, setCountry] = useState(defaultLocation);
  const [state, setState] = useState(defaultLocation);
  const [city, setCity] = useState(defaultLocation);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const selectCountry = (data) => {
    setCountry(data);
    setValue("country", data.name, { shouldValidate: true });
    setState(defaultLocation);
    setCity(defaultLocation);
  };

  const selectState = (data) => {
    setState(data);
    setValue("state", data.name, { shouldValidate: true });
    setCity(defaultLocation);
  };

  const selectCity = (data) => {
    setCity(data);
    setValue("city", data.name, { shouldValidate: true });
  };

  const SubmitForm = async (data) => {
    console.log(data);
    // changed function to async
    // api calls can be done here

    // redirect to the next page
    handleNext();
  };

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country.isoCode);
  const cities = City.getCitiesOfState(country.isoCode, state.isoCode);

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/launch/form-info");
    store.dispatch(setCheckoutProgress({ total: 10, current: 3 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 10, current: 2 })); // total- total pages and current - current page
  };

  return (
    <>
      <HeaderCheckout />
      <form onSubmit={handleSubmit(SubmitForm)}>
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
                label="Number and street"
                type="text"
                name="street"
                register={register}
                errorMessage={errors.street?.message}
              />
              <InputWithLabel
                containerStyle={"checkoutInput"}
                labelStyle={"checkoutInputLabel"}
                placeholder="--"
                label="Zip Code"
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
          </CheckoutSection>
          <CheckoutController
            backText={"Previous"}
            forwardText={"Next"}
            forwardAction={handleNext}
            backAction={handlePrev}
            forwardSubmit={true}
          />
        </Page>
      </form>
    </>
  );
};

export default BusinessAddress;

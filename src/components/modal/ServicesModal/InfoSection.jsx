import React, { useEffect, useState } from "react";
import { DropDown, InputWithLabel } from "components/input";
import { DetailedSection, Form } from "containers/Checkout/InfoSection/style";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ServicesSchema } from "utils/config";
import {
  useAddServiceMutation,
  useGetAllCountriesQuery,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "services/staffService";
import { CheckoutController } from "containers";
import { buttonContainerStyles, buttonStyles, InputsWrapper } from "./styled";
import { useSearchParams } from "react-router-dom";
import { useActions } from "./actions";

const InfoSection = ({ clickedService, disableAll, refetch, setOpen, dialogRef }) => {
  const [servicesCountries, setServicesCountries] = useState([{ value: "", label: "" }]);
  const [servicesCategories, setServicesCategories] = useState([{ value: "", label: "" }]);
  const [serviceCurrencies, setServiceCurrencies] = useState([{ value: "", label: "" }]);
  const [disable, setDisable] = useState(disableAll);

  const [addService, addState] = useAddServiceMutation();
  const [updateService, updateState] = useUpdateServiceMutation();

  const { handleServiceAdd, handleServiceUpdate } = useActions(
    addService,
    updateService,
    clickedService,
    refetch,
    setOpen
  );

  const countries = useGetAllCountriesQuery();
  const { data } = useGetAllServicesQuery();

  const [searchParams, setSearchParams] = useSearchParams();

  let mode = searchParams.get("mode");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ServicesSchema),
  });

  // This is attached to category dropdown onChange
  const handleCategoryChange = (value) => {
    var string = Object.values(value)[0];
    setValue("category", string, { shouldValidate: true });
  };

  // This is attached to country dropdown onChange
  const handleCountryChange = (value) => {
    let selectedCountry = Object.values(value)[0];
    setValue("country", selectedCountry, { shouldValidate: true });
  };

  // This is attached to currency dropdown onChange
  const handleCurrencyChange = (value) => {
    var string = Object.values(value)[0];
    setValue("currency", string, { shouldValidate: true });
  };

  // Update entity countries and currencies
  useEffect(() => {
    let allCountries = countries.data;

    setServicesCountries(
      allCountries &&
        allCountries.map((country) => ({
          value: country.countryISO,
          label: country.countryISO,
        }))
    );
    setServiceCurrencies(
      allCountries &&
        allCountries.map((currency) => ({
          value: currency.countryCurrency,
          label: currency.countryCurrency,
        }))
    );
  }, [countries.data]);

  //
  useEffect(() => {
    const categoryResponse = data?.map((serviceCats) => serviceCats.serviceCategory);
    // Filter out duplicate entries
    const eachResponse = categoryResponse?.filter((option, index, self) => {
      return index === self.indexOf(option);
    });
    let newCategory = eachResponse?.map((servicesCategory) => ({
      value: servicesCategory,
      label: servicesCategory,
    }));
    setServicesCategories(newCategory);
  }, [data]);

  //
  useEffect(() => {
    if (clickedService && mode === "edit") {
      setValue("name", clickedService.serviceName, { shouldValidate: true });
      setValue("description", clickedService.serviceDescription, { shouldValidate: true });
      setValue("category", clickedService.serviceCategory, { shouldValidate: true });
      setValue("country", clickedService.serviceCountry, { shouldValidate: true });
      setValue("currency", clickedService.serviceCurrency, { shouldValidate: true });
      setValue("price", clickedService.servicePrice, { shouldValidate: true });
      setValue("timeline", clickedService.serviceTimeline, { shouldValidate: true });
    } else {
      setValue("name", "");
      setValue("description", "");
      setValue("category", "");
      setValue("country", "");
      setValue("currency", "");
      setValue("price", "");
      setValue("timeline", "");
    }
    setDisable(disableAll);
  }, [clickedService, mode]);

  const submitForm = (formData) => {
    dialogRef.current.scrollLeft += 60;
    console.log(formData);
  };

  const handleClose = () => {};

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <InputsWrapper>
        <InputWithLabel
          label="Service Name"
          labelStyle="input-label"
          placeholder="Enter Service Name"
          type="text"
          name="name"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.name?.message}
          disable={disable}
        />
        <InputWithLabel
          label="Service Description"
          labelStyle="input-label"
          placeholder="Enter Service Description"
          type="text"
          name="description"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.description?.message}
          disable={disable}
        />
        <DetailedSection>
          <DropDown
            containerStyle={{ margin: 0, marginBottom: "24px" }}
            label="Category"
            labelStyle="input-label"
            options={servicesCategories}
            onChange={handleCategoryChange}
            errorMessage={errors.category?.message}
            placeholder="Select Service Category"
            defaultValue={clickedService ? clickedService?.serviceCategory : ""}
            fontSize="clamp(12px, 1.2vw, 14px)"
            height="40px"
            disable={disable}
          />
        </DetailedSection>
        <DetailedSection>
          <DropDown
            containerStyle={{ margin: 0, marginBottom: "24px" }}
            label="Operational Country"
            labelStyle="input-label"
            options={servicesCountries}
            onChange={handleCountryChange}
            placeholder="Select Service Country"
            errorMessage={errors.country?.message}
            defaultValue={clickedService ? clickedService?.serviceCountry : ""}
            fontSize="clamp(12px, 1.2vw, 14px)"
            height="40px"
            disable={disable}
          />
          <DropDown
            containerStyle={{ margin: 0, marginBottom: "24px" }}
            label="Currency"
            labelStyle="input-label"
            options={serviceCurrencies}
            onChange={handleCurrencyChange}
            errorMessage={errors.currency?.message}
            defaultValue={mode === "edit" && clickedService?.serviceCurrency}
            fontSize="clamp(12px, 1.2vw, 14px)"
            height="40px"
            disable={disable}
            // disable={disable || countryInfo?.countryCurrency}
          />
        </DetailedSection>
        <DetailedSection>
          <InputWithLabel
            label="Service Price"
            labelStyle="input-label"
            placeholder="Enter Service Price"
            type="number"
            name="price"
            inputClass="input-class"
            containerStyle="input-container-class"
            register={register}
            errorMessage={errors.price?.message}
            disable={disable}
          />
          <InputWithLabel
            label="Service Timeline"
            labelStyle="input-label"
            placeholder="Enter Service Timeline"
            type="text"
            name="timeline"
            inputClass="input-class"
            containerStyle="input-container-class"
            register={register}
            errorMessage={errors.timeline?.message}
            disable={disable}
          />
        </DetailedSection>
      </InputsWrapper>
      <CheckoutController
        backAction={handleClose}
        forwardAction={() => {}}
        backText={"Cancel"}
        containerStyle={buttonContainerStyles}
        backBottonStyle={buttonStyles}
        forwardButtonStyle={buttonStyles}
        forwardSubmit
        forwardLoading={addState.isLoading || updateState.isLoading}
        // forwardText={mode === "edit" ? "Update" : "Save"}
        forwardText={mode === "edit" ? "Update" : "Save"}
        forwardDisable={disable}
        $modal
      />
    </Form>
  );
};

export default InfoSection;

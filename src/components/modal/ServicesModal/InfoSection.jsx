import React, { useEffect, useState } from "react";
import { DropDown, InputWithLabel } from "components/input";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
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
import { buttonContainerStyles, buttonStyles, InputsWrapper, Form } from "./styled";
import { useActions } from "./actions";

const InfoSection = ({ clickedService, dialogRef, parentRef, disable, refetch, setOpen, mode }) => {
  const [servicesCountries, setServicesCountries] = useState([{ value: "", label: "" }]);
  const [servicesCategories, setServicesCategories] = useState([{ value: "", label: "" }]);
  const [serviceCurrencies, setServiceCurrencies] = useState([{ value: "", label: "" }]);

  const [addService, addState] = useAddServiceMutation();
  const [updateService, updateState] = useUpdateServiceMutation();

  const countries = useGetAllCountriesQuery();
  const { data } = useGetAllServicesQuery();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ServicesSchema),
  });

  const {
    handleServiceAdd,
    handleServiceUpdate,
    handleCategoryChange,
    handleCountryChange,
    handleCurrencyChange,
    scrollToNext,
  } = useActions({
    addService,
    updateService,
    clickedService,
    refetch,
    setOpen,
    setValue,
    dialogRef,
    parentRef,
  });

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
    const categoryResponse = data?.map((service) => service.serviceCategory);
    const categories = [...new Set(categoryResponse)];

    setServicesCategories(
      categories &&
        categories?.map((category) => ({
          value: category,
          label: category,
        }))
    );
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
  }, [clickedService, mode]);

  const submitForm = (formData) => {
    scrollToNext();
    if (mode === "add") handleServiceAdd(formData);
    else if (mode === "edit") handleServiceUpdate(formData);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        backText="Cancel"
        containerStyle={buttonContainerStyles}
        backBottonStyle={buttonStyles}
        forwardButtonStyle={buttonStyles}
        forwardSubmit
        forwardLoading={addState.isLoading || updateState.isLoading}
        // forwardText={mode === "edit" ? "Update" : "Save"}
        forwardText="Next"
        forwardDisable={disable}
        $modal
      />
    </Form>
  );
};

export default InfoSection;

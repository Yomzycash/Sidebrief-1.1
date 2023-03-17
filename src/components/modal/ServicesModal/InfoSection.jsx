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
import { useGetSingleServiceQuery } from "services/staffService";

const InfoSection = ({ disable, refetch, setOpen, mode, service }) => {
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
  } = useActions({
    addService,
    updateService,
    service,
    refetch,
    setOpen,
    setValue,
    mode,
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
    if (service.data) {
      setValue("name", service.data.serviceName, { shouldValidate: true });
      setValue("description", service.data.serviceDescription, { shouldValidate: true });
      setValue("category", service.data.serviceCategory, { shouldValidate: true });
      setValue("country", service.data.serviceCountry, { shouldValidate: true });
      setValue("currency", service.data.serviceCurrency, { shouldValidate: true });
      setValue("price", service.data.servicePrice, { shouldValidate: true });
      setValue("timeline", service.data.serviceTimeline, { shouldValidate: true });
    } else {
      setValue("name", "");
      setValue("description", "");
      setValue("category", "");
      setValue("country", "");
      setValue("currency", "");
      setValue("price", "");
      setValue("timeline", "");
    }
  }, [service.data, mode]);

  const submitForm = (formData) => {
    if (service.data?.serviceId) handleServiceUpdate(formData);
    else handleServiceAdd(formData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)} id="staff-service-info">
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
            defaultValue={service.data ? service.data?.serviceCategory : "--"}
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
            defaultValue={service.data ? service.data?.serviceCountry : "--"}
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
            defaultValue={service.data ? service.data?.serviceCurrency : "--"}
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
            label="Service Timeline (days)"
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

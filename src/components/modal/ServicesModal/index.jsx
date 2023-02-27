import { yupResolver } from "@hookform/resolvers/yup";
import { DropDown, InputWithLabel } from "components/input";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import Modal1 from "layout/modal1";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetAllCountriesQuery,
  useGetAllServicesQuery,
} from "services/staffService";
import { ServicesSchema } from "utils/config";

const ServicesModal = ({
  cardAction,
  setCardAction,
  open,
  setOpen,
  disableAll,
  title,
  serviceInfo,
  countryInfo,
  submitAction,
  loading,
  handleServiceDelete,
  deleteState,
}) => {
  const [disable, setDisable] = useState(disableAll);
  const [servicesCountries, setServicesCountries] = useState([
    { value: "", label: "" },
  ]);

  const [servicesCategories, setServicesCategories] = useState([
    { value: "", label: "" },
  ]);
  const [serviceCurrencies, setServiceCurrencies] = useState([
    { value: "", label: "" },
  ]);

  const countries = useGetAllCountriesQuery();
  const { data } = useGetAllServicesQuery();
  const categories = useGetAllServicesQuery();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ServicesSchema),
  });

  // Update entity countries
  useEffect(() => {
    let allCountries = countries.data;

    setServicesCountries(
      allCountries &&
        allCountries.map((country) => ({
          value: country.countryISO,
          label: country.countryISO,
        }))
    );
  }, [countries.data]);

  // This is attached to category dropdown onChange
  const handleCategoryChange = (value) => {
    var string = Object.values(value)[0];
    console.log("category", string)
    setValue("category", string, { shouldValidate: true });
  };

  // This is attached to country dropdown onChange
  const handleCountryChange = (value) => {
    let selectedCountry = Object.values(value)[0];
    let currency = countries?.data?.filter(
      (country) => country.countryISO === selectedCountry
    )[0]?.countryCurrency;
    setServiceCurrencies([{ value: currency, label: currency }]);
    setValue("country", selectedCountry, { shouldValidate: true });
    setValue("currency", "", { shouldValidate: true });
  };

  // This is attached to currency dropdown onChange
  const handleCurrencyChange = (value) => {
    var string = Object.values(value)[0];
    setValue("currency", string, { shouldValidate: true });
  };

  useEffect(() => {
    const categoryResponse = data?.map((serviceCats) => serviceCats.serviceCategory);
    // Filter out duplicate entries
    console.log("response", categoryResponse)
    const eachResponse = categoryResponse?.filter((option, index, self) => {
      return index === self.indexOf(option);
    });
    console.log("each", eachResponse)
    let newCategory = eachResponse?.map((servicesCategory) => ({
      value: servicesCategory,
      label:servicesCategory
    }))
    setServicesCategories(newCategory)
  }, [data])

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={submitAction}
      cardAction={cardAction}
      setCardAction={setCardAction}
      title={title || "Add New Service"}
      open={open}
      setOpen={setOpen}
      disable={disable}
      setDisable={setDisable}
      loading={loading}
      handleDelete={() => handleServiceDelete(serviceInfo)}
      deleteState={deleteState}
    >
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
        <InputWithLabel
          label="Service ID"
          labelStyle="input-label"
          placeholder="Enter Service ID"
          type="text"
          name="id"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.id?.message}
          disable={disable}
        />
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Category"
          labelStyle="input-label"
          options={servicesCategories}
          onChange={handleCategoryChange}
          errorMessage={errors.category?.message}
          // defaultValue={entityInfo?.entityType}
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
          errorMessage={errors.country?.message}
          // defaultValue={entityInfo?.entityType}
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
          // defaultValue={
          //   entityInfo?.entityCurrency || countryInfo?.countryCurrency
          // }
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disable || countryInfo?.countryCurrency}
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
    </Modal1>
  );
};

export default ServicesModal;

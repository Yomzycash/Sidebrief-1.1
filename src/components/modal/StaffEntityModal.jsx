import { yupResolver } from "@hookform/resolvers/yup";
import { DropDown, InputWithLabel, TextAreaWithLabel } from "components/input";
import TagInput from "components/input/TagInput";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import Modal1 from "layout/modal1";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetAllCountriesQuery } from "services/launchService";
import styled from "styled-components";
import { StaffEntitySchema } from "utils/config";

const StaffEntityModal = ({
  cardAction,
  setCardAction,
  open,
  setOpen,
  disableAll,
  title,
  entityInfo,
  countryInfo,
  submitAction,
  loading,
  handleEntityDelete,
  deleteState,
  features,
  setFeatures,
  documents,
  setDocuments,
}) => {
  const [disable, setDisable] = useState(disableAll);
  const [entityCountries, setEntityCountries] = useState([
    { value: "", label: "" },
  ]);

  const [entityCurrencies, setEntityCurrencies] = useState([
    { value: "", label: "" },
  ]);

  const countries = useGetAllCountriesQuery();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StaffEntitySchema),
  });

  // This is attached to country dropdown onChange
  const handleCountryChange = (value) => {
    let selectedCountry = Object.values(value)[0];
    setValue("country", selectedCountry, { shouldValidate: true });
  };

  // This is attached to country dropdown onChange
  const handleCurrencyChange = (value) => {
    let selectedCurrency = Object.values(value)[0];
    setValue("currency", selectedCurrency, { shouldValidate: true });
  };

  // Update entity countries
  useEffect(() => {
    let allCountries = countries.data;
    setEntityCountries(
      allCountries &&
        allCountries.map((country) => ({
          value: country.countryISO,
          label: country.countryISO,
        }))
    );
    setEntityCurrencies(
      allCountries &&
        allCountries.map((currency) => ({
          value: currency.countryCurrency,
          label: currency.countryCurrency,
        }))
    );
  }, [countries.data]);

  // This populates the entity fields when an entity is clicked
  useEffect(() => {
    if (entityInfo && cardAction === "edit") {
      setValue("entityName", entityInfo.entityName, { shouldValidate: true });
      setValue("description", entityInfo.entityDescription, {
        shouldValidate: true,
      });
      setValue("shortName", entityInfo.entityShortName, {
        shouldValidate: true,
      });
      setValue("code", entityInfo.entityCode, { shouldValidate: true });
      setValue("shares", entityInfo.entityShares, { shouldValidate: true });
      setValue("timeline", entityInfo.entityTimeline, { shouldValidate: true });
      setValue("country", entityInfo.entityCountry, { shouldValidate: true });
      setValue("currency", entityInfo.entityCurrency, { shouldValidate: true });
      setValue("fee", entityInfo.entityFee, { shouldValidate: true });
      setValue("requirements", entityInfo.entityRequirements, {
        shouldValidate: true,
      });
      setValue("type", entityInfo.entityType, { shouldValidate: true });
    } else {
      setValue("entityName", "");
      setValue("description", "");
      setValue("shortName", "");
      setValue("code", "");
      setValue("shares", "");
      setValue("timeline", "");
      setValue("country", "");
      setValue("currency", "");
      setValue("fee", "");
      setValue("requirements", "");
      setValue("type", "");
      setValue("features", "");
      setValue("documents", "");
    }
    setDisable(disableAll);
  }, [entityInfo, cardAction, countryInfo]);

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={submitAction}
      cardAction={cardAction}
      setCardAction={setCardAction}
      title={title || "Add New Entity"}
      open={open}
      setOpen={setOpen}
      disable={disable}
      setDisable={setDisable}
      loading={loading}
      handleDelete={() => handleEntityDelete(entityInfo)}
      deleteState={deleteState}
    >
      <DetailedSection>
        <InputWithLabel
          label="Entity Name"
          labelStyle="input-label"
          placeholder="Enter entity name e.g Public Limited Company"
          type="text"
          name="entityName"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.entityName?.message}
          disable={disable}
        />
        <InputWithLabel
          label="Entity Short Name"
          labelStyle="input-label"
          containerStyle="input-container-class"
          type="text"
          placeholder="PLC"
          name="shortName"
          inputClass="input-class"
          register={register}
          errorMessage={errors.shortName?.message}
          disable={disable}
        />
      </DetailedSection>
      <TextAreaWithLabel
        label="Entity Description"
        labelStyle="input-label"
        placeholder="Enter entity description"
        name="description"
        register={register}
        errorMessage={errors.description?.message}
        disable={disable}
      />
      <DetailedSection>
        <InputWithLabel
          label="Entity Code"
          placeholder="Enter unique code"
          labelStyle="input-label"
          type="text"
          name="code"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.code?.message}
          disable={disable || cardAction === "edit"}
        />
        <InputWithLabel
          label="Entity Type"
          placeholder="Private"
          labelStyle="input-label"
          type="text"
          name="type"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.type?.message}
          disable={disable}
        />
      </DetailedSection>
      <DetailedSection>
        <InputWithLabel
          label="Entity Requirement"
          placeholder="Standard"
          labelStyle="input-label"
          type="text"
          name="requirements"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.requirements?.message}
          disable={disable}
        />
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Entity Country"
          labelStyle="input-label"
          options={entityCountries}
          onChange={handleCountryChange}
          errorMessage={errors.country?.message}
          defaultValue={cardAction === "edit" && entityInfo?.entityCountry}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disable}
        />
      </DetailedSection>
      <DetailedSection>
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Entity Currency"
          labelStyle="input-label"
          options={entityCurrencies}
          onChange={handleCurrencyChange}
          errorMessage={errors.currency?.message}
          defaultValue={cardAction === "edit" && entityInfo?.entityCurrency}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disable}
        />
        <InputWithLabel
          label={`Entity Fee ${
            cardAction === "edit" ? "(" + entityInfo?.entityCurrency + ")" : ""
          } `}
          labelStyle="input-label"
          containerStyle="input-container-class"
          type="number"
          placeholder="30000"
          name="fee"
          inputClass="input-class"
          register={register}
          errorMessage={errors.fee?.message}
          disable={disable}
        />
      </DetailedSection>
      <DetailedSection>
        <InputWithLabel
          label="Entity Timeline"
          labelStyle="input-label"
          containerStyle="input-container-class"
          type="text"
          placeholder="30 days"
          name="timeline"
          inputClass="input-class"
          register={register}
          errorMessage={errors.timeline?.message}
          disable={disable}
        />
        <InputWithLabel
          label="Entity Shares"
          labelStyle="input-label"
          containerStyle="input-container-class"
          type="number"
          placeholder="100000"
          name="shares"
          inputClass="input-class"
          register={register}
          errorMessage={errors.shares?.message}
          disable={disable}
        />
      </DetailedSection>
      <TagInputs>
        <TagInput
          label="Entity Features"
          bottomText=""
          placeholder="Enter entity features (seperated with a comma)"
          initialValues={
            cardAction === "edit" ? entityInfo?.entityFeatures : []
          }
          getSelectedValues={(values) => setFeatures(values)}
          containerClassName="tagWrapper"
          labelClassName="labelWrapper"
          tagClassName="entityTag"
          inputClassName="entityTaginput"
          maxTags={7}
          maxError="You cannot add more than 7 features"
          minError="Feature name must be at least 3 characters"
          existError="You have added this earlier"
          disable={disable}
        />
        <TagInput
          label="Entity Required Documents"
          bottomText=""
          placeholder="Enter entity required documents (seperated with a comma)"
          initialValues={
            cardAction === "edit" ? entityInfo?.entityRequiredDocuments : []
          }
          getSelectedValues={(values) => setDocuments(values)}
          containerClassName="tagWrapper"
          labelClassName="labelWrapper"
          tagClassName="entityTag"
          inputClassName="entityTaginput"
          maxTags={20}
          maxError="You cannot add more than 20 required documents"
          minError="Required document name must be at least 3 characters"
          existError="You have added this earlier"
          disable={disable}
        />
      </TagInputs>
    </Modal1>
  );
};

export default StaffEntityModal;

const TagInputs = styled.div`
  .tagWrapper {
    margin-bottom: 24px;
  }
  .labelWrapper {
    label {
      font-size: 12px;
    }
  }
  .entityTag {
  }
  .entityTagInput {
    height: 40px;
  }
`;

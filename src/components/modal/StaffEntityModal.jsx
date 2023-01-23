import { yupResolver } from "@hookform/resolvers/yup";
import { DropDown, InputWithLabel } from "components/input";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import Modal1 from "layout/modal1";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useGetAllCountriesQuery } from "services/launchService";
import { useDeleteEntityMutation } from "services/staffService";
import {
  entityRequirements,
  entityTypes,
  StaffEntitySchema,
} from "utils/config";
import { handleError } from "utils/globalFunctions";

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

  // This is attached to entity type dropdown onChange
  const handleEntityTypeChange = (value) => {
    var string = Object.values(value)[0];
    setValue("type", string, { shouldValidate: true });
  };

  // This is attached to entity requirements dropdown onChange
  const handleEntityReqChange = (value) => {
    var string = Object.values(value)[0];
    setValue("requirements", string, { shouldValidate: true });
  };

  // This is attached to country dropdown onChange
  const handleCountryChange = (value) => {
    let selectedCountry = Object.values(value)[0];
    let currency = countries?.data?.filter(
      (country) => country.countryISO === selectedCountry
    )[0].countryCurrency;
    console.log(currency);
    setEntityCurrencies([{ value: currency, label: currency }]);
    setValue("country", selectedCountry, { shouldValidate: true });
    setValue("currency", "", { shouldValidate: true });
  };

  // This is attached to currency dropdown onChange
  const handleCurrencyChange = (value) => {
    var string = Object.values(value)[0];
    setValue("currency", string, { shouldValidate: true });
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
  }, [countries.data]);

  // This populates the entity fields when an entity is clicked
  useEffect(() => {
    if (entityInfo && cardAction === "edit") {
      console.log(entityInfo);
      setValue("entity_name", entityInfo.entityName, { shouldValidate: true });
      setValue("description", entityInfo.entityDescription, {
        shouldValidate: true,
      });
      setValue("short_name", entityInfo.entityShortName, {
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
      let countryEntity = countryInfo && Object.keys(countryInfo)?.length > 0;

      setValue("entity_name", "");
      setValue("description", "");
      setValue("short_name", "");
      setValue("code", "");
      setValue("shares", "");
      setValue("timeline", "");
      setValue("country", `${countryEntity && countryInfo?.countryISO}`);
      setValue("currency", `${countryEntity && countryInfo?.countryCurrency}`);
      setValue("fee", "");
      setValue("requirements", "");
      setValue("type", "");
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
      // entityInfo={entityInfo}
      handleDelete={() => handleEntityDelete(entityInfo)}
      deleteState={deleteState}
    >
      <InputWithLabel
        label="Entity Name"
        labelStyle="input-label"
        placeholder="Enter entity name e.g Public Limited Company"
        type="text"
        name="entity_name"
        inputClass="input-class"
        containerStyle="input-container-class"
        register={register}
        errorMessage={errors.entity_name?.message}
        disable={disable}
      />

      <DetailedSection>
        <InputWithLabel
          label="Entity Description"
          labelStyle="input-label"
          placeholder="Enter entity description"
          type="text"
          name="description"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.description?.message}
          disable={disable}
        />
        <InputWithLabel
          label="Entity Short Name"
          labelStyle="input-label"
          containerStyle="input-container-class"
          type="text"
          placeholder="PLC"
          name="short_name"
          inputClass="input-class"
          register={register}
          errorMessage={errors.short_name?.message}
          disable={disable}
        />
      </DetailedSection>

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
          disable={disable}
        />
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Entity Type"
          labelStyle="input-label"
          placeholder="Public"
          options={entityTypes}
          onChange={handleEntityTypeChange}
          errorMessage={errors.type?.message}
          defaultValue={entityInfo?.entityType}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disable}
        />
      </DetailedSection>

      <DetailedSection>
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Entity Requirement"
          placeholder="Standard"
          labelStyle="input-label"
          options={entityRequirements}
          onChange={handleEntityReqChange}
          errorMessage={errors.requirements?.message}
          defaultValue={entityInfo?.entityRequirements}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disable}
        />
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Entity Country"
          labelStyle="input-label"
          options={entityCountries}
          onChange={handleCountryChange}
          errorMessage={errors.country?.message}
          defaultValue={entityInfo?.entityCountry || countryInfo?.countryISO}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disable || countryInfo?.countryISO}
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
          defaultValue={
            entityInfo?.entityCurrency || countryInfo?.countryCurrency
          }
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disable || countryInfo?.countryCurrency}
        />
        <InputWithLabel
          label="Entity Fee"
          labelStyle="input-label"
          containerStyle="input-container-class"
          type="text"
          placeholder="30000"
          name="fee"
          inputClass="input-class"
          register={register}
          errorMessage={errors.timeline?.message}
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
    </Modal1>
  );
};

export default StaffEntityModal;

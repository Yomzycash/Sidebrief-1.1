import { yupResolver } from "@hookform/resolvers/yup";
import { DropDown, InputWithLabel } from "components/input";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import Modal1 from "layout/modal1";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StaffEntitySchema } from "utils/config";

const StaffEntityModal = ({
  cardAction,
  selectedToEdit,
  open,
  setOpen,
  disableAll,
  title,
  entityInfo,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StaffEntitySchema),
  });

  // Entity type options
  const entityTypes = [
    { value: "Private", label: "Private" },
    { value: "Public", label: "Public" },
  ];

  // Entity requirement options
  const entityRequirements = [
    { value: "Standard", label: "Standard" },
    { value: "Non-Standard", label: "Non-Standard" },
  ];

  // Entity country options
  const entityCountries = [
    { value: "NGA", label: "NGA" },
    { value: "KEN", label: "KEN" },
  ];

  // Entity currency options
  const entityCurrencies = [
    { value: "NGN", label: "NGN" },
    { value: "USD", label: "USD" },
  ];

  const handleEntityTypeChange = (value) => {
    var string = Object.values(value)[0];
    setValue("type", string, { shouldValidate: true });
  };

  const handleEntityReqChange = (value) => {
    var string = Object.values(value)[0];
    setValue("requirement", string, { shouldValidate: true });
  };

  const handleCountryChange = (value) => {
    var string = Object.values(value)[0];
    setValue("country", string, { shouldValidate: true });
  };

  const handleCurrencyChange = (value) => {
    var string = Object.values(value)[0];
    setValue("currency", string, { shouldValidate: true });
  };

  useEffect(() => {
    if (entityInfo) {
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
      setValue("requirement", entityInfo.entityRequirements, {
        shouldValidate: true,
      });
      setValue("type", entityInfo.entityType, { shouldValidate: true });
    }
  }, [entityInfo]);

  console.log(entityInfo);

  // This runs when the form gets submitted
  const submitAction = () => {};

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={submitAction}
      cardAction={cardAction}
      title={title || "Add New Entity"}
      open={open}
      setOpen={setOpen}
      disable={disableAll}
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
        disable={disableAll}
      />
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
        disable={disableAll}
      />
      <DetailedSection>
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
          disable={disableAll}
        />
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Entity Type"
          labelStyle="input-label"
          placeholder="Public"
          options={entityTypes}
          onChange={handleEntityTypeChange}
          errorMessage={errors.type?.message}
          cardAction={cardAction}
          defaultValue={entityInfo?.entityType}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disableAll}
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
          disable={disableAll}
        />
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Entity Requirement"
          placeholder="Standard"
          labelStyle="input-label"
          options={entityRequirements}
          onChange={handleEntityReqChange}
          errorMessage={errors.requirements?.message}
          cardAction={cardAction}
          defaultValue={entityInfo?.entityRequirements}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disableAll}
        />
      </DetailedSection>
      <DetailedSection>
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Entity Country"
          labelStyle="input-label"
          options={entityCountries}
          onChange={handleCountryChange}
          errorMessage={errors.country?.message}
          cardAction={cardAction}
          defaultValue={entityInfo?.entityCountry}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disableAll}
        />
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Entity Currency"
          labelStyle="input-label"
          options={entityCurrencies}
          onChange={handleCurrencyChange}
          errorMessage={errors.currency?.message}
          cardAction={cardAction}
          defaultValue={entityInfo?.entityCurrency}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disableAll}
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
          disable={disableAll}
        />
        <InputWithLabel
          label="Entity Shares"
          labelStyle="input-label"
          containerStyle="input-container-class"
          type="text"
          placeholder="100000"
          name="shares"
          inputClass="input-class"
          register={register}
          errorMessage={errors.shares?.message}
          disable={disableAll}
        />
      </DetailedSection>
    </Modal1>
  );
};

export default StaffEntityModal;

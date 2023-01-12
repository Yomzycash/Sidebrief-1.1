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
import { StaffEntitySchema } from "utils/config";
import { handleError } from "utils/globalFunctions";

const StaffEntityModal = ({
  cardAction,
  open,
  setOpen,
  disableAll,
  title,
  entityInfo,
  submitAction,
  loading,
  refetch,
}) => {
  const [disable, setDisable] = useState(disableAll);
  const [entityCountries, setEntityCountries] = useState([
    { value: "", label: "" },
  ]);
  const [entityCurrencies, setEntityCurrencies] = useState([
    { value: "", label: "" },
  ]);

  const [deleteEntity, deleteState] = useDeleteEntityMutation();
  const countries = useGetAllCountriesQuery();

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
  // const entityCountries = [
  //   { value: "NGA", label: "NGA" },
  //   { value: "KEN", label: "KEN" },
  // ];

  // Entity currency options
  // const entityCurrencies = [
  //   { value: "NGN", label: "NGN" },
  //   { value: "USD", label: "USD" },
  // ];

  const handleEntityTypeChange = (value) => {
    var string = Object.values(value)[0];
    setValue("type", string, { shouldValidate: true });
  };

  const handleEntityReqChange = (value) => {
    var string = Object.values(value)[0];
    setValue("requirements", string, { shouldValidate: true });
  };
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

  useEffect(() => {
    if (entityInfo && cardAction === "edit") {
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
      setValue("entity_name", "");
      setValue("description", "");
      setValue("short_name", "");
      setValue("code", "");
      setValue("shares", "");
      setValue("timeline", "");
      setValue("country", "");
      setValue("currency", "");
      setValue("fee", "");
      setValue("requirements", "");
      setValue("type", "");
    }
    setDisable(disableAll);
  }, [entityInfo, cardAction]);

  // This runs when the form gets submitted
  // const submitAction = () => {};

  // This runs when the delete icon is pressed
  const handleEntityDelete = async (formData) => {
    console.log(entityInfo);
    let response = await deleteEntity(entityInfo);
    console.log(response);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Entity deleted successfully");
    } else {
      handleError(error);
    }
    refetch();
  };

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={submitAction}
      cardAction={cardAction}
      title={title || "Add New Entity"}
      open={open}
      setOpen={setOpen}
      disable={disable}
      setDisable={setDisable}
      loading={loading}
      entityInfo={entityInfo}
      handleDelete={handleEntityDelete}
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
          cardAction={cardAction}
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
          cardAction={cardAction}
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
          cardAction={cardAction}
          defaultValue={entityInfo?.entityCountry}
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
          cardAction={cardAction}
          defaultValue={entityInfo?.entityCurrency}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          disable={disable}
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

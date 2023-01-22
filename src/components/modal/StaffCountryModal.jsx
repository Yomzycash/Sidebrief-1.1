import { yupResolver } from "@hookform/resolvers/yup";
import { InputWithLabel } from "components/input";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import Modal1 from "layout/modal1";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StaffCountrySchema } from "utils/config";

const StaffCountryModal = ({
  cardAction,
  open,
  setOpen,
  disableAll,
  title,
  countryInfo,
  submitAction,
  loading,
  $hideIcons,
}) => {
  const [disable, setDisable] = useState(disableAll);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StaffCountrySchema),
  });

  useEffect(() => {
    if (countryInfo) {
      setValue("country_name", countryInfo.countryName, {
        shouldValidate: true,
      });
      setValue("country_code", countryInfo.countryCode, {
        shouldValidate: true,
      });
      setValue("country_iso", countryInfo.countryISO, {
        shouldValidate: true,
      });
      setValue("currency", countryInfo.countryCurrency, {
        shouldValidate: true,
      });
      setValue(
        "flag",
        `https://countryflagsapi.com/png/${countryInfo.countryISO.toLowerCase()}`,
        { shouldValidate: true }
      );
    } else {
      setValue("country_name", "");
      setValue("country_code", "");
      setValue("country_iso", "");
      setValue("currency", "");
      setValue("flag", "");
    }
    setDisable(disableAll);
  }, [countryInfo]);

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={submitAction}
      cardAction={cardAction}
      title={title || "Add New Country"}
      open={open}
      setOpen={setOpen}
      disable={disable}
      setDisable={setDisable}
      loading={loading}
      countryInfo={countryInfo}
      $hideIcons={$hideIcons}
    >
      <InputWithLabel
        label="Country Name"
        labelStyle="input-label"
        placeholder="Enter country name"
        type="text"
        name="country_name"
        inputClass="input-class"
        containerStyle="input-container-class"
        register={register}
        errorMessage={errors.country_name?.message}
        disable={disable}
      />

      <DetailedSection>
        <InputWithLabel
          label="Country Code"
          labelStyle="input-label"
          placeholder="+234"
          type="number"
          name="country_code"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.country_code?.message}
          disable={disable}
        />
        <InputWithLabel
          label="Country ISO"
          labelStyle="input-label"
          containerStyle="input-container-class"
          type="text"
          placeholder="NGA"
          name="country_iso"
          inputClass="input-class"
          register={register}
          errorMessage={errors.country_iso?.message}
          disable={disable}
        />
      </DetailedSection>

      <DetailedSection>
        <InputWithLabel
          label="Currency"
          placeholder="Naira"
          labelStyle="input-label"
          type="text"
          name="currency"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.currency?.message}
          disable={disable}
        />
        <InputWithLabel
          label="Country Flag"
          placeholder="Image URL"
          labelStyle="input-label"
          type="text"
          name="flag"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.flag?.message}
          disable={disable}
        />
      </DetailedSection>
    </Modal1>
  );
};
export default StaffCountryModal;

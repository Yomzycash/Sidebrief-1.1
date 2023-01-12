import { InputWithLabel } from "components/input";
import Modal1 from "layout/modal1";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import NumberInput from "components/input/phoneNumberInput";
import { useState } from "react";
import { StaffCountrySchema } from "utils/config";
import KYCFileUpload from "components/FileUpload/KYCFileUpload";

const StaffRewardModal = ({ cardAction, open, setOpen }) => {
  //  This populates the phone number when edit is clicked
  const [defaultPhone] = useState(cardAction === "edit" ? "" : "");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StaffCountrySchema),
  });

  // This runs when the form gets submitted
  const submitAction = () => {};

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={submitAction}
      cardAction={cardAction}
      title="Add New Country"
      open={open}
      setOpen={setOpen}
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
          errorMessage={errors.email?.message}
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
        />

        {/* <InputWithLabel
          label="Country Flag"
          labelStyle="input-label"
          containerStyle="input-container-class"
          type="text"
          placeholder="NGA"
          name="country_iso"
          inputClass="input-class"
          register={register}
          errorMessage={errors.email?.message}
        /> */}
        <KYCFileUpload TopText="Country Flag" style={{ width: "100%" }} />
      </DetailedSection>
    </Modal1>
  );
};

export default StaffRewardModal;

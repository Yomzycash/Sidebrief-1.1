import { InputWithLabel } from "components/input";
import React, { useEffect, useState } from "react";
import {
  DetailedSection,
  Title,
  Form,
  CheckInputWrapper,
  CheckboxWrapper,
  buttonContainerStyles,
  buttonStyles,
} from "./style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useViewDirectorsMutation,
  useViewMembersMutation,
} from "services/launchService";
import NumberInput from "components/input/phoneNumberInput";
import { CheckoutController } from "..";
import { ReactComponent as CloseIcon } from "asset/images/close.svg";
import { handleSingleDirectorView } from "pages/Launch/DirectorsInfo/actions";

export const MembersBasicInfo = ({
  title,
  handleClose,
  maxPercentage,
  submitForm,
  populateModal,
  shareCompanySchema,
  infoSchema,
  info,
  isLoading,
  shareholder,
  beneficiary,
}) => {
  const [sharesLeft, setSharesLeft] = useState(maxPercentage);
  const [stakeLeft, setStakeLeft] = useState(maxPercentage);

  const [viewMembers] = useViewMembersMutation();
  const [viewDirectors] = useViewDirectorsMutation();

  let launchInfo = JSON.parse(localStorage.getItem("launchInfo"));

  let edit = info?.memberName || info?.beneficialOwnerName;

  const [isCompany, setIsCompany] = useState(false);
  const [isDirector, setIsDirector] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      shareCompanySchema && isCompany ? shareCompanySchema : infoSchema
    ),
  });

  useEffect(() => {
    if (edit) {
      populateModal(setValue);
      if (shareholder) handleCheckBoxes();
    }
  }, []);

  const handleCheckBoxes = async () => {
    if (info.shareholderRegistrationNumber) {
      setValue("isCompany", true);
      setIsCompany(true);
    }
    let actionInfo = {
      ...launchInfo,
      identificationNumber: info.shareholderIdentificationNumber,
      viewMembers: viewMembers,
      viewDirectors: viewDirectors,
    };
    let shareholderIsDir = await handleSingleDirectorView(actionInfo);
    if (shareholderIsDir.data) {
      setValue("isDirector", true);
      setIsDirector(true);
    }
  };

  const handleIsCompany = () => {
    setValue("isCompany", !isCompany);
    setIsCompany(!isCompany);
    if (isCompany) {
      setValue("regNo", "");
    } else {
      setValue("regNo", info.shareholderRegistrationNumber);
    }
  };

  const handleShareChange = (e) => {
    let currValue = e.target.value;
    let diff = info?.shareholderOwnershipPercentage - currValue;
    let newMax = maxPercentage + diff;
    let newMax2 = maxPercentage - currValue;
    setSharesLeft(edit ? (newMax > 0 ? newMax : 0) : newMax2 > 0 ? newMax2 : 0);
    setValue("sharePercentage", currValue);
  };

  const handleStakeChange = (e) => {
    let currValue = e.target.value;
    let diff = info?.beneficialOwnershipStake - currValue;
    let newMax = maxPercentage + diff;
    let newMax2 = maxPercentage - currValue;
    setStakeLeft(edit ? (newMax > 0 ? newMax : 0) : newMax2 > 0 ? newMax2 : 0);
    setValue("stake", currValue);
  };

  // This sets the phone number value - attached to the onChange event
  const handleNumberChange = (value) => {
    setValue("phone", value, { shouldValidate: true });
  };

  let maxShare = maxPercentage + (info?.shareholderOwnershipPercentage || 0);
  let maxStake = maxPercentage + (info?.beneficialOwnershipStake || 0);

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Title>
        <p>
          {edit ? "Update" : "Add a"} {title}
        </p>
        <div style={{ cursor: "pointer" }}>
          <CloseIcon onClick={handleClose} />
        </div>
      </Title>
      <CheckInputWrapper>
        <InputWithLabel
          label={isCompany ? "Company Name" : "Full Name"}
          labelStyle="input-label"
          bottomText="Please start with the first name then the middle name (if available) and finally the last name"
          type="text"
          name="fullName"
          inputClass="input-class"
          bottomTextClass="bottom-text-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.fullName?.message}
        />

        <DetailedSection>
          <NumberInput
            label="Phone Number"
            labelStyle="input-label"
            containerStyle="input-container-class"
            name="phone"
            value={
              edit
                ? info?.memberPhone?.toString() ||
                  info?.beneficialOwnerPhone?.toString()
                : ""
            }
            type="number"
            phoneInputStyles={{
              // height: "48px",
              marginTop: "clamp(0, 3vw, 8px)",
              fontSize: "clamp(12px, 1.2vw, 14px",
              height: "40px",
            }}
            errorMessage={errors.phone?.message}
            register={register}
            onChange={handleNumberChange}
          />
          <InputWithLabel
            label="Email Address"
            labelStyle="input-label"
            containerStyle="input-container-class"
            type="email"
            name="email"
            inputClass="input-class"
            register={register}
            errorMessage={errors.email?.message}
          />
        </DetailedSection>

        <DetailedSection>
          {shareholder && (
            <InputWithLabel
              name="sharePercentage"
              label={`Share Percentage (left: ${sharesLeft}%)  (max: ${maxShare}%)`}
              labelStyle="input-label"
              containerStyle="input-container-class"
              type="number"
              onChange={handleShareChange}
              maxNumber={maxShare}
              inputClass="input-class"
              defaultValue={info?.shareholderOwnershipPercentage}
              // register={register}
              errorMessage={errors.sharePercentage?.message}
            />
          )}
          {!beneficiary && (
            <InputWithLabel
              label="Identification Number (e.g. NIN)"
              labelStyle="input-label"
              containerStyle="input-container-class"
              type="number"
              name="nin"
              inputClass="input-class"
              register={register}
              errorMessage={errors.nin?.message}
            />
          )}
        </DetailedSection>
        {!beneficiary && isCompany && (
          <InputWithLabel
            label="Registration Number"
            labelStyle="input-label"
            containerStyle="input-container-class"
            type="number"
            name="regNo"
            inputClass="input-class"
            register={register}
            errorMessage={errors.regNo?.message}
          />
        )}
        {beneficiary && (
          <DetailedSection>
            <InputWithLabel
              name="stake"
              label={`Stake Percentage (left: ${stakeLeft}%)  (max: ${maxStake}%)`}
              labelStyle="input-label"
              containerStyle="input-container-class"
              type="number"
              onChange={handleStakeChange}
              maxNumber={maxStake}
              inputClass="input-class"
              defaultValue={info?.beneficialOwnershipStake}
              // register={register}
              errorMessage={errors.stake?.message}
            />
            <InputWithLabel
              name="occupation"
              label="Occupation"
              labelStyle="input-label"
              containerStyle="input-container-class"
              type="text"
              inputClass="input-class"
              register={register}
              errorMessage={errors.occupation?.message}
            />
          </DetailedSection>
        )}
        {shareholder && (
          <CheckboxWrapper>
            <div>
              <input
                type="checkbox"
                id="is_company"
                name="isCompany"
                checked={isCompany}
                onClick={handleIsCompany}
                {...register("isCompany")}
              />
              <label htmlFor="is_company">
                Click here if {title} is a <span>Company</span>
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="is_director"
                name="isDirector"
                checked={isDirector}
                onClick={() => setIsDirector(!isDirector)}
                {...register("isDirector")}
              />
              <label htmlFor="is_director">
                Click here if {title} is a <span>Director</span>
              </label>
            </div>
          </CheckboxWrapper>
        )}
      </CheckInputWrapper>
      <CheckoutController
        backAction={handleClose}
        forwardAction={() => {}}
        backText={"Cancel"}
        containerStyle={buttonContainerStyles}
        backBottonStyle={buttonStyles}
        forwardButtonStyle={buttonStyles}
        forwardSubmit
        forwardLoading={isLoading}
        forwardText={edit ? "Update" : "Add"}
        forwardDisable={isLoading}
        $modal
      />
    </Form>
  );
};

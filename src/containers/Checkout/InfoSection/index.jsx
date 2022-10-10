import { DropDown, InputWithLabel } from "components/input";
import React, { useEffect, useState } from "react";
import {
  DetailedSection,
  Title,
  Form,
  CheckInputWrapper,
  CheckboxWrapper,
} from "./style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { directorRoleOptions, shareTypeOptions } from "utils/config";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAddMemberMutation } from "services/launchService";
import NumberInput from "components/input/phoneNumberInput";
import { CheckoutController } from "..";
import { ReactComponent as CloseIcon } from "asset/images/close.svg";
import { ThreeDots } from "react-loading-icons";
import { memberAdd } from "./actions";

export const CheckoutFormInfo = ({
  title,
  handleClose,
  shareholder,
  director,
  beneficiary,
  cardAction,
  checkInfoSchema,
  shareDirSchema,
  handleAdd,
  handleUpdate,
  addIsLoading,
  selectedToEdit,
}) => {
  const [buttonText] = useState(cardAction === "edit" ? "Update" : "Save");
  const [directorInitialRole] = useState(selectedToEdit?.directorRole);
  const [isDirector, setIsDirector] = useState(
    cardAction === "edit" ? selectedToEdit?.directorRole : false
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isDirector ? shareDirSchema : checkInfoSchema),
  });

  const launchInfoFromStore = useSelector((store) => store.LaunchReducer);
  const { generatedLaunchCode } = launchInfoFromStore;

  //  This populates the phone number when edit is clicked
  const [defaultPhone] = useState(
    cardAction === "edit"
      ? beneficiary
        ? selectedToEdit.beneficialOwnerPhone
        : selectedToEdit.memberPhone
      : ""
  );

  // Endpoints hooks from launch slice
  const [addMember, { error, isLoading, isSuccess }] = useAddMemberMutation();

  // This submits the form data to both backend and store
  const submitForm = async (formData) => {
    console.log(formData);
    if (beneficiary) {
      if (cardAction === "add") {
        handleAdd(formData, generatedLaunchCode);
      } else if (cardAction === "edit") {
        handleUpdate(formData, generatedLaunchCode, selectedToEdit);
      }
      return;
    }
    if (cardAction === "add") {
      handleAdd(formData, generatedLaunchCode);
    } else if (cardAction === "edit") {
      handleUpdate(formData, selectedToEdit);
    }
  };

  // This populates the input fields value when edit botton is clicked
  useEffect(() => {
    if (cardAction === "edit") {
      setValue("full_name", selectedToEdit?.memberName);
      setValue("email", selectedToEdit?.memberEmail);
      setValue(
        "share_percentage",
        selectedToEdit?.shareholderOwnershipPercentage
      );
      setValue("isDirector", selectedToEdit?.directorRole ? true : false);

      handleNumberChange(selectedToEdit?.memberPhone);
      handleShareTypeChange({
        share_type: selectedToEdit?.shareholderOwnershipType,
      });

      handleDirectorRoleChange({
        director_role: selectedToEdit?.directorRole,
      });

      if (beneficiary) {
        setValue("full_name", selectedToEdit?.beneficialOwnerName);
        setValue("email", selectedToEdit?.beneficialOwnerEmail);
        setValue("occupation", selectedToEdit?.beneficialOwnerOccupation);
        setValue("stake", selectedToEdit?.beneficialOwnershipStake);
        handleNumberChange(selectedToEdit?.beneficialOwnerPhone);
      }
    }
  }, []);

  // This sets the share type value - attached to the onChange event
  const handleShareTypeChange = (value) => {
    var string = Object.values(value)[0];
    setValue("share_type", string, { shouldValidate: true });
  };

  // This sets the director role value - attached to the onChange event
  const handleDirectorRoleChange = (value) => {
    var string = Object.values(value)[0];
    setValue("director_role", string, { shouldValidate: true });
  };

  // This sets the phone number value - attached to the onChange event
  const handleNumberChange = (value) => {
    setValue("phone", value, { shouldValidate: true });
  };

  const buttonStyles = {
    maxWidth: "197px",
    width: "25%",
    height: "59px",
    padding: "0",
    minWidth: "100px",
  };
  const buttonContainerStyles = {
    justifyContent: "flex-end",
    gap: "24px",
    margin: "clamp(20px, 5%, 30px) 0 clamp(20px, 5%, 40px) 0",
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Title>
        <p>
          {cardAction === "edit" ? "Update" : "Add a"} {title}
        </p>
        <CloseIcon onClick={handleClose} />
      </Title>
      <CheckInputWrapper>
        <InputWithLabel
          label="Full Name (or Company Name, if Company) "
          labelStyle="input-label"
          bottomText="Please start with the first name then the middle name (if available) and finally the last name"
          type="text"
          name="full_name"
          inputClass="input-class"
          register={register}
          errorMessage={errors.full_name?.message}
        />

        <DetailedSection>
          <NumberInput
            label="Phone number"
            labelStyle="input-label"
            name="phone"
            value={defaultPhone}
            type="number"
            phoneInputStyles={{
              height: "48px",
              marginTop: "8px",
              fontSize: "14px",
            }}
            errorMessage={errors.phone?.message}
            register={register}
            onChange={handleNumberChange}
          />

          <InputWithLabel
            label="Email Address"
            labelStyle="input-label"
            type="email"
            name="email"
            inputClass="input-class"
            register={register}
            errorMessage={errors.email?.message}
          />
        </DetailedSection>
        {shareholder && (
          <DetailedSection>
            <InputWithLabel
              name="share_percentage"
              label="Share Percentage"
              labelStyle="input-label"
              type="number"
              inputClass="input-class"
              register={register}
              errorMessage={errors.share_percentage?.message}
            />
            <DropDown
              containerStyle={{ margin: 0, marginBottom: "24px" }}
              label="Share Type"
              labelStyle="input-label"
              options={shareTypeOptions}
              onChange={handleShareTypeChange}
              errorMessage={errors.share_type?.message}
              cardAction={cardAction}
              defaultValue={selectedToEdit?.shareholderOwnershipType}
              launch
            />
          </DetailedSection>
        )}
        {(isDirector || director) && (
          <DropDown
            containerStyle={{ margin: 0, marginBottom: "24px" }}
            label="Director Role"
            labelStyle="input-label"
            options={directorRoleOptions}
            onChange={handleDirectorRoleChange}
            errorMessage={errors.director_role?.message}
            cardAction={cardAction}
            defaultValue={directorInitialRole}
            launch
          />
        )}
        {beneficiary && (
          <DetailedSection>
            <InputWithLabel
              name="stake"
              label="Stake Percentage"
              labelStyle="input-label"
              type="number"
              inputClass="input-class"
              register={register}
              errorMessage={errors.stake?.message}
            />
            <InputWithLabel
              name="occupation"
              label="Occupation"
              labelStyle="input-label"
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
                id="member-type1"
                name="isCompany"
                {...register("isCompany")}
              />
              <label htmlFor="member-type1">
                Click here if {title} is a <span>Company</span>
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="member-type2"
                name="isDirector"
                checked={isDirector}
                onClick={() => setIsDirector(!isDirector)}
                {...register("isDirector")}
              />
              <label onClick={() => setIsDirector(!isDirector)}>
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
        forwardText={
          addIsLoading || isLoading || isSuccess ? (
            <ThreeDots stroke="#98ff98" fill="white" width={50} />
          ) : (
            buttonText
          )
        }
        forwardDisable={addIsLoading || isLoading || isSuccess}
      />
    </Form>
  );
};

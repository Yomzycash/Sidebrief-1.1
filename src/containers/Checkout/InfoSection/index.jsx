import { Checkbox, DropDown, InputWithLabel } from "components/input";
import React, { useEffect, useRef, useState } from "react";
import {
  DetailedSection,
  Title,
  Form,
  CheckInputWrapper,
  CheckboxWrapper,
} from "./style";
import { ReactComponent as EditIcon } from "asset/Launch/Edit.svg";
import { ReactComponent as DeleteIcon } from "asset/Launch/Delete.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { shareTypeOptions, checkInfoSchema } from "utils/config";
import { shareTypeOptions } from "utils/config";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useAddBeneficiaryMutation,
  useAddDirectorMutation,
  useAddMembersMutation,
  useAddShareHolderMutation,
} from "services/launchService";
import NumberInput from "components/input/phoneNumberInput";
import Button, { CheckoutButton } from "components/button";
import { CheckoutController } from "..";
import { ReactComponent as CloseIcon } from "asset/images/close.svg";
import { store } from "redux/Store";
import { setShareHoldersLaunchInfo } from "redux/Slices";
import { ThreeDots } from "react-loading-icons";

export const CheckoutFormInfo = ({
  title,
  handleClose,
  shareholder,
  director,
  beneficiary,
  cardAction,
  checkInfoSchema,
  isDirector,
  setIsDirector,
  handleAdd,
  handleUpdate,
  addIsLoading,
  selectedToEdit,
  directorsInfo,
}) => {
  const [buttonText] = useState(cardAction === "edit" ? "Update" : "Save");
  // const [isDirector, setIsDirector] = useState(selectedToEdit.isDirector);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkInfoSchema),
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
  const [addMembers, { isLoading, isSuccess }] = useAddMembersMutation();

  // Hide director's field on mount
  // useEffect(() => {
  //   if (isDirector) {
  //     setIsDirector(false);
  //   }
  // }, []);

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
      const requiredMemberData = {
        launchCode: generatedLaunchCode,
        businessMember: {
          memberName: formData.full_name,
          memberEmail: formData.email,
          memberPhone: formData.phone,
        },
      };

      let addMemberResponse = await addMembers(requiredMemberData);

      if (addMemberResponse.data) {
        // Get the information of all added members
        const allMembers = Object.entries(
          addMemberResponse.data.businessMembers
        );
        // Get the information of the just added member
        const memberInfo = allMembers[allMembers.length - 1][1];
        handleAdd(formData, generatedLaunchCode, memberInfo);
      } else {
        if (addMemberResponse.error.status === "FETCH_ERROR") {
          toast.error("Please check your internet connection");
        }
      }
    } else if (cardAction === "edit") {
      setIsDirector(formData?.isDirector);
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
      setValue("director_role", selectedToEdit?.director_role);
      handleNumberChange(selectedToEdit?.memberPhone);
      handleShareTypeChange({
        share_type: selectedToEdit?.shareholderOwnershipType,
      });
      if (directorsInfo) {
        let directorInfo = directorsInfo.filter(
          (director) => director.memberCode === selectedToEdit.memberCode
        );
        if (directorInfo.length > 0) {
          setValue("director_role", directorInfo[0].directorRole);
          setIsDirector(true);
        }
      }
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
        <p>Add a {title}</p>
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
              register={register}
              onChange={handleShareTypeChange}
              errorMessage={errors.share_type?.message}
              cardAction={cardAction}
              defaultValue={selectedToEdit?.shareholderOwnershipType}
              launch
            />
          </DetailedSection>
        )}
        {director && (
          <DetailedSection>
            <InputWithLabel
              name="director_role"
              label="Director's Role"
              labelStyle="input-label"
              type="text"
              inputClass="input-class"
              register={register}
              errorMessage={errors.director_role?.message}
            />
          </DetailedSection>
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
                {...register("isDirector")}
              />
              <label
                htmlFor="member-type2"
                onClick={() => setIsDirector(!isDirector)}
              >
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

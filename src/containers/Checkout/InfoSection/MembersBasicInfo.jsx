import { DropDown, InputWithLabel } from "components/input";
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
import { directorRoleOptions, shareTypeOptions } from "utils/config";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useAddMemberMutation,
  useViewDirectorsMutation,
  useViewMembersMutation,
} from "services/launchService";
import NumberInput from "components/input/phoneNumberInput";
import { CheckoutController } from "..";
import { ReactComponent as CloseIcon } from "asset/images/close.svg";
import { ThreeDots } from "react-loading-icons";
import { memberAdd } from "./actions";
import { handleSingleDirectorView } from "pages/Launch/DirectorsInfo/actionss";

export const MembersBasicInfo = ({
  title,
  handleClose,
  submitForm,
  populateModal,
  shareCompanySchema,
  infoSchema,
  info,
  isLoading,
  shareholder,
  beneficiary,
  // cardAction,
  // checkInfoSchema,
  // shareDirSchema,
  // handleAdd,
  // handleUpdate,
  // addIsLoading,
  // selectedToEdit,
}) => {
  const [viewMembers, viewMembersState] = useViewMembersMutation();
  const [viewDirectors, viewDirectorsState] = useViewDirectorsMutation();

  let launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  // const [buttonText] = useState(cardAction === "edit" ? "Update" : "Save");
  // const [directorInitialRole] = useState(selectedToEdit?.directorRole);
  // const [isDirector, setIsDirector] = useState(
  //   cardAction === "edit"
  //     ? selectedToEdit?.directorRole
  //       ? true
  //       : false
  //     : false
  // );
  // const {
  //   handleSubmit,
  //   register,
  //   setValue,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(
  //     shareDirSchema && isDirector ? shareDirSchema : checkInfoSchema
  //   ),
  // });
  let edit = info?.memberName;

  const [isCompany, setIsCompany] = useState(false);
  const [isDirector, setIsDirector] = useState(false);
  // const [defaultPhone] = useState(
  //   edit ? info.memberPhone || info.beneficialOwnerPhone : ""
  // );

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
  }, [isCompany, isDirector]);

  const handleCheckBoxes = async () => {
    if (info?.shareholderRegistrationNumber) {
      setIsCompany(true);
      setValue("isCompany", true);
      setValue("regNo", info.shareholderRegistrationNumber);
    }
    let actionInfo = {
      ...launchInfo,
      memberCode: info.memberCode,
      viewMembers: viewMembers,
      viewDirectors: viewDirectors,
    };
    let shareholderIsDir = await handleSingleDirectorView(actionInfo);
    if (shareholderIsDir.data) {
      setValue("isDirector", true);
      setIsDirector(true);
    }
  };

  useEffect(() => {
    if (!isCompany) setValue("regNo", "");
  }, [isCompany]);

  // const launchInfoFromStore = useSelector((store) => store.LaunchReducer);
  // const { generatedLaunchCode } = launchInfoFromStore;

  // //  This populates the phone number when edit is clicked
  // const [defaultPhone] = useState(
  //   cardAction === "edit"
  //     ? beneficiary
  //       ? selectedToEdit.beneficialOwnerPhone
  //       : selectedToEdit.memberPhone
  //     : ""
  // );

  // // Endpoints hooks from launch slice
  // const [addMember, { error, isLoading, isSuccess }] = useAddMemberMutation();

  // // This submits the form data to both backend and store
  // const submitForm = async (formData) => {
  //   // console.log(formData);
  //   if (beneficiary) {
  //     if (cardAction === "add") {
  //       handleAdd(formData, generatedLaunchCode);
  //     } else if (cardAction === "edit") {
  //       // console.log(formData);
  //       handleUpdate(formData, generatedLaunchCode, selectedToEdit);
  //     }
  //     return;
  //   }
  //   if (cardAction === "add") {
  //     handleAdd(formData, generatedLaunchCode);
  //   } else if (cardAction === "edit") {
  //     handleUpdate(formData, selectedToEdit);
  //   }
  // };

  // // This populates the input fields value when edit botton is clicked
  // useEffect(() => {
  //   if (cardAction === "edit") {
  //     setValue("full_name", selectedToEdit?.memberName);
  //     setValue("email", selectedToEdit?.memberEmail);
  //     setValue(
  //       "sharePercentage",
  //       selectedToEdit?.shareholderOwnershipPercentage
  //     );
  //     setValue("isDirector", isDirector);
  //     setValue("nin", selectedToEdit.shareholderOwnershipType, {
  //       shouldValidate: true,
  //     });
  //     setValue("reg_number", selectedToEdit.directorRole, {
  //       shouldValidate: true,
  //     });
  //     handleNumberChange(selectedToEdit?.memberPhone);
  //     // setValue("directorRole", selectedToEdit.directorRole, {
  //     //   shouldValidate: true,
  //     // });

  //     // handleShareTypeChange({
  //     //   shareType: selectedToEdit?.shareholderOwnershipType,
  //     // });

  //     // handleDirectorRoleChange({
  //     //   directorRole: selectedToEdit?.directorRole,
  //     // });

  //     if (beneficiary) {
  //       setValue("full_name", selectedToEdit?.beneficialOwnerName);
  //       setValue("email", selectedToEdit?.beneficialOwnerEmail);
  //       setValue("occupation", selectedToEdit?.beneficialOwnerOccupation);
  //       setValue("stake", selectedToEdit?.beneficialOwnershipStake);
  //       handleNumberChange(selectedToEdit?.beneficialOwnerPhone);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   setValue("isDirector", isDirector);
  // }, [isDirector]);

  // This sets the share type value - attached to the onChange event
  const handleShareTypeChange = (value) => {
    var string = Object.values(value)[0];
    setValue("shareType", string, { shouldValidate: true });
  };

  // This sets the director role value - attached to the onChange event
  const handleDirectorRoleChange = (value) => {
    var string = Object.values(value)[0];
    setValue("directorRole", string, { shouldValidate: true });
  };

  // This sets the phone number value - attached to the onChange event
  const handleNumberChange = (value) => {
    setValue("phone", value, { shouldValidate: true });
  };
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
          label={
            isCompany
              ? "Company Name"
              : "Full Name (or Company Name, if Company) "
          }
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
                ? info?.memberPhone.toString() ||
                  info?.beneficialOwnerPhone.toString()
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
              label="Share Percentage"
              labelStyle="input-label"
              containerStyle="input-container-class"
              type="number"
              inputClass="input-class"
              register={register}
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
          {/* <DropDown
              containerStyle={{ margin: 0, marginBottom: "24px" }}
              label="Share Type"
              labelStyle="input-label"
              options={shareTypeOptions}
              onChange={handleShareTypeChange}
              errorMessage={errors.shareType?.message}
              defaultValue={info?.shareholderOwnershipType}
              fontSize="clamp(12px, 1.2vw, 14px)"
              height="40px"
              launch
            /> */}
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
        {/* {director && (
          <DropDown
            containerStyle={{ margin: 0, marginBottom: "24px" }}
            label="Director Role"
            labelStyle="input-label"
            options={directorRoleOptions}
            onChange={handleDirectorRoleChange}
            errorMessage={errors.directorRole?.message}
            defaultValue={info?.directorRole}
            fontSize="clamp(12px, 1.2vw, 14px)"
            height="40px"
            launch
          />
        )} */}
        {beneficiary && (
          <DetailedSection>
            <InputWithLabel
              name="stake"
              label="Stake Percentage"
              labelStyle="input-label"
              containerStyle="input-container-class"
              type="number"
              inputClass="input-class"
              register={register}
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
                onClick={() => setIsCompany(!isCompany)}
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
        // forwardLoading={addIsLoading || isLoading || isSuccess}
        forwardLoading={isLoading}
        forwardText={
          // addIsLoading || isLoading || isSuccess ? (
          //   <ThreeDots stroke="#98ff98" fill="white" width={50} />
          // ) : (
          edit ? "Update" : "Add"
          // )
        }
        forwardDisable={isLoading}
        $modal
      />
    </Form>
  );
};

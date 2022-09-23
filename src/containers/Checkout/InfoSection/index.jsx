import { Checkbox, DropDown, InputWithLabel } from "components/input";
import React, { useState } from "react";
import {
  ContentWrapper,
  DetailedSection,
  ButtonLink,
  Title,
  TitleWrapper,
  CheckWrapper,
  Form,
  SaveBtn,
  AllInputContainer,
  Wrapper,
  CheckInputWrapper,
  ImgWrapper,
  AddMoreWrapper,
  AddWrapper,
  EditWrapper,
  DeleteWrapper,
  ButtonWrapper,
  CheckboxWrapper,
} from "./style";
import { ReactComponent as EditIcon } from "asset/Launch/Edit.svg";
import { ReactComponent as DeleteIcon } from "asset/Launch/Delete.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shareTypeOptions, checkInfoSchema } from "utils/config";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useAddMembersMutation,
  useAddShareHolderMutation,
} from "services/launchService";
import NumberInput from "components/input/phoneNumberInput";
import Button, { CheckoutButton } from "components/button";
import { CheckoutController } from "..";
import { ReactComponent as CloseIcon } from "asset/images/close.svg";
import {
  setBeneficiariesLaunchInfo,
  setDirectorsLaunchInfo,
  setShareHoldersLaunchInfo,
} from "redux/Slices";
import { store } from "redux/Store";

export const CheckoutFormInfo = ({ title, handleClose }) => {
  const [read, setRead] = useState(true);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkInfoSchema),
  });

  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );
  // const generatedMemberCode = useSelector(
  //   (store) => store.LaunchReducer.generatedMemberCode
  // );

  const [addMembers] = useAddMembersMutation();
  const [addShareHolder] = useAddShareHolderMutation();

  const submitForm = async (formData) => {
    store.dispatch(setShareHoldersLaunchInfo(formData));
    store.dispatch(setDirectorsLaunchInfo(formData));
    store.dispatch(setBeneficiariesLaunchInfo(formData));
    console.log(formData);

    const requiredMemberData = {
      launchCode: generatedLaunchCode,
      businessMember: {
        memberName: formData.full_name,
        memberEmail: formData.email,
        memberPhone: formData.phone,
      },
    };

    let addMemberResponse = await addMembers(requiredMemberData);

    // const requiredShareholderData = {
    //   launchCode: generatedLaunchCode,
    //   memberCode: generatedMemberCode,
    //   shareholderOwnershipPercentage: formData.share_percentage,
    //   shareholderOwnershipType: formData.share_type,
    // };

    // let error = response?.error;
    // let result = response?.data;

    // if (response) {
    //   console.log(result.businessMembers[0].memberCode);
    //   // toast.success(result.message);
    // } else if (error) {
    //   toast.error(error.data.message);
    //   console.log(error.data.message);
    // }
  };

  const handleShareTypeChange = (value) => {
    var string = Object.values(value)[0];
    setValue("share_type", string, { shouldValidate: true });
    console.log(string);
  };

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
    margin: "30px 0 40px 0",
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Title>
        <p>Add a {title}</p>
        <CloseIcon onClick={handleClose} />
      </Title>
      <CheckInputWrapper>
        <InputWithLabel
          label="Full Name"
          bottomText="Please start with the first name then the middle name (if available) and finally the last name"
          type="text"
          name="full_name"
          readonly={read}
          register={register}
          errorMessage={errors.full_name?.message}
        />

        <DetailedSection>
          <NumberInput
            label="Phone number"
            name="phone"
            // value={number}
            type="number"
            errorMessage={errors.phone?.message}
            register={register}
            onChange={handleNumberChange}
          />

          <InputWithLabel
            label="Email Address"
            type="email"
            name="email"
            register={register}
            errorMessage={errors.email?.message}
          />
        </DetailedSection>
        <DetailedSection>
          <InputWithLabel
            labelStyle="Label"
            name="share_percentage"
            label="Share Percentage"
            type="number"
            register={register}
            errorMessage={errors.share_percentage?.message}
          />
          <DropDown
            containerStyle={{ margin: 0, marginBottom: "24px" }}
            labelStyle={"Label"}
            label="Share Type"
            options={shareTypeOptions}
            register={register}
            onChange={handleShareTypeChange}
            errorMessage={errors.share_type?.message}
          />
        </DetailedSection>
        <CheckboxWrapper>
          <div>
            <input type="checkbox" id="member-type1" />
            <label htmlFor="member-type1">
              Click here if {title} is a <span>Company</span>
            </label>
          </div>
          <div>
            <input type="checkbox" id="member-type2" />
            <label htmlFor="member-type2">
              Click here if {title} is a <span>Director</span>
            </label>
          </div>
        </CheckboxWrapper>
      </CheckInputWrapper>
      <CheckoutController
        backAction={handleClose}
        backText={"Cancel"}
        forwardAction={handleClose}
        forwardText={"Save"}
        containerStyle={buttonContainerStyles}
        backBottonStyle={buttonStyles}
        forwardButtonStyle={buttonStyles}
        forwardSubmit
      />
    </Form>
  );
};

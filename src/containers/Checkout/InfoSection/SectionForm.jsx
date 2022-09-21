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

const SectionForm = ({ containerList, setContainerList, index }) => {
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

  const handleContainerEdit = () => {
    setRead(!read);
  };

  const handleContainerRemove = (index) => {
    const List = [...containerList];
    List.splice(index, 1);
    setContainerList(List);
  };

  return (
    <AllInputContainer>
      <Form onSubmit={handleSubmit(submitForm)}>
        <CheckInputWrapper>
          <ImgWrapper>
            <EditWrapper onClick={handleContainerEdit}>
              <EditIcon />
            </EditWrapper>
            <DeleteWrapper onClick={() => handleContainerRemove(index)}>
              <DeleteIcon />
            </DeleteWrapper>
          </ImgWrapper>
          <ContentWrapper>
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
                containerStyle={{ margin: 0 }}
                labelStyle={"Label"}
                label="Share Type"
                options={shareTypeOptions}
                register={register}
                onChange={handleShareTypeChange}
                errorMessage={errors.share_type?.message}
              />
            </DetailedSection>
          </ContentWrapper>
          <CheckWrapper>
            <DetailedSection>
              <Checkbox
                text1="Click here if "
                styledSpan1="shareholder "
                text2="is also a "
                styledSpan2="company"
              />

              <Checkbox
                text1="Click here if "
                styledSpan1="shareholder "
                text2="is also a "
                styledSpan2="Director "
              />
            </DetailedSection>

            <SaveBtn type="submit">Save</SaveBtn>
          </CheckWrapper>
        </CheckInputWrapper>
      </Form>
    </AllInputContainer>
  );
};

export default SectionForm;

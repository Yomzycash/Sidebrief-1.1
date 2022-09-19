import React from "react";
import { InputWithLabel, DropDown } from "components/input";
import Checkbox from "components/input/Checkbox";
import NumberInput from "components/input/phoneNumberInput";
import { ReactComponent as EditIcon } from "asset/Launch/Edit.svg";
import { ReactComponent as DeleteIcon } from "asset/Launch/Delete.svg";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import styled from "styled-components";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shareTypeOptions, checkInfoSchema } from "utils/config";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useAddMembersMutation,
  useAddShareHolderMutation,
} from "services/launchService";

export const CheckoutFormInfo = ({
  title = "Shareholder’s Information",
  info = "Shareholder",
}) => {
  const [containerList, setContainerList] = useState([{ container: "" }]);
  const [read, setRead] = useState(true);
  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );
  const generatedMemberCode = useSelector(
    (store) => store.LaunchReducer.generatedMemberCode
  );

  const [addMembers] = useAddMembersMutation();
  const [addShareHolder] = useAddShareHolderMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkInfoSchema),
  });

  const handleAddContainer = () => {
    setContainerList([...containerList, { container: "" }]);
  };

  const handleContainerRemove = (index) => {
    const List = [...containerList];
    List.splice(index, 1);
    setContainerList(List);
  };

  const handleContainerEdit = () => {
    setRead(!read);
  };

  const handleShareTypeChange = (value) => {
    var string = Object.values(value)[0];
    setValue("share_type", string, { shouldValidate: true });
    console.log(string);
  };

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

    // const requiredShareholderData = {
    //   launchCode: generatedLaunchCode,
    //   memberCode: generatedMemberCode,
    //   shareholderOwnershipPercentage: formData.share_percentage,
    //   shareholderOwnershipType: formData.share_type,
    // };

    let response = await addMembers(requiredMemberData);

    console.log(response);
    let error = response?.error;
    let result = response?.data;

    if (response) {
      console.log(result.businessMembers[0].memberCode);
      // toast.success(result.message);
    } else if (error) {
      toast.error(error.data.message);
      console.log(error.data.message);
    }
  };

  const handleNumberChange = (value) => {
    setValue("phone", value, { shouldValidate: true });
  };

  // const handleContainerChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...serviceList];
  //   list[index][name] = value;
  //   setList(list);
  // };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{title}:</Title>
      </TitleWrapper>

      <Checkbox />
      {containerList.map((singleContainer, index) => (
        <AllInputContainer key={index}>
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
                    type="text"
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

            {containerList.length - 1 === index && (
              <AddMoreWrapper onClick={handleAddContainer}>
                <AddWrapper>
                  <AddIcon />
                </AddWrapper>
                <ButtonLink>
                  Add More<p> {info}</p>
                </ButtonLink>
              </AddMoreWrapper>
            )}
          </Form>
        </AllInputContainer>
      ))}
    </Wrapper>
  );
};

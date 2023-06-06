import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  HeaderText,
  LeftContainer,
  BackContainer,
  ButtonContainer,
  TopSection,
  SearchBlock,
  SearchWrapper,
  MainSection,
  LeftSection,
  RightSection,
  EmailSection,
  ToContainer,
  SubjectContainer,
  IntroTextContainer,
  MessageContainer,
  SendContainer,
  UserInfoCard,
} from "../styled";
import "react-calendar/dist/Calendar.css";
import { Send } from "asset/svg";
import styled from "styled-components";
import { useGetUserByIdQuery, useSendMessageMutation } from "services/staffService";
import { IoIosArrowDown } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { InputWithLabel, TextAreaWithLabel } from "components/input";
import { CommonButton } from "components/button";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerEmailSchema } from "./schema";
import { useGetUserDraftQuery } from "services/launchService";
import CustomDropDown from "components/input/CustomDropdown/CustomDropDown";
import TagInput2 from "components/input/TagInput2";

const CustomerDetails = ({ loading, emailInfo, disable }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [sendMessage, messageState] = useSendMessageMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerEmailSchema),
  });

  const { user } = useParams();
  let userDetails = useGetUserByIdQuery(user, { skip: !user });
  const userLaunch = useGetUserDraftQuery();
  console.log(userLaunch.data);

  const goBack = () => {
    navigate(-1);
  };

  userDetails = userDetails.data?.data;
  console.log(userDetails);

  const getRequired = (info) => {
    return {
      emails: [info.emails],
      title: info.title,
      body: info.body,
      introText: info.introText,
    };
  };

  const submitAction = async (formData) => {
    let requiredData = getRequired(formData);
    let response = await sendMessage(requiredData);

    let data = response?.data;
    let error = response?.error;
    console.log("email response", formData);

    if (data) {
      toast.success("Email sent succcessfully");
    } else {
      handleError(error);
    }
  };

  useEffect(() => {
    if (emailInfo) {
      setValue("emails", emailInfo.emails, {
        shouldValidate: true,
      });
      setValue("title", emailInfo.title, {
        shouldValidate: true,
      });
      setValue("body", emailInfo.body, {
        shouldValidate: true,
      });
      setValue("introText", emailInfo.introText, {
        shouldValidate: true,
      });
    }
  }, [emailInfo]);

  const DropdownOptions = [
    "All Users",
    "All Users in Managed",
    "All Users in Taxes",
    "All Users in Intellectual Property",
  ];

  return (
    <Container>
      <Header>
        <TopSection>
          <LeftContainer>
            <BackContainer onClick={goBack}>
              <FiArrowLeft color="#151717" size={24} />
              Back to Dashboard
            </BackContainer>
            <HeaderText>From:Sidebrief@gmail.com</HeaderText>
          </LeftContainer>
        </TopSection>
      </Header>

      <EmailForm onSubmit={handleSubmit(submitAction)}>
        <MainSection>
          <LeftSection>
            <EmailSection>
              <ToContainer>
                <TagInput2
                  initialValue="To:"
                  options={["dkjfdf", "lekdsjfldk"]}
                  selectStyle={{ justifyContent: "space-between" }}
                />
                <InputWithLabel
                  placeholder="Enter recipient(s)"
                  labelStyle="input-label"
                  type="text"
                  name="emails"
                  inputClass="input-class"
                  containerStyle="input-container-class"
                  leftText="To:"
                  rightIcon={
                    <ArrowDown onClick={() => setIsActive(!isActive)} isActive={isActive}>
                      <IoIosArrowDown />
                    </ArrowDown>
                  }
                  register={register}
                  errorMessage={errors.emails?.message}
                  disable={disable}
                />
                {isActive && (
                  <DropdownContainer>
                    <DropdownContent>
                      {DropdownOptions.map((item, index) => (
                        <DropdownList key={index}>
                          <DropdownItem>{item}</DropdownItem>
                          <CheckboxInput type="checkbox" />
                        </DropdownList>
                      ))}
                    </DropdownContent>
                  </DropdownContainer>
                )}
              </ToContainer>

              <SubjectContainer>
                <InputWithLabel
                  labelStyle="input-label"
                  type="text"
                  name="title"
                  inputClass="input-class"
                  containerStyle="input-container-class"
                  leftText="Subject:"
                  register={register}
                  errorMessage={errors.title?.message}
                  disable={disable}
                />
              </SubjectContainer>
              <IntroTextContainer>
                <InputWithLabel
                  labelStyle="input-label"
                  type="text"
                  name="introText"
                  inputClass="input-class"
                  containerStyle="input-container-class"
                  placeholder="Dear Sir"
                  register={register}
                  errorMessage={errors.introText?.message}
                  disable={disable}
                />
              </IntroTextContainer>
              <MessageContainer>
                <TextAreaWithLabel
                  containerStyle={{ height: "100px" }}
                  name="body"
                  labelStyle="input-label"
                  placeholder="Write your messsage here"
                  register={register}
                  errorMessage={errors.body?.message}
                  disable={disable}
                />
              </MessageContainer>
              <SendContainer>
                <CommonButton
                  type={"submit"}
                  text={"Send"}
                  RightIcon={Send}
                  loading={messageState.isLoading}
                />
              </SendContainer>
            </EmailSection>
          </LeftSection>
          <RightSection>
            <UserInfoCard>
              <h2>User Details</h2>
              <p>Full Name: {userDetails?.first_name + " " + userDetails?.last_name}</p>
              <p>Email: {userDetails?.email}</p>
              <p>Username: {userDetails?.username}</p>
              <p>Phone: {userDetails?.phone}</p>
              <p>Used Promo Code: {userDetails?.has_used_referral_code?.toString()}</p>
              <p>Referred: {userDetails?.referral_code}</p>
            </UserInfoCard>
          </RightSection>
        </MainSection>
      </EmailForm>
    </Container>
  );
};

export default CustomerDetails;

const ArrowDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: ${({ isActive }) => (isActive ? "rotate(180deg)" : "")};
  transition: 0.3s transform ease;
  padding: 0 5px;
`;

const EmailForm = styled.form``;

const DropdownContainer = styled.div`
  padding: 10px;
  background: #ffffff;
  position: relative;
  bottom: 20px;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
`;
const DropdownList = styled.div`
  display: flex;
  align-items: center;
`;
const DropdownItem = styled.li`
  list-style-type: none;
  padding-top: 8px;
  font-size: 0.6em;
  flex: 1;
`;

const CheckboxInput = styled.input`
  margin: 10px 0 0 10px;
`;

const TextBody = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  position: relative;
  bottom: 50px;
  align-items: flex-start;
  gap: 24px;
  padding: 15px;

  button {
    margin-top: 5px;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
`;

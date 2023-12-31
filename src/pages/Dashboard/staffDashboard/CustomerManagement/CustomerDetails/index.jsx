import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  HeaderText,
  LeftContainer,
  BackContainer,
  TopSection,
  MainSection,
  EmailSection,
  UserSection,
  EmailInputs,
  SubjectContainer,
  IntroTextContainer,
  MessageContainer,
  SendContainer,
  UserInfoCard,
  CategoryWrapper,
  InitialsContainer,
  Initials,
  CategoryContainer,
  Category,
  CategoryItem,
  FooterContainer,
} from "../styled";
import "react-calendar/dist/Calendar.css";
import { Send } from "asset/svg";
import styled from "styled-components";
import {
  useGetAllRegisteredUsersQuery,
  useGetAllServicesQuery,
  useGetUserByIdQuery,
  useSendMessageMutation,
} from "services/staffService";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { InputWithLabel, TextAreaWithLabel } from "components/input";
import { CommonButton } from "components/button";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerEmailSchema, OTPSchema } from "./schema";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import { useViewAllComplyQuery } from "services/complyService";
import { useActions } from "./actions";
import voucher_gen from "voucher-code-generator";

const CustomerDetails = () => {
  const [emailTags, setEmailTags] = useState([]);
  const [emailConfirmCode, setEmailConfirmCode] = useState();
  const [emailFormData, setEmailFormData] = useState({});

  const navigate = useNavigate();
  const { user } = useParams();

  const [sendMessage, messageState] = useSendMessageMutation();
  let allUsers = useGetAllRegisteredUsersQuery();
  let userDetails = useGetUserByIdQuery(user, { skip: !user });
  let comply = useViewAllComplyQuery();
  let services = useGetAllServicesQuery();

  allUsers = allUsers.data?.data;
  userDetails = userDetails.data?.data;
  comply = comply.data;
  services = services.data;

  const getServiceInfo = (id) => services?.find((el) => el?.serviceId === id);
  const getUser = (el) => allUsers?.find((val) => val?._id === el?.meta);

  const complyFullInfo = comply?.map((el) => {
    let serviceInfo = getServiceInfo(el?.serviceId);

    return {
      ...serviceInfo,
      ...el,
    };
  });

  //
  const filterComply = (category, status) => {
    if (!status) return complyFullInfo?.filter((el) => el?.serviceCategory === category);
    else
      return complyFullInfo?.filter(
        (el) => el?.serviceCategory === category && el?.status === status
      );
  };

  // Each product users emails
  const allEmails = allUsers?.map((el) => el?.email);
  const allLaunchEmails = allUsers
    ?.filter((el) => el?.draft_launch_requests?.length > 0 || el?.submitted_launch_requests)
    ?.map((el) => el?.email);
  const allManageEmails = filterComply("MANAGE")?.map((el) => getUser(el)?.email);
  const allOnboardEmails = filterComply("Onboard")?.map((el) => getUser(el)?.email);
  const allTaxEmails = filterComply("TAX")?.map((el) => getUser(el)?.email);
  const allComplianceEmails = filterComply("Compliance")?.map((el) => getUser(el)?.email);
  const allIntellectualEmails = filterComply("Intellectual Property")?.map(
    (el) => getUser(el)?.email
  );

  // Each product draft users emails
  const allDraftLaunchEmails = allUsers
    ?.filter((el) => el?.draft_launch_requests?.length > 0)
    ?.map((el) => el?.email);
  const allDraftManageEmails = filterComply("MANAGE", "pending")?.map((el) => getUser(el)?.email);
  const allDraftOnboardEmails = filterComply("Onboard", "pending")?.map((el) => getUser(el)?.email);
  const allDraftTaxEmails = filterComply("TAX", "pending")?.map((el) => getUser(el)?.email);
  const allDraftComplianceEmails = filterComply("Compliance", "pending")?.map(
    (el) => getUser(el)?.email
  );
  const allDraftIntellectualEmails = filterComply("Intellectual Property", "pending")?.map(
    (el) => getUser(el)?.email
  );

  // Each product submitted users emails
  const allSubmittedLaunchEmails = allUsers
    ?.filter((el) => el?.submitted_launch_requests?.length > 0)
    ?.map((el) => el?.email);
  const allSubmittedManageEmails = filterComply("MANAGE", "submitted")?.map(
    (el) => getUser(el)?.email
  );
  const allSubmittedOnboardEmails = filterComply("Onboard", "submitted")?.map(
    (el) => getUser(el)?.email
  );
  const allSubmittedTaxEmails = filterComply("TAX", "submitted")?.map((el) => getUser(el)?.email);
  const allSubmittedComplianceEmails = filterComply("Compliance", "submitted")?.map(
    (el) => getUser(el)?.email
  );
  const allSubmittedIntellectualEmails = filterComply("Intellectual Property", "submitted")?.map(
    (el) => getUser(el)?.email
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerEmailSchema),
  });

  const OTPActions = useForm({
    resolver: yupResolver(OTPSchema),
  });

  const submitAction = async (formData) => {
    const OTP = voucher_gen.generate({
      length: 6,
      count: 1,
      charset: "0123456789",
    });

    const requiredData = {
      emails: ["hello@sidebrief.com"],
      title: "Email Authorization",
      introText: "Hello,",
      body: `Your One-Time Password (OTP) is: ${OTP}\n\nPlease use this OTP to complete your verification process.`,
      footer: `Thank you,\nDevs\nSidebrief`,
    };

    let response = await sendMessage(requiredData);

    let data = response?.data;
    let error = response?.error;

    if (data) {
      setEmailConfirmCode(OTP[0]);
      setEmailFormData(formData);
      toast.success("OTP sent to hello@sidebrief.com");
    } else {
      handleError(error);
    }
  };

  const submitOTP = async (formData) => {
    const { title, introText, body, footer } = emailFormData;

    const requiredData = {
      emails: getEmails(),
      title,
      introText,
      body,
      footer,
    };

    if (parseInt(emailConfirmCode) === parseInt(formData.otp)) {
      const response = await sendMessage(requiredData);

      const data = response?.data;
      const error = response?.error;

      if (data) {
        setEmailFormData(formData);
        toast.success("Email sent succcessfully");
        navigate("/staff-dashboard/customer-management");
      } else {
        handleError(error);
      }
    } else {
      toast.error("Invalid OTP");
    }
  };

  const getEmailList = (tags) => {
    setEmailTags(tags);
  };

  useEffect(() => {
    if (emailTags?.length > 0) {
      setValue("emails", emailTags, { shouldValidate: true });
    } else setValue("emails", [], { shouldValidate: true });
  }, [emailTags?.length]);

  const getEmails = () => {
    let emails = emailTags.map((el) => {
      if (isValidEmail(el)) return [el];
      else return customEmailFullLists.find((val) => val.text === el)?.emails;
    });
    emails = [].concat(...emails);
    return emails;
  };

  const { customEmailFullLists, isValidEmail } = useActions({
    allEmails,
    allLaunchEmails,
    allDraftLaunchEmails,
    allSubmittedLaunchEmails,
    allManageEmails,
    allDraftManageEmails,
    allSubmittedManageEmails,
    allTaxEmails,
    allDraftTaxEmails,
    allSubmittedTaxEmails,
    allComplianceEmails,
    allDraftComplianceEmails,
    allSubmittedComplianceEmails,
    allIntellectualEmails,
    allDraftIntellectualEmails,
    allSubmittedIntellectualEmails,
    allOnboardEmails,
    allDraftOnboardEmails,
    allSubmittedOnboardEmails,
  });

  const customEmailLists = customEmailFullLists?.map((el) => el?.text);

  const tagIsValid = (tag) => {
    const valid = isValidEmail(tag);
    if (!valid) return { error: true };
  };

  return (
    <Container>
      <Header>
        <TopSection>
          <LeftContainer>
            <BackContainer onClick={() => navigate(-1)}>
              <FiArrowLeft color="#151717" size={24} />
              <span>Back to user management</span>
            </BackContainer>
          </LeftContainer>
        </TopSection>
      </Header>

      <EmailContainer>
        <MainSection>
          {emailConfirmCode ? (
            <EmailSection onSubmit={OTPActions.handleSubmit(submitOTP)}>
              <InputWithLabel
                label="OTP"
                labelStyle="input-label"
                type="number"
                name="otp"
                inputClass="input-class"
                containerStyle="input-container-class"
                placeholder="Enter OTP"
                register={OTPActions.register}
                errorMessage={OTPActions.formState.errors.otp?.message}
                bottomText="Please enter the 6-digits one-time-password (OTP) sent to hello@sidebrief.com"
              />
              <SendContainer>
                <CommonButton
                  type="submit"
                  text={"Send"}
                  RightIcon={Send}
                  loading={messageState.isLoading}
                />
              </SendContainer>
            </EmailSection>
          ) : (
            <EmailSection onSubmit={handleSubmit(submitAction)}>
              <EmailInputs>
                <TagInputWithSearch
                  list={customEmailLists.filter((el) => !emailTags.find((val) => val === el))}
                  getValue={getEmailList}
                  MultiSelect
                  placeholder="To:"
                  maxTag={999}
                  ExistsError="Already selected"
                  customError={errors.emails?.message}
                  validateTag={tagIsValid}
                />

                <SubjectContainer>
                  <InputWithLabel
                    labelStyle="input-label"
                    type="text"
                    name="title"
                    inputClass="input-class"
                    containerStyle="input-container-class"
                    placeholder="Subject"
                    register={register}
                    errorMessage={errors.title?.message}
                  />
                </SubjectContainer>
                <IntroTextContainer>
                  <InputWithLabel
                    labelStyle="input-label"
                    type="text"
                    name="introText"
                    inputClass="input-class"
                    containerStyle="input-container-class"
                    placeholder="Dear Sir,"
                    register={register}
                    errorMessage={errors.introText?.message}
                  />
                </IntroTextContainer>
                <MessageContainer>
                  <TextAreaWithLabel
                    name="body"
                    labelStyle="input-label"
                    containerStyle="input-container-class"
                    placeholder="Write your messsage here"
                    register={register}
                    errorMessage={errors.body?.message}
                  />
                </MessageContainer>
                <FooterContainer>
                  <TextAreaWithLabel
                    name="footer"
                    labelStyle="input-label"
                    placeholder="Enter email footer"
                    register={register}
                    errorMessage={errors.footer?.message}
                  />
                </FooterContainer>
              </EmailInputs>
              <SendContainer>
                <CommonButton
                  type="submit"
                  text={"Send"}
                  RightIcon={Send}
                  loading={messageState.isLoading}
                />
              </SendContainer>
            </EmailSection>
          )}
          {user && (
            <UserSection>
              <UserInfoCard>
                <h5>USER DETAILS</h5>
                <InitialsContainer>
                  <Initials>
                    {userDetails?.first_name.charAt(0) + "" + userDetails?.last_name.charAt(0)}
                  </Initials>
                </InitialsContainer>

                <CategoryWrapper>
                  <CategoryContainer>
                    <Category>Full Name</Category>
                    <CategoryItem>
                      {userDetails?.first_name + " " + userDetails?.last_name}
                    </CategoryItem>
                  </CategoryContainer>

                  <CategoryContainer>
                    <Category>Email</Category>
                    <CategoryItem>{userDetails?.email}</CategoryItem>
                  </CategoryContainer>

                  <CategoryContainer>
                    <Category>Username</Category>
                    <CategoryItem>{userDetails?.username}</CategoryItem>
                  </CategoryContainer>

                  <CategoryContainer>
                    <Category>Phone</Category>
                    <CategoryItem>{userDetails?.phone}</CategoryItem>
                  </CategoryContainer>

                  <CategoryContainer>
                    <Category>Used Promo Code</Category>
                    <CategoryItem>
                      {userDetails?.has_used_referral_code?.toString() === "true" ? "Yes" : "No"}
                    </CategoryItem>
                  </CategoryContainer>

                  <CategoryContainer>
                    <Category>Referral Option</Category>
                    <CategoryItem>{userDetails?.referral_code}</CategoryItem>
                  </CategoryContainer>
                </CategoryWrapper>
              </UserInfoCard>
            </UserSection>
          )}
        </MainSection>
      </EmailContainer>
    </Container>
  );
};

export default CustomerDetails;

const EmailContainer = styled.div``;

//
//
//

// const submitOTP = async (formData) => {
//   const requiredData = {
//     emails: getEmails(),
//     introText: formData.introText,
//     title: formData.title,
//     body: formData.body,
//     footer: formData.footer,
//   };

//   let response = await sendMessage(requiredData);

//   let data = response?.data;
//   let error = response?.error;

//   if (data) {
//     setEmailFormData(formData);
//     toast.success("Email sent succcessfully");
//   } else {
//     handleError(error);
//   }
// };

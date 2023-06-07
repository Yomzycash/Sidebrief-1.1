import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  HeaderText,
  LeftContainer,
  BackContainer,
  TopSection,
  MainSection,
  LeftSection,
  RightSection,
  EmailSection,
  SubjectContainer,
  IntroTextContainer,
  MessageContainer,
  SendContainer,
  UserInfoCard,
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
import { customerEmailSchema } from "./schema";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import { useViewAllComplyQuery } from "services/complyService";
import { useActions } from "./actions";

const CustomerDetails = () => {
  const [emailTags, setEmailTags] = useState([]);

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

  const submitAction = async (formData) => {
    let requiredData = {
      emails: getEmails(),
      title: formData.title,
      body: formData.body,
      introText: formData.introText,
    };
    // let response = await sendMessage(requiredData);

    // let data = response?.data;
    // let error = response?.error;
    // console.log("email response", response);

    // if (data) {
    //   toast.success("Email sent succcessfully");
    // } else {
    //   handleError(error);
    // }
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
                  placeholder="Write your messsage here"
                  register={register}
                  errorMessage={errors.body?.message}
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

const EmailForm = styled.form``;

//
//
//

import React, { useEffect, useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Container, Bottom, Body } from "../styled";
import { CheckoutController, CheckoutSection } from "containers";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { setCheckoutProgress, setShareholderDocs } from "redux/Slices";
import { store } from "redux/Store";
import { useNavigate } from "react-router-dom";
import {
  useAddMemberKYCMutation,
  useDeleteMemberKYCMutation,
  useGetAllEntitiesQuery,
  useGetUserDraftQuery,
  useViewMembersMutation,
  useViewShareholdersMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ContentWrapper, FileContainer, Loading, Name } from "./styles";
import FileUpload from "components/FileUpload";
import {
  convertToLink,
  isValidFileUploaded,
  mergeInfo,
} from "utils/LaunchHelper";

import { Puff } from "react-loading-icons";
import AppFeedback from "components/AppFeedback";
import KYCFileUpload from "components/FileUpload/KYCFileUpload";

const ShareHolderKYC = () => {
  const navigate = useNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [error, setError] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState("");
  const [viewMember, viewMembersState] = useViewMembersMutation();
  const [deleteMemberKYC] = useDeleteMemberKYCMutation();
  const [viewShareholders, viewShareholderState] =
    useViewShareholdersMutation();
  const [shareholderContainer, setShareholder] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);

  const launchResponse = useSelector(
    (state) => state.LaunchReducer.launchResponse
  );
  const countryISO = localStorage.getItem("countryISO");


  const [documentContainer, setDocumentContainer] = useState([]);
  const { data, isLoading, isSuccess } = useGetAllEntitiesQuery(countryISO);
const drafts = useGetUserDraftQuery();

  useEffect(() => {
    const check = data?.find((entity) => entity.entityCode === launchResponse.registrationType);
    setRequiredDocuments(check?.entityRequiredDocuments);
  }, [data]);

  useEffect(() => {
    const mapping = shareholderContainer.map((shareholder) => {
      return {
        name: shareholder.memberName,
        code: shareholder.memberCode,
        files: {
          government_id: "",
          proof_of_home_address: "",
          passport_photograph: "",
        },
      };
    });
    setDocumentContainer(mapping);
  }, [shareholderContainer]);

  const handleMerge = async () => {
    let memberInfo = await viewMember(launchResponse);
    let newMemberInfo = [...memberInfo.data.businessMembers];

    let shareholderInfo = await viewShareholders(launchResponse);
    let newShareHolderInfo = [...shareholderInfo.data.businessShareholders];

    let newMerge = mergeInfo(newShareHolderInfo, newMemberInfo);
    setShareholder(newMerge);

    return newMerge;
  };

  useEffect(() => {
    handleMerge();
  }, []);

  const handlePrev = () => {
    navigate(-1);
  };

  const handleChange = async (files, shareholder, type) => {
    setDocumentContainer((prev) => {
      const updatedState = [...prev];

      const index = updatedState.findIndex((el) => el.code === shareholder);

      updatedState[index] = {
        ...updatedState[index],
        files: {
          ...updatedState[index].files,
          [type]: files[0].name,
        },
      };

      return updatedState;
    });

    const res = await convertToLink(files[0]);
    const formatType = type.split("_").join(" ");
    const requiredAddMemberData = {
      launchCode: launchResponse.launchCode,
      memberCode: shareholder,
      memberKYC: {
        documentType: formatType,
        documentLink: res.url,
        fileName: files[0].name,
        fileType: files[0].type,
      },
    };
    const response = await addMemberKYC(requiredAddMemberData);
    if (response.data) {
      toast.success("Document uploaded successfully");
      setIsChanged(!isChanged);
    } else if (response.error) {
      toast.error(response.error?.data.message);
    }
  };

  store.dispatch(setShareholderDocs(documentContainer));
  localStorage.setItem(
    "localShareholderInfo",
    JSON.stringify(documentContainer)
  );

  const handleNext = () => {
    let useSidebriefDirectors = localStorage.getItem("useSidebriefDirectors");
    let beneficiaries = localStorage.getItem("beneficiaries");

    let navigateTo = "/launch/directors-kyc";
    if (useSidebriefDirectors) navigateTo = "/launch/beneficiaries-kyc";
    if (useSidebriefDirectors && beneficiaries === "false")
      navigateTo = "/launch/review";

    navigate(navigateTo);
  };

  const handleRemove = async (documentName) => {
    // console.log("shareholder deleteeeeeeeeeeee", shareholder);
    // const requiredDeleteData = {
    //   launchCode: generatedLaunchCode,
    //   memberCode: shareholder,
    //   documentCode: "",
    // };
    // console.log("delete data to be", requiredDeleteData);
    // const response = await deleteMemberKYC(requiredDeleteData);
    // console.log(response);
    // if (response.data) {
    //   toast.success("Document deleted successfully");
    // } else if (response.error) {
    //   console.log(response.error?.data.message);
    //   toast.error(response.error?.data.message);
    // }
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 8.5 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Shareholder KYC Documentation:"}
          HeaderParagraph={
            "Please attach the necessary documents for all shareholders"
          }
        />
        <LaunchPrimaryContainer>
          {viewShareholderState.isLoading ||
            (viewMembersState.isLoading && (
              <Loading height="50vh">
                <Puff stroke="#00A2D4" fill="white" />
              </Loading>
            ))}
          <LaunchFormContainer style={{ paddingTop: "40px" }}>
            {documentContainer.map((shareholder, index) => (
              <FileContainer key={index}>
                <Name>{shareholder.name}</Name>
                <ContentWrapper key={index}>
                  {requiredDocuments?.map((document, index) => (
                    <KYCFileUpload
                      key={index}
                      isChanged={isChanged}
                      documentComponentType={document}
                      TopText={document}
                      memberCode={shareholder.code}
                      onDrop={(files) =>
                        handleChange(files, shareholder.code, document)
                      }
                      handleRemove={() => handleRemove(document)}
                      BottomText={`Please provide your ${document}`}
                    />
                  ))}

                  {/* <KYCFileUpload
                    isChanged={isChanged}
                    documentComponentType={"representative nin"}
                    TopText={"Representative NIN"}
                    memberCode={shareholder.code}
                    onDrop={(files) =>
                      handleChange(
                        files,
                        shareholder.code,
                        "representative_nin"
                      )
                    }
                    handleRemove={() => handleRemove("representative nin")}
                    BottomText={"National Identification Number"}
                  />

                  <KYCFileUpload
                    isChanged={isChanged}
                    documentComponentType={"signature document"}
                    TopText={"Signature"}
                    memberCode={shareholder.code}
                    onDrop={(files) =>
                      handleChange(
                        files,
                        shareholder.code,
                        "signature_document"
                      )
                    }
                    handleRemove={() => handleRemove("signature document")}
                    BottomText={"Kindly ensure image is not larger than 3MB"}
                  /> */}

                  {/* <FileUpload
                    TopText={"Government Issued ID"}
                    name="government"
                    onChange={(e) => handleChange(e, shareholder.code)}
                    // type={type}
                    handleRemove={handleRemove}
                    errorMsg={error}
                    BottomText={
                      "Driver’s Licence, National ID Card, Voters Card or International Passport"
                    }
                  />


                  <FileUpload
                    TopText={"Proof of Home Address"}
                    name="proof"
                    onChange={(e) => handleChange(e, shareholder.code)}
                    // type={type}
                    handleRemove={handleRemove}
                    errorMsg={error}
                    BottomText={
                      "Utility Bill, Water Corporation Bill or a Rent Invoice"
                    }
                  />

                  <FileUpload
                    TopText={"Passport Photograph"}
                    name="passport"
                    onChange={(e) => handleChange(e, shareholder.code)}
                    // type={type}
                    handleRemove={handleRemove}
                    errorMsg={error}
                    BottomText={"Kindly ensure image is not larger than 3MB"}
                  /> */}
                </ContentWrapper>
              </FileContainer>
            ))}

            {/* <button type="submit">test</button> */}
            {/* <DragAndDrop /> */}
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backAction={handlePrev}
              backText={"Previous"}
              forwardAction={handleNext}
              forwardText={"Proceed"}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
      {/* <AppFeedback subProject="Shareholder KYC" /> */}
    </Container>
  );
};

export default ShareHolderKYC;

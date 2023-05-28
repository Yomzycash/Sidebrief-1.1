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
  useViewMembersKYCMutation,
  useGetMembersKYCQuery,
  useViewMembersMutation,
  useViewShareholdersMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ContentWrapper, FileContainer, Loading, Name } from "./styles";
import { convertToLink, mergeInfo } from "utils/LaunchHelper";
import { Puff } from "react-loading-icons";
import KYCFileUpload from "components/FileUpload/KYCFileUpload";
import { Upload } from "components/File";

const ShareHolderKYC = () => {
  const launchResponse = useSelector((state) => state.LaunchReducer.launchResponse);

  const navigate = useNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [sameData, setSameData] = useState([]);
  // const [viewMemberKYC] = useViewMembersKYCMutation();
  const [viewMember, viewMembersState] = useViewMembersMutation();
  const [viewShareholders, viewShareholderState] = useViewShareholdersMutation();
  const [shareholderContainer, setShareholder] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [deleteMemberKYC] = useDeleteMemberKYCMutation();

  const memberKYC = useGetMembersKYCQuery(launchResponse);

  let navigatedFrom = localStorage.getItem("navigatedFrom");

  const countryISO = localStorage.getItem("countryISO");

  const [documentContainer, setDocumentContainer] = useState([]);
  const { data } = useGetAllEntitiesQuery(countryISO);

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
    let newMemberInfo = [...memberInfo?.data?.businessMembers];

    let shareholderInfo = await viewShareholders(launchResponse);
    let newShareHolderInfo = [...shareholderInfo?.data?.businessShareholders];

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

  const newHandleChange = async (uploadedFile, fileName, rawFile, shareholder) => {
    const requiredAddMemberData = {
      launchCode: launchResponse.launchCode,
      memberCode: shareholder,
      memberKYC: {
        documentType: fileName,
        documentLink: uploadedFile.url,
        fileName: rawFile.name,
        fileType: rawFile.type,
      },
    };

    const response = await addMemberKYC(requiredAddMemberData);
    memberKYC.refetch();
    const documentCode = response.data.businessMembersKYC.slice(-1)[0].documentCode;
    if (response.data) {
      toast.success("Document uploaded successfully");
      setIsChanged(!isChanged);
      // handleShareHolderCheck();
    } else if (response.error) {
      toast.error(response.error?.data.message);
    }

    return documentCode || "";
  };

  store.dispatch(setShareholderDocs(documentContainer));
  // const handleShareHolderCheck = async () => {
  //   let newArr = [];
  //   const response = await viewMemberKYC(launchResponse);
  //   const MemberKYCInfo = [...response?.data?.businessMembersKYC];

  //   MemberKYCInfo?.forEach((member) => {
  //     documentContainer?.forEach((document) => {
  //       if (member?.memberCode === document?.code) {
  //         let newList = { ...member, ...document };
  //         console.log("issue", newList);
  //         newArr.push(newList);
  //       }
  //     });
  //   });

  //   setSameData(newArr);
  // };

  // useEffect(() => {
  //   handleShareHolderCheck();
  // }, [documentContainer]);

  const handleNext = () => {
    // handleShareHolderCheck();

    let a = requiredDocuments.length;
    let b = documentContainer.length;
    let c = sameData?.length;
    let d = a * b;

    // if (c === 0) {
    //   toast.error("All documents are required");
    // } else if (d !== c) {
    //   toast.error("All documents are required");
    // } else {
    if (navigatedFrom) {
      navigate(navigatedFrom);
      localStorage.removeItem("navigatedFrom");
    } else {
      let useSidebriefDirectors = localStorage.getItem("useSidebriefDirectors");
      let beneficiaries = localStorage.getItem("beneficiaries");

      let navigateTo = "/launch/directors-kyc";
      if (useSidebriefDirectors) navigateTo = "/launch/beneficiaries-kyc";
      if (useSidebriefDirectors && beneficiaries === "false")
        navigateTo = "/launch/review/business-info";

      navigate(navigateTo);
    }
    // }
  };

  const handleRemove = async (fileCode, memberCode) => {
    const requiredDeleteData = {
      launchCode: launchResponse.launchCode,
      memberCode: memberCode,
      documentCode: fileCode,
    };
    const response = await deleteMemberKYC(requiredDeleteData);
    if (response.data) {
      toast.success("Document deleted successfully");
    } else if (response.error) {
      console.log(response.error?.data.message);
      toast.error(response.error?.data.message);
    }
  };

  const handleDocuments = (documents, code) => {
    if (documents.length > 0) {
      // get all document types
      const documentTypes = [...new Set(documents.map((el) => el.documentType))];

      const object = {};

      documentTypes.forEach((key) => {
        object[key] = documents
          .filter((el) => el.documentType === key && el.memberCode === code)
          .slice(-1)[0];
      });

      return object;
    }
    return {};
  };

  const memberDocuments = memberKYC?.data?.businessMembersKYC || [];

  // Set the progress of the application
  useEffect(() => {
    let review = localStorage.getItem("navigatedFrom");

    store.dispatch(setCheckoutProgress({ total: 13, current: review ? 13 : 8.5 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Shareholder KYC Documentation:"}
          HeaderParagraph={"Please attach the necessary documents for all shareholders"}
        />
        <LaunchPrimaryContainer>
          {viewShareholderState.isLoading ||
            (viewMembersState.isLoading && (
              <Loading height="50vh">
                <Puff stroke="#00A2D4" fill="white" />
              </Loading>
            ))}
          <LaunchFormContainer style={{ paddingTop: "40px" }}>
            {documentContainer.map((shareholder, index) => {
              const docs = handleDocuments(memberDocuments, shareholder.code);
              return (
                <FileContainer key={index}>
                  <Name>{shareholder.name}</Name>
                  <ContentWrapper key={index}>
                    {requiredDocuments?.map((document, index) => {
                      const oldFile = docs[document];
                      return (
                        <Upload
                          key={index}
                          docType={document}
                          oldFile={{
                            name: oldFile?.fileName || "",
                            code: oldFile?.documentCode || "",
                          }}
                          uploadAction={newHandleChange}
                          memberCode={shareholder.code}
                          deleteAction={handleRemove}
                        />
                      );
                    })}
                  </ContentWrapper>
                </FileContainer>
              );
            })}

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

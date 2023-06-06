import React, { useEffect, useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Container, Bottom, Body } from "../styled";
import { CheckoutController, CheckoutSection } from "containers";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { setCheckoutProgress, setDirectorDocs } from "redux/Slices";
import { store } from "redux/Store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useAddMemberKYCMutation,
  useGetAllEntitiesQuery,
  useViewDirectorsMutation,
  useViewMembersKYCMutation,
  useViewMembersMutation,
  useGetMembersKYCQuery,
  useDeleteMemberKYCMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import { ContentWrapper, FileContainer, Loading, Name } from "./styles";
import FileUpload from "components/FileUpload";
import { convertToLink, isValidFileUploaded, mergeInfo } from "utils/LaunchHelper";
import { Puff } from "react-loading-icons";
import KYCFileUpload from "components/FileUpload/KYCFileUpload";
import { Upload } from "components/File";

const DirectorKYC = () => {
  //geting the information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { directorsLaunchInfo } = LaunchApplicationInfo;
  let requiredMemberCode = directorsLaunchInfo[0]?.memberCode;

  const navigate = useNavigate();
  const [isChanged, setIsChanged] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [sameData, setSameData] = useState([]);
  const [error, setError] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState("");
  const launchResponse = useSelector((state) => state.LaunchReducer.launchResponse);
  const countryISO = localStorage.getItem("countryISO");
  const entityType = localStorage.getItem("entityType");
  const [viewMember, viewMembersState] = useViewMembersMutation();
  const [viewDirectors, viewDirectorState] = useViewDirectorsMutation();
  const [directorContainer, setDirectorContainer] = useState([]);
  const [viewMemberKYC] = useViewMembersKYCMutation();
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [documentContainer, setDocumentContainer] = useState([]);
  const { data, isLoading, isSuccess } = useGetAllEntitiesQuery(countryISO);
  const memberKYC = useGetMembersKYCQuery(launchResponse);
  const [deleteMemberKYC] = useDeleteMemberKYCMutation();

  let navigatedFrom = localStorage.getItem("navigatedFrom");

  useEffect(() => {
    const check = data?.find((entity) => entity.entityCode === launchResponse.registrationType);
    setRequiredDocuments(check?.entityRequiredDocuments);
  }, [data]);

  useEffect(() => {
    const mapping = directorContainer.map((director) => {
      return {
        name: director.memberName,
        code: director.memberCode,
        files: {
          government_id: "",
          proof_of_home_address: "",
          passport_photograph: "",
        },
      };
    });
    setDocumentContainer(mapping);
  }, [directorContainer]);

  const generatedLaunchCode = useSelector((store) => store.LaunchReducer.generatedLaunchCode);

  const handleNext = () => {
    const personCodes = documentContainer.map((el) => el.code);
    const uploadedDocuments = memberDocuments
      .map((el) => {
        if (personCodes.includes(el.memberCode)) return el;
        else return null;
      })
      .filter((el) => el !== null);

    const requiredDocsPerPerson = requiredDocuments.length;
    const numberOfPersons = documentContainer.length;
    const uploadedDocumentsNumber = uploadedDocuments.length;
    const totalNumberOfDocsRequired = requiredDocsPerPerson * numberOfPersons;

    if (uploadedDocumentsNumber === 0) {
      toast.error("All documents are required");
    } else if (totalNumberOfDocsRequired !== uploadedDocumentsNumber) {
      toast.error("All documents are required");
    } else {
      if (navigatedFrom) {
        navigate(navigatedFrom);
        localStorage.removeItem("navigatedFrom");
      } else {
        let beneficiaries = localStorage.getItem("beneficiaries");

        if (beneficiaries === "false") {
          navigate("/launch/review/business-info");
        } else {
          navigate("/launch/beneficiaries-kyc");
        }
      }
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleMerge = async () => {
    let memberInfo = await viewMember(launchResponse);
    let newMemberInfo = [...memberInfo.data.businessMembers];

    let directorInfo = await viewDirectors(launchResponse);
    let newDirectorInfo = [...directorInfo.data.businessDirectors];

    let newMerge = mergeInfo(newDirectorInfo, newMemberInfo);
    setDirectorContainer(newMerge);

    return newMerge;
  };

  useEffect(() => {
    handleMerge();
  }, []);

  const newHandleChange = async (fileName, rawFile, code) => {
    const uploadedFile = await convertToLink(rawFile[0]);

    const requiredAddMemberData = {
      launchCode: launchResponse.launchCode,
      memberCode: code,
      memberKYC: {
        documentType: fileName,
        documentLink: uploadedFile.url,
        fileName: rawFile[0].name,
        fileType: rawFile[0].type,
      },
    };

    console.log(requiredAddMemberData);
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

  store.dispatch(setDirectorDocs(documentContainer));

  const handleRemove = async (fileCode, memberCode) => {
    const requiredDeleteData = {
      launchCode: launchResponse.launchCode,
      memberCode: memberCode,
      documentCode: fileCode,
    };
    const response = await deleteMemberKYC(requiredDeleteData);
    memberKYC.refetch();
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

    store.dispatch(setCheckoutProgress({ total: 13, current: review ? 13 : 10 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Director KYC Documentation:"}
          HeaderParagraph={"Please attach the necessary documents for all directors"}
        />
        <LaunchPrimaryContainer>
          {viewDirectorState.isLoading && (
            <Loading height="50vh">
              <Puff stroke="#00A2D4" fill="white" />
            </Loading>
          )}
          <LaunchFormContainer style={{ paddingTop: "40px" }}>
            {documentContainer.map((director, index) => {
              const docs = handleDocuments(memberDocuments, director.code);
              return (
                <FileContainer key={index}>
                  <Name>{director.name}</Name>
                  <ContentWrapper>
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
                          memberCode={director.code}
                          deleteAction={handleRemove}
                        />
                      );
                    })}
                  </ContentWrapper>
                </FileContainer>
              );
            })}
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
      {/* <AppFeedback subProject="Directors KYC" /> */}
    </Container>
  );
};

export default DirectorKYC;

import React, { useEffect, useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Page, Container, Bottom, Body } from "../styled";
import { CheckoutController, CheckoutSection } from "containers";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { setBeneficiaryDocs, setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useAddBeneficialKYCMutation,
  useGetAllEntitiesQuery,
  useViewBeneficiariesMutation,
  useGetBeneficialsKYCQuery,
  useDeleteBeneficialKYCMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import { ContentWrapper, FileContainer, Loading, Name } from "./styles";
import { convertToLink } from "utils/LaunchHelper";
import { Puff } from "react-loading-icons";
import { Upload } from "components/File";

const BeneficiariesKYC = () => {
  const navigate = useNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const [storeType, setStoreType] = useState("");
  const [addBeneficialKYC] = useAddBeneficialKYCMutation();
  const [deleteBeneficialKYC] = useDeleteBeneficialKYCMutation();
  const launchResponse = useSelector((state) => state.LaunchReducer.launchResponse);
  const countryISO = localStorage.getItem("countryISO");
  const [viewBeneficiaries, viewBeneficiariesState] = useViewBeneficiariesMutation();
  const BeneficiaryKYC = useGetBeneficialsKYCQuery(launchResponse);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [beneficiaryContainer, setBeneficiaryContainer] = useState([]);
  const [documentContainer, setDocumentContainer] = useState([]);
  const { data, isLoading, isSuccess } = useGetAllEntitiesQuery(countryISO);
  let navigatedFrom = localStorage.getItem("navigatedFrom");
  useEffect(() => {
    const check = data?.find((entity) => entity.entityCode === launchResponse.registrationType);
    setRequiredDocuments(check?.entityRequiredDocuments);
  }, [data]);
  useEffect(() => {
    const mapping = beneficiaryContainer.map((beneficiary) => {
      return {
        name: beneficiary.beneficialOwnerName,
        code: beneficiary.beneficialOwnerCode,
        files: {
          government_id: "",
          proof_of_home_address: "",
          passport_photograph: "",
        },
      };
    });
    setDocumentContainer(mapping);
  }, [beneficiaryContainer]);

  const handleNext = () => {
    if (navigatedFrom) {
      navigate(navigatedFrom);
    } else {
      navigate("/launch/review/business-info");
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleFetch = async () => {
    let beneficiaryInfo = await viewBeneficiaries(launchResponse);
    let newBeneficiaryInfo = [...beneficiaryInfo.data.businessBeneficialOwners];
    setBeneficiaryContainer(newBeneficiaryInfo);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const newHandleChange = async (uploadedFile, fileName, rawFile, beneficiary) => {
    const requiredAddMemberData = {
      launchCode: launchResponse.launchCode,
      beneficialOwnerCode: beneficiary,
      beneficialOwnerKYC: {
        documentType: fileName,
        documentLink: uploadedFile.url,
        fileName: rawFile.name,
        fileType: rawFile.type,
      },
    };

    const response = await addBeneficialKYC(requiredAddMemberData);
    BeneficiaryKYC.refetch();
    const documentCode = response.data.beneficialOwnersKYC.slice(-1)[0].documentCode;
    if (response.data) {
      toast.success("Document uploaded successfully");
      setIsChanged(!isChanged);
      // handleShareHolderCheck();
    } else if (response.error) {
      toast.error(response.error?.data.message);
    }

    return documentCode || "";
  };

  const functionToPrintObject = (componentKey) => {
    documentContainer.forEach((list) => {
      if (Object.keys(list.files).includes(componentKey) === true) {
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    documentContainer.forEach((item) => {
      Object.keys(item.files).forEach((key) => {
        setStoreType(key);
      });
    });
  }, [documentContainer]);
  store.dispatch(setBeneficiaryDocs(documentContainer));

  const handleRemove = async (fileCode, memberCode) => {
    const requiredDeleteData = {
      launchCode: launchResponse.launchCode,
      beneficialOwnerCode: memberCode,
      documentCode: fileCode,
    };
    const response = await deleteBeneficialKYC(requiredDeleteData);
    if (response.data) {
      toast.success("Document deleted successfully");
    } else if (response.error) {
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
          .filter((el) => el.documentType === key && el.beneficialOwnerCode === code)
          .slice(-1)[0];
      });

      return object;
    }
    return {};
  };

  const beneficiaryDocuments = BeneficiaryKYC?.data?.beneficialOwnersKYC || [];

  // Set the progress of the application
  useEffect(() => {
    let review = localStorage.getItem("navigatedFrom");

    store.dispatch(setCheckoutProgress({ total: 13, current: review ? 13 : 11 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Beneficiaries KYC Documentation:"}
          HeaderParagraph={"Please attach the necessary documents for all beneficiaries"}
        />
        <LaunchPrimaryContainer>
          {viewBeneficiariesState.isLoading && (
            <Loading height="50vh">
              <Puff stroke="#00A2D4" fill="white" />
            </Loading>
          )}
          <LaunchFormContainer>
            {documentContainer.map((beneficiary, index) => {
              const docs = handleDocuments(beneficiaryDocuments, beneficiary.code);
              return (
                <FileContainer key={index}>
                  <Name>{beneficiary.name}</Name>
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
                          memberCode={beneficiary.code}
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
      {/* <AppFeedback subProject="Beneficiary KYC" />s */}
    </Container>
  );
};

export default BeneficiariesKYC;

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
  useViewBeneficiariesMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import { ContentWrapper, FileContainer, Loading, Name } from "./styles";
import FileUpload from "components/FileUpload";
import { convertToLink, isValidFileUploaded } from "utils/LaunchHelper";
import { Puff } from "react-loading-icons";
import AppFeedback from "components/AppFeedback";
import KYCFileUpload from "components/FileUpload/KYCFileUpload";

const BeneficiariesKYC = () => {
  const navigate = useNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [storeType, setStoreType] = useState("");
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [error, setError] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState("");
  const [addBeneficialKYC] = useAddBeneficialKYCMutation();
  const [documentCode, setDocumentCode] = useState("");

  const launchResponse = useSelector(
    (state) => state.LaunchReducer.launchResponse
  );
  const [viewBeneficiaries, viewBeneficiariesState] =
    useViewBeneficiariesMutation();
  const [beneficiaryContainer, setBeneficiaryContainer] = useState([]);
  const [documentContainer, setDocumentContainer] = useState([]);

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

  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );

  const handleNext = () => {
    navigate("/launch/review");
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

  const handleChange = async (files, beneficiary, type) => {
    // const uploadedFile = e.target.files[0];
    // setUploadedFileDetails(uploadedFile);
    // setFileName(uploadedFile.name);
    // setType(uploadedFile.type);
    // setSize(uploadedFile.size);

    // let fName = e.target.name;
    // let value = e.target.value;

    // setDocumentContainer((prev) => {
    //   const updatedState = [...prev];

    //   const index = updatedState.findIndex((el) => el.code === beneficiary);

    //   updatedState[index] = {
    //     ...updatedState[index],
    //     files: {
    //       ...updatedState[index].files,
    //       [type]: files[0].name,
    //     },
    //   };
    //   return updatedState;
    // });

    // if (!isValidFileUploaded(uploadedFile)) {
    //   toast.error("Only PDFs and JPEGs are supported");
    // } else if (size > 3000000) {
    //   toast.error("File is too large");
    // } else {
    //   toast.success("Valid Document");

    const res = await convertToLink(files[0]);

    const formatType = type.split("_").join(" ");
    const requiredBeneficialOwnerKYCData = {
      launchCode: launchResponse.launchCode,
      beneficialOwnerCode: beneficiary,
      beneficialOwnerKYC: {
        documentType: formatType,
        documentLink: res.url,
        fileName: files[0].name,
        fileType: files[0].type,
      },
    };

    const beneficialResult = await addBeneficialKYC(
      requiredBeneficialOwnerKYCData
    );
    if (beneficialResult.data) {
      let returnedArray = beneficialResult.data.beneficialOwnersKYC;
      let lastElememt = returnedArray[returnedArray.length - 1];

      toast.success("Document uploaded successfully");
      setIsChanged(!isChanged);

      setDocumentContainer((prev) => {
        const updatedState = [...prev];

        const index = updatedState.findIndex((el) => el.code === beneficiary);

        updatedState[index] = {
          ...updatedState[index],
          files: {
            ...updatedState[index].files,
            [type]: files[0].name,
          },
        };
        return updatedState;
      });
    } else if (beneficialResult.error) {
      toast.error(beneficialResult.error?.data.message);
    }
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

  const handleRemove = (beneficiary, type) => {
    // if (type === storeType) {
    //   // let generatedDocumentType
    //   // const requiredDeleteData = {
    //   //   launchCode: generatedLaunchCode,
    //   //   memberCode: shareholder,
    //   //   documentCode: generatedDocumentType,
    //   // };
    //   // console.log("delete data to be", requiredDeleteData);
    //   // const response = await deleteMemberKYC(requiredDeleteData);
    //   // console.log(response);
    //   // if (response.data) {
    //   //   toast.success("Document deleted successfully");
    //   // } else if (response.error) {
    //   //   console.log(response.error?.data.message);
    //   //   toast.error(response.error?.data.message);
    //   // }
    // }
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 11 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Beneficiaries KYC Documentation:"}
          HeaderParagraph={
            "Please attach the necessary documents for all beneficiaries"
          }
        />
        <LaunchPrimaryContainer>
          {viewBeneficiariesState.isLoading && (
            <Loading height="50vh">
              <Puff stroke="#00A2D4" fill="white" />
            </Loading>
          )}
          <LaunchFormContainer>
            {documentContainer.map((beneficiary, index) => (
              <FileContainer key={index}>
                <Name>{beneficiary.name}</Name>
                <ContentWrapper>
                  <KYCFileUpload
                    isChanged={isChanged}
                    documentComponentType={"registration document"}
                    TopText={"Registration Document"}
                    beneficiaryCode={beneficiary.code}
                    onDrop={(files) =>
                      handleChange(
                        files,
                        beneficiary.code,
                        "registration_document"
                      )
                    }
                    handleRemove={() => handleRemove("registration document")}
                    BottomText={"Please provide your Registration Document"}
                  />

                  <KYCFileUpload
                    isChanged={isChanged}
                    documentComponentType={"representative nin"}
                    TopText={"Representative NIN"}
                    beneficiaryCode={beneficiary.code}
                    onDrop={(files) =>
                      handleChange(
                        files,
                        beneficiary.code,
                        "representative_nin"
                      )
                    }
                    handleRemove={() => handleRemove("representative nin")}
                    BottomText={"National Identification Number"}
                  />

                  <KYCFileUpload
                    isChanged={isChanged}
                    documentComponentType={"beneficiary signature"}
                    TopText={"Signature"}
                    beneficiaryCode={beneficiary.code}
                    onDrop={(files) =>
                      handleChange(
                        files,
                        beneficiary.code,
                        "beneficiary_signature"
                      )
                    }
                    handleRemove={() => handleRemove("beneficiary signature")}
                    BottomText={"Kindly ensure image is not larger than 3MB"}
                  />

                  {/* <FileUpload
                    TopText={"Government Issued ID"}
                    name="government"
                    onChange={(e) => handleChange(e, beneficiary.code)}
                    fileName={fileName}
                    type={type}
                    handleRemove={handleRemove}
                    errorMsg={error}
                    BottomText={
                      "Driver’s Licence, National ID Card, Voters Card or International Passport"
                    }
                  />

                  <FileUpload
                    TopText={"Proof of Home Address"}
                    name="proof"
                    onChange={(e) => handleChange(e, beneficiary.code)}
                    fileName={fileName}
                    type={type}
                    handleRemove={handleRemove}
                    errorMsg={error}
                    BottomText={
                      "Utility Bill, Water Corporation Bill or a Rent Invoice"
                    }
                  />

                  <FileUpload
                    TopText={"Passport Photograph"}
                    name="passport"
                    onChange={(e) => handleChange(e, beneficiary.code)}
                    fileName={fileName}
                    type={type}
                    handleRemove={handleRemove}
                    errorMsg={error}
                    BottomText={"Kindly ensure image is not larger than 3MB"}
                  /> */}
                </ContentWrapper>
              </FileContainer>
            ))}
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

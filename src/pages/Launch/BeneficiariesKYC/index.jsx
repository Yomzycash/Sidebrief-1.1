import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Page, Container, Bottom, Body } from "../styled";
import {
  CheckoutController,
  CheckoutSection,
  CheckoutInfoKYC,
} from "containers";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { setBeneficiaryDocs, setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useAddBeneficialKYCMutation,
  useAddMemberKYCMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import { ContentWrapper, FileContainer, Name } from "./styles";
import FileUpload from "components/FileUpload";
import { convertToLink } from "utils/convertToUrl";

const BeneficiariesKYC = () => {
  //geting the information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { beneficiariesLaunchInfo } = LaunchApplicationInfo;
  console.log("bene", beneficiariesLaunchInfo[0].beneficialOwnerCode);
  let requiredOwnerCode = beneficiariesLaunchInfo[0].beneficialOwnerCode;
  console.log(requiredOwnerCode);

  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [error, setError] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState("");
  const [addBeneficialKYC] = useAddBeneficialKYCMutation();

  const [documentContainer, setDocumentContainer] = useState(
    beneficiariesLaunchInfo.map((beneficiary) => {
      return {
        name: beneficiary.beneficialOwnerName,
        code: beneficiary.beneficialOwnerCode,
        files: {
          government: "",
          proof: "",
          passport: "",
        },
      };
    })
  );

  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );
  const generatedMemberCode = useSelector(
    (store) => store.LaunchReducer.generatedMemberCode
  );

  const generatedbeneficialOwnerCode = useSelector(
    (store) => store.LaunchReducer.generatedBeneficialOwnerCode
  );

  const handleNext = () => {
    navigate("/launch/review");
    store.dispatch(setCheckoutProgress({ total: 13, current: 11 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 10 })); // total- total pages and current - current page
  };

  const isValidFileUploaded = (file) => {
    const validExtensions = ["jpeg", "jpg", "pdf"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleChange = async (e, beneficiary) => {
    console.log("value of the component is", e.target.name);

    const uploadedFile = e.target.files[0];
    setUploadedFileDetails(uploadedFile);
    setFileName(uploadedFile.name);
    setType(uploadedFile.type);
    setSize(uploadedFile.size);

    let fName = e.target.name;
    let value = e.target.value;

    setDocumentContainer((prev) => {
      const updatedState = [...prev];

      const index = updatedState.findIndex((el) => el.code === beneficiary);

      updatedState[index] = {
        ...updatedState[index],
        files: {
          ...updatedState[index].files,
          [fName]: value,
        },
      };
      return updatedState;
    });

    if (!isValidFileUploaded(uploadedFile)) {
      toast.error("Only PDFs and JPEGs are supported");
    } else if (size > 3000000) {
      toast.error("File is too large");
    } else {
      toast.success("Valid Document");
      const res = await convertToLink(e.target.files[0]);
      console.log(res);
      console.log(res.url);

      const requiredBeneficialOwnerKYCData = {
        launchCode: generatedLaunchCode,
        beneficialOwnerCode: requiredOwnerCode,
        beneficialOwnerKYC: {
          documentType: uploadedFile.type,
          documentLink: res.url,
        },
      };

      console.log("input data to db", requiredBeneficialOwnerKYCData);
      const beneficialResult = await addBeneficialKYC(
        requiredBeneficialOwnerKYCData
      );
      console.log(beneficialResult);
      if (beneficialResult.data) {
        console.log("successssssssssssssss");
        toast.success("Document uploaded successfully");
      } else if (beneficialResult.error) {
        console.log(beneficialResult.error?.data.message);
        toast.error(beneficialResult.error?.data.message);
      }
    }
  };

  console.log(documentContainer);
  store.dispatch(setBeneficiaryDocs(documentContainer));

  const handleRemove = () => {
    setFileName("");
    setUploadedFileDetails({});
  };

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Beneficiaries KYC Documentation:"}
          HeaderParagraph={
            "Please attach the necessary documents for all beneficials"
          }
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {documentContainer.map((beneficiary, index) => (
              <FileContainer key={index}>
                <Name>{beneficiary.name}</Name>
                <ContentWrapper>
                  <FileUpload
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
                  />
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
    </Container>
  );
};

export default BeneficiariesKYC;

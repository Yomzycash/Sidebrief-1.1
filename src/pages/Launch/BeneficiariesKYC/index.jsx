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
import { setCheckoutProgress } from "redux/Slices";
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
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [error, setError] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState("");

  const [addBeneficialKYC] = useAddBeneficialKYCMutation();
  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );
  const generatedMemberCode = useSelector(
    (store) => store.LaunchReducer.generatedMemberCode
  );

  const generatedbeneficialOwnerCode = useSelector(
    (store) => store.LaunchReducer.generatedBeneficialOwnerCode
  );

  //geting the information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { beneficiariesLaunchInfo } = LaunchApplicationInfo;
  console.log("bene", beneficiariesLaunchInfo[0].beneficialOwnerCode);
  // let requiredOwnerCode = beneficiariesLaunchInfo[0].beneficialOwnerCode;
  // console.log(requiredOwnerCode);

  const handleNext = () => {
    if (fileName === "") {
      setError("Please upload a file");
    } else if (size > 2000000) {
      setError("File is too large");
    } else if (type !== "application/pdf") {
      setError("Only PDFs, JPEGs and PNGs are supported");
    } else {
      navigate("/launch/review");
    }

    store.dispatch(setCheckoutProgress({ total: 13, current: 11 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 10 })); // total- total pages and current - current page
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      //Make new FileReader
      let fileReader = new FileReader();
      // Convert the file to base64 text
      fileReader.readAsDataURL(file);
      // on reader load something
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      // if error occurs
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setUploadedFileDetails(uploadedFile);
    setFileName(uploadedFile.name);
    setType(uploadedFile.type);
    setSize(uploadedFile.size);
    const res = await convertToLink(e.target.files[0]);
    console.log(res);
    console.log(res.url);

    //   // const requiredAddMemberData = {
    //   //   launchCode: generatedLaunchCode,
    //   //   memberCode: requiredMemberCode,
    //   //   memberKYC: {
    //   //     documentType: documentType,
    //   //     documentLink: fileUploadedLink,
    //   //   },
    //   // };

    //   const requiredBeneficialOwnerKYCData = {
    //     launchCode: generatedLaunchCode,
    //     beneficialOwnerCode: requiredOwnerCode,
    //     beneficialOwnerKYC: {
    // documentType: uploadedFile.type,
    // documentLink: res.url,
    //     },
    //   };

    //   const beneficialResult = await addBeneficialKYC(
    //     requiredBeneficialOwnerKYCData
    //   );
    //   console.log(beneficialResult);

    //   console.log(requiredBeneficialOwnerKYCData);
    //   // const response = await addMemberKYC(requiredAddMemberData);
    //   // console.log(response);
    //   // //   // if (response.data) {
    //   // //   // } else

    //   // if (response.error) {
    //   //   console.log(response.error?.data.message);
    //   //   toast.error(response.error?.data.message);
    //   // }
  };

  const handleRemove = () => {
    setFileName("");
    setUploadedFileDetails({});
  };

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Benefial KYC Documentation:"}
          HeaderParagraph={
            "Please attach the necessary documents for all beneficials"
          }
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {beneficiariesLaunchInfo.map((beneficiary, index) => (
              <FileContainer>
                <Name>{beneficiary.beneficialOwnerName}</Name>
                <ContentWrapper>
                  <FileUpload
                    TopText={"Government Issued ID"}
                    name="file1"
                    onChange={handleChange}
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
                    name="file2"
                    onChange={handleChange}
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
                    name="file3"
                    onChange={handleChange}
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

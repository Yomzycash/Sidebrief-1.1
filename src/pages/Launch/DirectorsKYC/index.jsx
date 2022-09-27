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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddMemberKYCMutation } from "services/launchService";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fileFormSchema } from "utils/config";
import { ContentWrapper, FileContainer, Name } from "./styles";
import FileUpload from "components/FileUpload";

const DirectorKYC = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [fileUploadedLink, setFileUploadedLink] = useState("");
  const [pdf, setPdf] = useState("");

  const handleRemove = () => {
    setFileName("");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(fileFormSchema),
  });

  const [addMemberKYC] = useAddMemberKYCMutation();
  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );
  const generatedMemberCode = useSelector(
    (store) => store.LaunchReducer.generatedMemberCode
  );
  const handleNext = () => {
    navigate("/launch/beneficiaries-kyc");
    store.dispatch(setCheckoutProgress({ total: 13, current: 10 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 9 })); // total- total pages and current - current page
  };

  const SubmitForm = async (data) => {
    console.log(data);

    const requiredAddMemberData = {
      launchCode: generatedLaunchCode,
      memberCode: generatedMemberCode,

      memberKYC: {
        documentType: data.country,
        documentLink: data.state,
      },
    };

    const response = await addMemberKYC(requiredAddMemberData);
    console.log(response);

    if (response.data) {
      handleNext();
    } else if (response.error) {
      console.log(response.error?.data.message);
      toast.error(response.error?.data.message);
    }
  };

  const getBase64 = (file) => {
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
    let filePath = [...e.target.value];
    let valueIndex = e.target.value.lastIndexOf("\\");
    let fileNameArray = filePath.slice(valueIndex + 1);
    let fileName = fileNameArray.join("");
    setFileName(fileName);
    console.log(fileName);

    const uploadedFile = e.target.files[0];
    console.log(uploadedFile.name);
    const base64 = await getBase64(uploadedFile);
    setPdf(uploadedFile.name);
    setValue(uploadedFile.name);
    console.log(base64);
    setFileUploadedLink(base64);
  };

  return (
    <Container>
      <HeaderCheckout />
      <Body onSubmit={handleSubmit(SubmitForm)}>
        <CheckoutSection
          title={"Director KYC Documentation:"}
          HeaderParagraph={
            "Please attach the necessary documents for all shareholders"
          }
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            <FileContainer>
              <Name>Mrs Grace Nwankwo</Name>
              <ContentWrapper>
                <FileUpload
                  TopText={"Government Issued ID"}
                  errorMsg={errors.gov?.message}
                  name={"gov"}
                  register={register}
                  handleRemove={handleRemove}
                  value={pdf}
                  fileName={fileName}
                  handleChange={handleChange}
                  BottomText={
                    "Driver’s Licence, National ID Card, Voters Card or International Passport"
                  }
                />

                <FileUpload
                  TopText={"Proof of Home Address"}
                  errorMsg={errors.bil?.message}
                  name={"bil"}
                  register={register}
                  handleRemove={handleRemove}
                  value={pdf}
                  fileName={fileName}
                  handleChange={handleChange}
                  BottomText={
                    "Utility Bill, Water Corporation Bill or a Rent Invoice"
                  }
                />

                <FileUpload
                  TopText={"Passport Photograph"}
                  errorMsg={errors.file?.message}
                  name={"file"}
                  register={register}
                  handleRemove={handleRemove}
                  value={pdf}
                  handleChange={handleChange}
                  fileName={fileName}
                  BottomText={"Kindly ensure image is not larger than 3MB"}
                />
              </ContentWrapper>
            </FileContainer>
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

export default DirectorKYC;

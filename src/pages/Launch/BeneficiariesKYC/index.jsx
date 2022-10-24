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
          government: {},
          proof: {},
          passport: {},
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
    console.log("value of the component is", files);
    console.log("shareholder is", beneficiary);
    console.log("component name", type);

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
    console.log("conversion", res.url);

    const requiredBeneficialOwnerKYCData = {
      launchCode: generatedLaunchCode,
      beneficialOwnerCode: beneficiary,
      beneficialOwnerKYC: {
        documentType: files[0].type,
        documentLink: res.url,
      },
    };

    console.log("input data to db", requiredBeneficialOwnerKYCData);
    const beneficialResult = await addBeneficialKYC(
      requiredBeneficialOwnerKYCData
    );
    console.log(beneficialResult);
    if (beneficialResult.data) {
      console.log(
        "successssssssssssssss",
        beneficialResult.data.beneficialOwnersKYC
      );
      let returnedArray = beneficialResult.data.beneficialOwnersKYC;
      let lastElememt = returnedArray[returnedArray.length - 1];
      console.log("last member added is", lastElememt);

      toast.success("Document uploaded successfully");

      setDocumentContainer((prev) => {
        const updatedState = [...prev];

        const index = updatedState.findIndex((el) => el.code === beneficiary);

        updatedState[index] = {
          ...updatedState[index],
          files: {
            ...updatedState[index].files,
            [type]: lastElememt,
          },
        };
        return updatedState;
      });
    } else if (beneficialResult.error) {
      console.log(beneficialResult.error?.data.message);
      toast.error(beneficialResult.error?.data.message);
    }
  };

  console.log("yyyyyyy", documentContainer);

  const functionToPrintObject = (componentKey) => {
    console.log(componentKey);
    documentContainer.forEach((list) => {
      if (Object.keys(list.files).includes(componentKey) === true) {
        console.log(list.files.proof);
      } else {
        return;
      }
    });
  };

  console.log("favour", functionToPrintObject("government"));

  useEffect(() => {
    documentContainer.forEach((item) => {
      console.log("tee", item.files);
      Object.keys(item.files).forEach((key) => {
        console.log("mylist", key);
        // console.log(item.files[index]);
        setStoreType(key);
      });
    });
  }, [documentContainer]);
  store.dispatch(setBeneficiaryDocs(documentContainer));

  console.log(beneficiaryContainer);

  console.log("get type", storeType);
  const handleRemove = (beneficiary, type) => {
    console.log("beneficiary delete", beneficiary);
    console.log("type fttt", type);
    // console.log("get type", storeType);
    // if (type === storeType) {
    //   // let generatedDocumentType
    //   console.log("freeeeee", documentContainer.files.type.documentCode);
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
                    TopText={"Government Issued ID"}
                    onDrop={(files) =>
                      handleChange(files, beneficiary.code, "government")
                    }
                    handleRemove={(files) =>
                      handleRemove(beneficiary.code, "government")
                    }
                    BottomText={
                      "Utility Bill, Water Corporation Bill or a Rent Invoice"
                    }
                  />

                  <KYCFileUpload
                    TopText={"Proof of Home Address"}
                    onDrop={(files) =>
                      handleChange(files, beneficiary.code, "proof")
                    }
                    handleRemove={handleRemove(beneficiary.code, "proof")}
                    BottomText={
                      "Driver’s Licence, National ID Card, Voters Card or International Passport"
                    }
                  />

                  <KYCFileUpload
                    TopText={"Passport Photograph"}
                    onDrop={(files) =>
                      handleChange(files, beneficiary.code, "passport")
                    }
                    handleRemove={handleRemove(beneficiary.code, "passport")}
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
      <AppFeedback subProject="Beneficiary KYC" />s
    </Container>
  );
};

export default BeneficiariesKYC;

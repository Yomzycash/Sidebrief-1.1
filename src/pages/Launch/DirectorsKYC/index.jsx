import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Container, Bottom, Body } from "../styled";
import { CheckoutController, CheckoutSection } from "containers";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddMemberKYCMutation } from "services/launchService";
import { useSelector } from "react-redux";
import { ContentWrapper, FileContainer, Name } from "./styles";
import FileUpload from "components/FileUpload";
import { convertToLink } from "utils/convertToUrl";

const DirectorKYC = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [error, setError] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState("");
  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );

  //geting the information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { directorsLaunchInfo } = LaunchApplicationInfo;
  console.log(directorsLaunchInfo[0].memberCode);
  let requiredMemberCode = directorsLaunchInfo[0].memberCode;
  console.log(requiredMemberCode);

  const handleNext = () => {
    navigate("/launch/beneficiaries-kyc");
    store.dispatch(setCheckoutProgress({ total: 13, current: 10 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 9 })); // total- total pages and current - current page
  };

  const isValidFileUploaded = (file) => {
    const validExtensions = ["jpeg", "jpg", "pdf"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setUploadedFileDetails(uploadedFile);
    setFileName(uploadedFile.name);
    setType(uploadedFile.type);
    setSize(uploadedFile.size);

    if (!isValidFileUploaded(uploadedFile)) {
      toast.error("Only PDFs and JPEGs are supported");
    } else if (size > 3000000) {
      toast.error("File is too large");
    } else {
      toast.success("Valid Document");
      const res = await convertToLink(e.target.files[0]);
      console.log(res);
      console.log(res.url);

      const requiredAddMemberData = {
        launchCode: generatedLaunchCode,
        memberCode: requiredMemberCode,
        memberKYC: {
          documentType: uploadedFile.type,
          documentLink: res.url,
        },
      };
      console.log(requiredAddMemberData);
      const response = await addMemberKYC(requiredAddMemberData);
      console.log(response);
      if (response.data) {
        toast.success("Document uploaded successfully");
      } else if (response.error) {
        console.log(response.error?.data.message);
        toast.error(response.error?.data.message);
      }
    }
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
          title={"Director KYC Documentation:"}
          HeaderParagraph={
            "Please attach the necessary documents for all directors"
          }
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {directorsLaunchInfo.map((director, index) => (
              <FileContainer>
                <Name>{director.memberName}</Name>
                <ContentWrapper>
                  <FileUpload
                    TopText={"Government Issued ID"}
                    name="government"
                    onChange={handleChange}
                    // fileName={fileName}
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
                    onChange={handleChange}
                    // fileName={fileName}
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
                    onChange={handleChange}
                    // fileName={fileName}
                    // type={type}
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

export default DirectorKYC;

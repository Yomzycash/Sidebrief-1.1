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
  useViewDirectorsMutation,
  useViewMembersMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
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

const DirectorKYC = () => {
  //geting the information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { directorsLaunchInfo } = LaunchApplicationInfo;
  console.log(directorsLaunchInfo[0]?.memberCode);
  let requiredMemberCode = directorsLaunchInfo[0]?.memberCode;
  console.log(requiredMemberCode);

  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [error, setError] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState("");
  const launchResponse = useSelector(
    (state) => state.LaunchReducer.launchResponse
  );
  const [viewMember, viewMembersState] = useViewMembersMutation();
  const [viewDirectors, viewDirectorState] = useViewDirectorsMutation();
  const [directorContainer, setDirectorContainer] = useState([]);

  const [documentContainer, setDocumentContainer] = useState([]);

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

  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );

  const handleNext = () => {
    navigate("/launch/beneficiaries-kyc");
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
    console.log("test", newMerge);
    setDirectorContainer(newMerge);

    return newMerge;
  };

  useEffect(() => {
    handleMerge();
  }, []);

  const handleChange = async (files, director, type) => {
    console.log("value of the component is", files);
    console.log("director is", director);
    console.log("component name", type);

    // const uploadedFile = e.target.files[0];
    // setUploadedFileDetails(uploadedFile);
    // setFileName(uploadedFile.name);
    // setType(uploadedFile.type);
    // setSize(uploadedFile.size);

    // let fName = e.target.name;
    // let value = e.target.value;

    setDocumentContainer((prev) => {
      const updatedState = [...prev];

      const index = updatedState.findIndex((el) => el.code === director);

      updatedState[index] = {
        ...updatedState[index],
        files: {
          ...updatedState[index].files,
          [type]: files[0].name,
        },
      };

      return updatedState;
    });

    // if (!isValidFileUploaded(uploadedFile)) {
    //   toast.error("Only PDFs, PNGs and JPEGs are supported");
    // } else if (uploadedFile.size > 3000000) {
    //   toast.error("File is too large");
    // } else {
    //   toast.success("Valid Document");
    const res = await convertToLink(files[0]);
    console.log("conversion", res.url);

    const formatType = type.split("_").join(" ");
    const requiredAddMemberData = {
      launchCode: generatedLaunchCode,
      memberCode: director,
      memberKYC: {
        documentType: formatType,
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
  };

  console.log(documentContainer);
  store.dispatch(setDirectorDocs(documentContainer));

  const handleRemove = (director) => {
    console.log("director delete", director);
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
    store.dispatch(setCheckoutProgress({ total: 13, current: 10 })); // total- total pages and current - current page
  }, []);

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
          {viewDirectorState.isLoading && (
            <Loading height="50vh">
              <Puff stroke="#00A2D4" fill="white" />
            </Loading>
          )}
          <LaunchFormContainer style={{ paddingTop: "40px" }}>
            {documentContainer.map((director, index) => (
              <FileContainer key={index}>
                <Name>{director.name}</Name>
                <ContentWrapper>
                  <KYCFileUpload
                    TopText={"Government Issued ID"}
                    onDrop={(files) =>
                      handleChange(files, director.code, "government_id")
                    }
                    handleRemove={handleRemove(director.code)}
                    BottomText={
                      "Utility Bill, Water Corporation Bill or a Rent Invoice"
                    }
                  />

                  <KYCFileUpload
                    TopText={"Proof of Home Address"}
                    onDrop={(files) =>
                      handleChange(
                        files,
                        director.code,
                        "proof_of_home_address"
                      )
                    }
                    handleRemove={handleRemove(director.code)}
                    BottomText={
                      "Driver’s Licence, National ID Card, Voters Card or International Passport"
                    }
                  />

                  <KYCFileUpload
                    TopText={"Passport Photograph"}
                    onDrop={(files) =>
                      handleChange(files, director.code, "passport_photograph")
                    }
                    handleRemove={handleRemove(director.code)}
                    BottomText={"Kindly ensure image is not larger than 3MB"}
                  />

                  {/* <FileUpload
                    TopText={"Government Issued ID"}
                    name="government"
                    onChange={(e) => handleChange(e, director.code)}
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
                    onChange={(e) => handleChange(e, director.code)}
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
                    onChange={(e) => handleChange(e, director.code)}
                    // fileName={fileName}
                    // type={type}
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
      <AppFeedback subProject="Directors KYC" />
    </Container>
  );
};

export default DirectorKYC;

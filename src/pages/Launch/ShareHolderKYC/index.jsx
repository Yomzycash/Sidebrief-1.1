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
  useViewMembersMutation,
  useViewShareholdersMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
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

const ShareHolderKYC = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [error, setError] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState("");
  const [viewMember, viewMembersState] = useViewMembersMutation();
  const [deleteMemberKYC] = useDeleteMemberKYCMutation();
  const [viewShareholders, viewShareholderState] =
    useViewShareholdersMutation();
  const [shareholderContainer, setShareholder] = useState([]);

  const launchResponse = useSelector(
    (state) => state.LaunchReducer.launchResponse
  );
  const [documentContainer, setDocumentContainer] = useState([]);
  useEffect(() => {
    const mapping = shareholderContainer.map((shareholder) => {
      return {
        name: shareholder.memberName,
        code: shareholder.memberCode,
        files: {
          government: "",
          proof: "",
          passport: "",
        },
      };
    });
    setDocumentContainer(mapping);
  }, [shareholderContainer]);

  const handleMerge = async () => {
    let memberInfo = await viewMember(launchResponse);
    let newMemberInfo = [...memberInfo.data.businessMembers];

    let shareholderInfo = await viewShareholders(launchResponse);
    let newShareHolderInfo = [...shareholderInfo.data.businessShareholders];

    let newMerge = mergeInfo(newShareHolderInfo, newMemberInfo);
    setShareholder(newMerge);

    return newMerge;
  };

  useEffect(() => {
    handleMerge();
  }, []);

  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );

  const handlePrev = () => {
    navigate(-1);
  };

  const handleChange = async (files, shareholder, type) => {
    console.log("value of the component is", files);
    console.log("shareholder is", shareholder);
    console.log("component name", type);
    // const uploadedFile = e.target.files[0];
    // setUploadedFileDetails(uploadedFile);
    // setFileName(uploadedFile.name);
    // setType(uploadedFile.type);
    // setSize(uploadedFile.size);

    // // let fName = e.target.name;
    // // let value = e.target.value;

    setDocumentContainer((prev) => {
      const updatedState = [...prev];

      const index = updatedState.findIndex((el) => el.code === shareholder);

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

    const requiredAddMemberData = {
      launchCode: generatedLaunchCode,
      memberCode: shareholder,
      memberKYC: {
        documentType: files[0].type,
        documentLink: res.url,
      },
    };
    console.log("data to db", requiredAddMemberData);
    const response = await addMemberKYC(requiredAddMemberData);
    console.log(response);
    if (response.data) {
      console.log(response.data);
      toast.success("Document uploaded successfully");
    } else if (response.error) {
      console.log(response.error?.data.message);
      toast.error(response.error?.data.message);
    }
    // }
  };

  console.log(documentContainer);
  store.dispatch(setShareholderDocs(documentContainer));

  const handleNext = () => {
    navigate("/launch/directors-kyc");
  };

  const handleRemove = (shareholder) => {
    console.log("shareholder delete", shareholder);
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
    store.dispatch(setCheckoutProgress({ total: 13, current: 8.5 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Shareholder KYC Documentation:"}
          HeaderParagraph={
            "Please attach the necessary documents for all shareholders"
          }
        />
        <LaunchPrimaryContainer>
          {viewShareholderState.isLoading ||
            (viewMembersState.isLoading && (
              <Loading height="50vh">
                <Puff stroke="#00A2D4" fill="white" />
              </Loading>
            ))}
          <LaunchFormContainer>
            {documentContainer.map((shareholder, index) => (
              <FileContainer key={index}>
                <Name>{shareholder.name}</Name>
                <ContentWrapper key={index}>
                  <KYCFileUpload
                    TopText={"Government Issued ID"}
                    onDrop={(files) =>
                      handleChange(files, shareholder.code, "government")
                    }
                    handleRemove={handleRemove(shareholder.code)}
                    BottomText={
                      "Utility Bill, Water Corporation Bill or a Rent Invoice"
                    }
                  />

                  <KYCFileUpload
                    TopText={"Proof of Home Address"}
                    onDrop={(files) =>
                      handleChange(files, shareholder.code, "proof")
                    }
                    handleRemove={handleRemove(shareholder.code)}
                    BottomText={
                      "Driver’s Licence, National ID Card, Voters Card or International Passport"
                    }
                  />

                  <KYCFileUpload
                    TopText={"Passport Photograph"}
                    onDrop={(files) =>
                      handleChange(files, shareholder.code, "passport")
                    }
                    handleRemove={handleRemove(shareholder.code)}
                    BottomText={"Kindly ensure image is not larger than 3MB"}
                  />

                  {/* <FileUpload
                    TopText={"Government Issued ID"}
                    name="government"
                    onChange={(e) => handleChange(e, shareholder.code)}
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
                    onChange={(e) => handleChange(e, shareholder.code)}
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
                    onChange={(e) => handleChange(e, shareholder.code)}
                    // type={type}
                    handleRemove={handleRemove}
                    errorMsg={error}
                    BottomText={"Kindly ensure image is not larger than 3MB"}
                  /> */}
                </ContentWrapper>
              </FileContainer>
            ))}

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
      <AppFeedback subProject="Shareholder KYC" />
    </Container>
  );
};

export default ShareHolderKYC;

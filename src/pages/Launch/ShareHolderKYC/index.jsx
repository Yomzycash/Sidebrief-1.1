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
  useViewMembersKYCMutation,
  useViewMembersMutation,
  useViewShareholdersMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ContentWrapper, FileContainer, Name } from "./styles";
import FileUpload from "components/FileUpload";
import { convertToLink } from "utils/convertToUrl";

const ShareHolderKYC = () => {
  //geting the information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { shareHoldersLaunchInfo } = LaunchApplicationInfo;
  console.log(shareHoldersLaunchInfo[0]?.memberCode);
  let requiredMemberCode = shareHoldersLaunchInfo[0]?.memberCode;
  console.log(requiredMemberCode);

  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [error, setError] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState("");
  const [viewMember] = useViewMembersMutation();
  const [viewShareholders] = useViewShareholdersMutation();
  const [viewMembersKYC] = useViewMembersKYCMutation();
  const [shareHolderCode, setShareholderCode] = useState();
  const [member, setMember] = useState();
  const [shareholder, setShareholder] = useState();

  const launchResponse = useSelector(
    (state) => state.LaunchReducer.launchResponse
  );

  // const handleShareholder = async () => {
  //   const shareholderInfo = await viewShareholders(launchResponse);
  //   let newShareHolderInfo = shareholderInfo.data.businessShareholders;
  //   console.log("testing2", newShareHolderInfo);
  //   setShareholder(newShareHolderInfo);

  //   // let newData = [];
  //   // newMemberInfo.forEach((item) => {
  //   //   if (newShareHolderInfo.includes(item.memberCode)) {
  //   //     newData.push(item);
  //   //     setShareholderCode(newData);
  //   //     return;
  //   //   }
  //   // });
  // };

  const handleMember = async () => {
    let container = [];
    const memberInfo = await viewMember(launchResponse);
    let newMemberInfo = memberInfo.data.businessMembers;
    console.log("member testing", newMemberInfo);

    const shareholderInfo = await viewShareholders(launchResponse);
    let newShareHolderInfo = shareholderInfo.data.businessShareholders;
    console.log("share testing2", newShareHolderInfo);

    setMember(newMemberInfo);

    newShareHolderInfo.forEach((item) => {
      setShareholderCode(item.memberCode);
    });

    newMemberInfo.forEach((item) => {
      if (newMemberInfo.memberCode === shareHolderCode) {
        container.push(item);
        return;
        console.log(item);
      }
    });

    console.log("containerss", container);
  };

  console.log("member testing codeeeeeee", shareHolderCode);
  // const handleCheck = () => {
  //   console.log("member testing effect....", member);
  //   console.log("shareholder testing effect....", shareholder.memberCode);
  // };
  // useEffect(() => {
  //   handleCheck();
  // }, [member, shareholder]);

  useEffect(() => {
    handleMember();
  }, []);

  // useEffect(() => {
  //   handleShareholder();
  // }, []);

  // console.log("member testing....", member);
  // console.log("shareholder testing....", shareholder);

  const [documentContainer, setDocumentContainer] = useState(
    shareHoldersLaunchInfo.map((shareholder) => {
      return {
        name: shareholder.memberName,
        code: shareholder.shareholdingCode,
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

  const handlePrev = () => {
    navigate(-1);
  };

  const isValidFileUploaded = (file) => {
    const validExtensions = ["jpeg", "jpg", "pdf"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  // const handleChange = async (e, shareholder) => {
  //   console.log("value of the component is", e.target.name);

  //   const uploadedFile = e.target.files[0];
  //   setUploadedFileDetails(uploadedFile);
  //   setFileName(uploadedFile.name);
  //   setType(uploadedFile.type);
  //   setSize(uploadedFile.size);

  //   let fName = e.target.name;
  //   let value = e.target.value;

  //   setDocumentContainer((prev) => {
  //     const updatedState = [...prev];

  //     const index = updatedState.findIndex((el) => el.code === shareholder);

  //     updatedState[index] = {
  //       ...updatedState[index],
  //       files: {
  //         ...updatedState[index].files,
  //         [fName]: value,
  //       },
  //     };

  //     return updatedState;
  //   });

  //   if (!isValidFileUploaded(uploadedFile)) {
  //     toast.error("Only PDFs, PNGs and JPEGs are supported");
  //   } else if (uploadedFile.size > 3000000) {
  //     toast.error("File is too large");
  //   } else {
  //     toast.success("Valid Document");
  //     const res = await convertToLink(e.target.files[0]);
  //     console.log(res);
  //     console.log(res.url);

  //     const requiredAddMemberData = {
  //       launchCode: generatedLaunchCode,
  //       memberCode: requiredMemberCode,
  //       memberKYC: {
  //         documentType: uploadedFile.type,
  //         documentLink: res.url,
  //       },
  //     };
  //     console.log("data to db", requiredAddMemberData);
  //     const response = await addMemberKYC(requiredAddMemberData);
  //     console.log(response);
  //     if (response.data) {
  //       toast.success("Document uploaded successfully");
  //     } else if (response.error) {
  //       console.log(response.error?.data.message);
  //       toast.error(response.error?.data.message);
  //     }
  //   }
  // };

  console.log(documentContainer);
  store.dispatch(setShareholderDocs(documentContainer));

  const handleNext = () => {
    navigate("/launch/directors-kyc");
  };

  const handleRemove = () => {
    setFileName("");
    setUploadedFileDetails({});
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
          <LaunchFormContainer>
            {documentContainer.map((shareholder, index) => (
              <FileContainer key={index}>
                <Name>{shareholder.name}</Name>
                <ContentWrapper key={index}>
                  <FileUpload
                    TopText={"Government Issued ID"}
                    name="government"
                    // onChange={(e) => handleChange(e, shareholder.code)}
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
                    // onChange={(e) => handleChange(e, shareholder.code)}
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
                    // onChange={(e) => handleChange(e, shareholder.code)}
                    // type={type}
                    handleRemove={handleRemove}
                    errorMsg={error}
                    BottomText={"Kindly ensure image is not larger than 3MB"}
                  />
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
    </Container>
  );
};

export default ShareHolderKYC;

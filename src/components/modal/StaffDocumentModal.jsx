import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import TagInput from "components/input/TagInput";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import Modal1 from "layout/modal1";
import { useForm } from "react-hook-form";
import { StaffDocumentSchema } from "utils/config";
import { InputWithLabel } from "components/input";
import KYCFileUpload from "components/FileUpload/KYCFileUpload";
import { Upload } from "components/File";
import { useLocation } from "react-router-dom";
import { getValue } from "@testing-library/user-event/dist/utils";
const StaffDocumentModal = ({
  cardAction,
  setCardAction,
  open,
  setOpen,
  disableAll,
  documentInfo,
  title,
  handleDocumentDelete,
  deleteState,
  submitAction,
  loading,
}) => {
  const [disable, setDisable] = useState(disableAll);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(StaffDocumentSchema),
  });

  // update document details

  useEffect(() => {
    if (documentInfo && cardAction === "edit") {
      setValue("name", documentInfo?.documentName, {
        shouldValidate: true,
      });

      setValue("description", documentInfo?.documentDescription, {
        shouldValidate: true,
      });
    } else {
      setValue("name", "");
      setValue("description", "");
    }
    setDisable(disableAll);
  }, [documentInfo, cardAction]);

  const handleUpload = (uploadedFile, docType, realFile) => {
    const required = {
      launchCode: searchParams.get("launchCode"),
      documentDetails: {
        documentName: getValues('name'),
        documentDescription:  getValues('name'),
        documentUrl: uploadedFile,
      },
    };
  };

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={submitAction}
      cardAction={cardAction}
      setCardAction={setCardAction}
      title={title || "Add New Document"}
      open={open}
      setOpen={setOpen}
      disable={disable}
      setDisable={setDisable}
      loading={loading}
      handleDelete={() => handleDocumentDelete(documentInfo)}
      deleteState={deleteState}
    >
      <DetailedSection>
        <InputWithLabel
          label="Document Name"
          labelStyle="input-label"
          placeholder="Enter Document Name"
          type="text"
          name="name"
          inputClass="input-class"
          containerStyle="input-container-class"
          errorMessage={errors.name?.message}
          disable={disable}
          register={register}
        />
      </DetailedSection>

      <DetailedSection>
        <InputWithLabel
          label="Document Description"
          labelStyle="input-label"
          placeholder="Enter Document Description"
          type="text"
          name="description"
          inputClass="input-class"
          containerStyle="input-container-class"
          errorMessage={errors.description?.message}
          disable={disable}
          register={register}
        />
      </DetailedSection>

      <DetailedSection>
        <Upload docType="Upload Document" uploadAction={handleUpload} />
        {/* <KYCFileUpload
          TopText="Upload Document"
          BottomText="Kindly esnure image is not larger than 3MB"
                  errorMsg={errors.fileupload?.message}
                  //onDrop={(files) => handleChange(files, shareholder.code, document)}
        /> */}
        {/* <>
                  <FiUpload /> Drag & drop, or browse
                </> */}
      </DetailedSection>
    </Modal1>
  );
};

export default StaffDocumentModal;

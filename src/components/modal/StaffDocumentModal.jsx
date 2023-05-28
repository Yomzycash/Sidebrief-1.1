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
import {
  useAddUploadDocumentMutation,
  useDeleteUploadDocumentMutation,
  useUpdateUploadDocumentMutation,
} from "services/launchService";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";
import SimpleUpload from "components/File/SimpleUpload";
import { convertToLink } from "utils/LaunchHelper";

const StaffDocumentModal = ({
  cardAction,
  setCardAction,
  open,
  setOpen,
  disableAll,
  documentInfo,
  title,

  submitAction,
  loading,
}) => {
  const [disable, setDisable] = useState(disableAll);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [addDocuent, addState] = useAddUploadDocumentMutation();
  const [deleteDocument, deleteState] = useDeleteUploadDocumentMutation();
  const [updateDocument, updateState] = useUpdateUploadDocumentMutation();
  const [file, setFile] = useState({});

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    getValues,
    watch,
    unregister,
  } = useForm({
    resolver: yupResolver(StaffDocumentSchema),
  });

  // update document details
  console.log(documentInfo);

  useEffect(() => {
    if (documentInfo && cardAction === "edit") {
      setValue("name", documentInfo?.documentName, {
        shouldValidate: true,
      });

      setValue("description", documentInfo?.documentDescription, {
        shouldValidate: true,
      });

      setValue(
        "file",
        [
          {
            path: documentInfo?.documentUrl,
            name: documentInfo?.documentName,

            code: documentInfo?.documentCode,
          },
        ],
        {
          shouldValidate: true,
        }
      );
    } else {
      setValue("name", "");
      setValue("description", "");
      setValue("file", "");
    }
    setDisable(disableAll);
  }, [documentInfo, cardAction, setValue]);

  const handleDocumentDelete = async () => {
    let response = await deleteDocument({
      launchCode: searchParams.get("launchCode"),
      documentCode: documentInfo?.documentCode,
    });
    let data = response?.data;
    console.log(data);
    let error = response?.error;
    if (data) {
      toast.success("Document deleted successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    //refetch();
  };
  const handleUpdate = async () => {
    let response = await updateDocument({
      launchCode: searchParams.get("launchCode"),
      documentCode: documentInfo?.documentCode,
      documentDetails: {
        documentName: getValues("name"),
        documentDescription: getValues("description"),
        documentUrl: "",
      },
    });
    let data = response?.data;
    console.log(data);
    let error = response?.error;
    if (data) {
      toast.success("Document updated successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    //refetch();
  };
  const handleSubmission = async (formData) => {
    const realFile = formData?.file[0];

    const uploadedFile = await convertToLink(realFile);

    const required = {
      launchCode: searchParams.get("launchCode"),
      documentDetails: {
        documentName: getValues("name"),
        documentDescription: getValues("description"),
        documentUrl: uploadedFile.url,
      },
    };
    let response = await addDocuent(required);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Document added successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
  };

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={handleSubmission}
      cardAction={cardAction}
      setCardAction={setCardAction}
      title={title || "Add New Document"}
      open={open}
      setOpen={setOpen}
      disable={disable}
      setDisable={setDisable}
      loading={loading}
      handleDelete={handleDocumentDelete}
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
        <SimpleUpload
          name="file"
          register={register}
          unregister={unregister}
          watch={watch}
          setValue={setValue}
        />
      </DetailedSection>
    </Modal1>
  );
};

export default StaffDocumentModal;

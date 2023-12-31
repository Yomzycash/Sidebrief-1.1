import { useCallback, useState } from "react";
import {
  DocumentDownload,
  DocumentFrame,
  DocumentText /*,SmallText*/,
  Top,
  UploadWrapper,
  Preview,
  Delete,
} from "./styled";
import { ReactComponent as UploadIcon } from "asset/svg/Upload.svg";
import { ReactComponent as DocumentIcon } from "asset/svg/Document.svg";
import { convertToLink } from "utils/LaunchHelper";
import { useDropzone } from "react-dropzone";
import { SpinningCircles } from "react-loading-icons";
import { DeleteRedSvg } from "asset/svg";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Upload = ({
  docType,
  disable,
  uploadAction,
  deleteAction,
  oldFile,
  memberCode,
  containerStyle,
  reset,
}) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({ name: "", code: "" });
  const [setOld, setSetOld] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (
      setOld &&
      !(oldFile.name === "" || oldFile.name === undefined) &&
      !(oldFile.code === "" || oldFile.code === undefined)
    ) {
      setFile(oldFile);
    }
    if (reset) {
      setFile({
        name: "",
        code: "",
      });
    }
  }, [oldFile, setOld, reset]);

  const collectFile = useCallback(
    async (file) => {
      setUploading(true);
      const documentCode = !memberCode
        ? await uploadAction(docType, file)
        : await uploadAction(docType, file, memberCode);
      setFile({
        name: file[0].name,
        code: documentCode,
      });
      setSetOld(false);
      setUploading(false);
    },
    [uploadAction, docType, memberCode]
  );

  const nameLengthValidator = (file) => {
    if (file.name !== undefined && file.name.length <= 0) {
      return {
        code: "no file",
        message: `Please upload a document`,
      };
    }

    return null;
  };

  const rejectFile = (file) => {
    toast.error("Invalid file, only pdf, jpg and png allowed");
  };

  const performDelete = async () => {
    setDeleting(true);
    !memberCode ? await deleteAction(file.code) : await deleteAction(file.code, memberCode);
    setFile({
      name: "",
      code: "",
    });
    setSetOld(false);
    setDeleting(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: collectFile,
    onDropRejected: rejectFile,
    validator: nameLengthValidator,
    accept: {
      "application/pdf": [],
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <DocumentDownload style={containerStyle}>
      <DocumentFrame>
        {docType && (
          <Top>
            <DocumentIcon />
            <DocumentText>{docType}</DocumentText>
          </Top>
        )}
        {!file.name ? (
          <UploadWrapper
            {...getRootProps({
              disabled: uploading || disable,
              type: "button",
            })}
          >
            {!uploading ? (
              <>
                <UploadIcon />
                <span>{isDragActive ? "Drop file here" : "Upload"}</span>
              </>
            ) : (
              <SpinningCircles height={24} width={24} />
            )}
            <input
              {...getInputProps({
                multiple: false,
              })}
            />
          </UploadWrapper>
        ) : (
          <Preview>
            <span>{file.name}</span>
            <Delete onClick={performDelete} disabled={deleting} type="button">
              {deleting ? (
                <SpinningCircles height={24} width={24} fill={"red"} />
              ) : (
                <DeleteRedSvg />
              )}
            </Delete>
          </Preview>
        )}
      </DocumentFrame>
    </DocumentDownload>
  );
};

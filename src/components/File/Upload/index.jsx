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

export const Upload = ({ docType, uploadAction, deleteAction }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({ name: "", code: "" });
  const [deleting, setDeleting] = useState(false);

  const collectFile = useCallback(
    async (file) => {
      const realFile = file[0];
      setUploading(true);
      const uploadedFile = await convertToLink(realFile);
      const documentCode = await uploadAction(uploadedFile, docType, realFile);
      setFile({
        name: realFile.name,
        code: documentCode,
      });
      setUploading(false);
    },
    [uploadAction, docType]
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

  const performDelete = async () => {
    setDeleting(true);
    // I don't know where document code is gotten from
    // document code should be passed into the function below
    await deleteAction(file.code);
    setFile({
      name: "",
      code: "",
    });
    setDeleting(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: collectFile,
    validator: nameLengthValidator,
  });

  return (
    <DocumentDownload>
      <DocumentFrame>
        <Top>
          <DocumentIcon />
          <DocumentText>{docType}</DocumentText>
        </Top>
        {!file.name ? (
          <UploadWrapper
            {...getRootProps({
              disabled: uploading,
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

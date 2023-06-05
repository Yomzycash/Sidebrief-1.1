import React, { useState } from "react";
import {
  DocumentActions,
  DocumentDescription,
  DocumentDownload,
  DocumentInfo,
  ReviewContainer,
} from "./styled";
import EditDeleteButton from "components/button/EditDeleteButton";
import { downLoadImage } from "utils/staffHelper";
import { CommonButton } from "components/button";
import { ReactComponent as DownloadWhite } from "asset/svg/DownloadWhite.svg";
import { SpinningCircles } from "react-loading-icons";
import { checkStaffEmail } from "utils/globalFunctions";

const DocumentView = ({ info, setDisabled, deleteAction, deleteState }) => {
  const [selectedToDelete, setselectedToDelete] = useState();
  const [preparing, setPreparing] = useState(false);

  let loading = deleteState.isLoading && selectedToDelete?.documentCode === info?.documentCode;
  let isStaff = checkStaffEmail(localStorage.getItem("userEmail"));

  const handleDeleteDocument = () => {
    setselectedToDelete(info);
    deleteAction(info);
  };

  const handleEditQuestion = () => {
    setDisabled(false);
  };

  const download = async () => {
    setPreparing(true);
    await downLoadImage(info?.documentUrl, info?.documentName);
    setPreparing(false);
  };

  return (
    <ReviewContainer>
      <DocumentInfo>
        <p>{info?.documentName}</p>
        {isStaff && (
          <DocumentActions>
            <EditDeleteButton
              editAction={handleEditQuestion}
              deleteAction={handleDeleteDocument}
              deleteLoading={loading}
            />
          </DocumentActions>
        )}
      </DocumentInfo>
      <DocumentDescription>{info?.documentDescription}</DocumentDescription>
      <DocumentDownload>
        <CommonButton
          LeftIcon={DownloadWhite}
          action={download}
          loading={preparing}
          LoadingIcon={<SpinningCircles height={18} width={18} />}
          style={{ justifyContent: "center" }}
        />
      </DocumentDownload>
    </ReviewContainer>
  );
};

export default DocumentView;

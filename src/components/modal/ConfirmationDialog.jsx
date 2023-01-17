import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { ReactComponent as CloseIcon } from "asset/images/close.svg";
import { CheckoutController } from "containers";
import { InputsWrapper, modalStyle, Title } from "./styled";
import { InputWithLabel } from "components/input";

const ConfirmationDialog = ({
  open,
  setOpen,
  deleteWarn,
  toDelete,
  loading,
  deleteButtonText,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Called when closed button is clicked
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent style={modalStyle}>
        <Title>
          <p>{deleteWarn || `Are you sure you want to delete ${toDelete}`}</p>

          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </Title>
        <InputsWrapper>
          <InputWithLabel
            label=""
            labelStyle="input-label"
            placeholder={`Enter "${toDelete}" to delete`}
            type="text"
            inputClass="input-class"
            containerStyle="input-container-class"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputsWrapper>
        <CheckoutController
          backAction={handleClose}
          forwardAction={() => {}}
          backText={"Cancel"}
          containerStyle={buttonContainerStyles}
          backBottonStyle={buttonStyles}
          forwardButtonStyle={buttonStyles}
          forwardLoading={loading}
          forwardText={deleteButtonText || "Delete"}
          forwardDisable={inputValue?.toLowerCase() !== toDelete?.toLowerCase()}
          $modal
        />
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;

export const buttonStyles = {
  maxWidth: "197px",
  width: "20%",
  height: "clamp(45px, 6vw, 56px)",
  padding: "0",
  minWidth: "100px",
};

export const buttonContainerStyles = {
  justifyContent: "flex-end",
  gap: "24px",
  margin: "clamp(20px, 5%, 30px) 0 clamp(20px, 5%, 40px) 0",
};

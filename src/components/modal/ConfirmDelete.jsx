import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { ReactComponent as CloseIcon } from "asset/images/close.svg";
import { CheckoutController } from "containers";
import { InputWithLabel } from "components/input";
import styled from "styled-components";

const ConfirmDelete = ({
  open,
  setOpen,
  deleteWarn,
  toDelete,
  loading,
  deleteButtonText,
  handleDelete,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Called when closed button is clicked
  const handleClose = () => {
    setOpen(false);
    setInputValue("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent style={modalStyle}>
        <Title>
          <p>
            {deleteWarn ||
              `Are you sure you want to delete ${toDelete.toLowerCase()}`}
          </p>

          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </Title>
        <InputsWrapper>
          <InputWithLabel
            label=""
            labelStyle="input-label"
            placeholder={`Enter "delete" to delete`}
            type="text"
            inputClass="input-class"
            containerStyle="input-container-class"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputsWrapper>
        <CheckoutController
          backAction={handleClose}
          forwardAction={handleDelete}
          backText={"Cancel"}
          containerStyle={buttonContainerStyles}
          backBottonStyle={buttonStyles}
          forwardButtonStyle={deleteButtonStyles}
          forwardLoading={loading}
          forwardText={deleteButtonText || "Delete"}
          forwardDisable={inputValue?.toLowerCase() !== "delete"}
          loadingIconColor="red"
          $modal
        />
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;

export const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(15px, 1.5vw, 18px);
  font-weight: 400;
  color: #151717;
  padding: clamp(20px, 3vw, 40px) 0;
  border-bottom: 1px solid #edf1f7;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: clamp(20px, 5%, 40px) 0;
`;

export const buttonStyles = {
  maxWidth: "197px",
  width: "20%",
  height: "clamp(45px, 6vw, 56px)",
  padding: "0",
  minWidth: "100px",
};

export const deleteButtonStyles = {
  maxWidth: "197px",
  width: "20%",
  height: "clamp(45px, 6vw, 56px)",
  padding: "0",
  minWidth: "100px",
  backgroundColor: "#ffb5b5",
  color: "red",
};

export const buttonContainerStyles = {
  justifyContent: "flex-end",
  gap: "24px",
  margin: "clamp(20px, 5%, 30px) 0 clamp(20px, 5%, 40px) 0",
};

export const modalStyle = {
  padding: 0,
  backgroundColor: "white",
  width: "100%",
  maxWidth: "400px",
  borderRadius: "16px",
  boxShadow:
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  paddingInline: "20px",
};

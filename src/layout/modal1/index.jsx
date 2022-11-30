import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { ReactComponent as CloseIcon } from "asset/images/close.svg";
import { CheckoutController } from "containers";
import {
  buttonContainerStyles,
  buttonStyles,
  Form,
  InputsWrapper,
  modalStyle,
  Title,
} from "./styled";

const Modal1 = ({
  handleSubmit,
  submitAction,
  schema,
  title,
  cardAction,
  children,
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent style={modalStyle}>
        <Form onSubmit={handleSubmit(submitAction)}>
          <Title>
            <p>{title}</p>
            <div style={{ cursor: "pointer" }}>
              <CloseIcon onClick={handleClose} />
            </div>
          </Title>
          <InputsWrapper>{children}</InputsWrapper>
          <CheckoutController
            backAction={handleClose}
            forwardAction={() => {}}
            backText={"Cancel"}
            containerStyle={buttonContainerStyles}
            backBottonStyle={buttonStyles}
            forwardButtonStyle={buttonStyles}
            forwardSubmit
            forwardLoading={""}
            forwardText={cardAction === "edit" ? "Update" : "Save"}
            forwardDisable={""}
            $modal
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal1;

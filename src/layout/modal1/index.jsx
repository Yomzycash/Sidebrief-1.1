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
  TopIcons,
} from "./styled";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { SpinningCircles } from "react-loading-icons";
import { handleError } from "utils/globalFunctions";
import { useDeleteEntityMutation } from "services/staffService";

const Modal1 = ({
  handleSubmit,
  submitAction,
  schema,
  title,
  cardAction,
  children,
  open,
  setOpen,
  disable,
  setDisable,
  loading,
  entityInfo,
}) => {
  const [deleteEntity, deleteState] = useDeleteEntityMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisable = () => {
    setDisable(false);
  };

  const handleEntityDelete = async (formData) => {
    let requiredData = entityInfo;
    let response = await deleteEntity(entityInfo);
    if (response.error) {
      handleError(response.error);
    }
    console.log(entityInfo);
    console.log(response);
  };

  return (
    <Dialog open={open}>
      <DialogContent style={modalStyle}>
        <Form onSubmit={handleSubmit(submitAction)}>
          <Title>
            <p>{title}</p>
            <TopIcons>
              <EditIcon width={20} onClick={handleDisable} />
              {deleteState.isLoading ? (
                <SpinningCircles
                  stroke="#00A2D4"
                  fill="#00A2D4"
                  width={20}
                  height={20}
                />
              ) : (
                <div style={{ cursor: "pointer" }}>
                  <DeleteIcon
                    onClick={handleEntityDelete}
                    width={20}
                    color="#fff"
                  />
                </div>
              )}
              <CloseIcon onClick={handleClose} />
            </TopIcons>
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
            forwardLoading={loading}
            forwardText={cardAction === "edit" ? "Update" : "Save"}
            forwardDisable={disable}
            $modal
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal1;

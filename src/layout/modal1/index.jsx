import React from "react";
import { Dialog, DialogContent } from "@mui/material";
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

const Modal1 = ({
  handleSubmit,
  submitAction,
  title,
  cardAction,
  children,
  open,
  setOpen,
  disable,
  setDisable,
  loading,
  handleDelete,
  deleteState,
  $hideIcons,
}) => {
  // Called when closed button is clicked
  const handleClose = () => {
    setOpen(false);
  };

  // This enables the inputs. Called when the edit (pen) icon is clicked.
  const handleDisable = () => {
    setDisable(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent style={modalStyle}>
        <Form onSubmit={handleSubmit(submitAction)}>
          <Title>
            <p>{title}</p>
            <TopIcons>
              {!$hideIcons && cardAction === "edit" && (
                <EditIcon width={20} onClick={handleDisable} />
              )}
              {!$hideIcons &&
                cardAction === "edit" &&
                (deleteState?.isLoading ? (
                  <SpinningCircles
                    stroke="#00A2D4"
                    fill="#00A2D4"
                    width={20}
                    height={20}
                  />
                ) : (
                  <div style={{ cursor: "pointer" }}>
                    <DeleteIcon
                      onClick={handleDelete}
                      width={20}
                      color="#fff"
                    />
                  </div>
                ))}
              <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
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

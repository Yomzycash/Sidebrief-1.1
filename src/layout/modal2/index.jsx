import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { ReactComponent as CloseIcon } from "asset/images/close.svg";
import { CheckoutController } from "containers";
import {
  buttonContainerStyles,
  buttonStyles,
  DeleteWrapper,
  Form,
  InputsWrapper,
  modalStyle,
  ProgressWrapper,
  Title,
  Top,
  TopIcons,
} from "./styled";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import { SpinningCircles } from "react-loading-icons";
import DeleteIcon from "asset/Icons/DeleteIcon";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Modal2 = ({
  children,
  title,
  open,
  mode,
  setOpen,
  setDisable,
  handleDelete,
  deleteState,
  $hideIcons,
  ProgressBarComponent,
  parentRef,
}) => {
  const [confirm, setConfirm] = useState(false);
  const [value, setValue] = useState("");

  // Called when closed button is clicked
  const handleClose = () => {
    setOpen && setOpen(false);
  };

  // This enables the inputs. Called when the edit (pen) icon is clicked.
  const handleDisable = () => {
    setDisable(false);
  };
  const handleDeleteSelected = () => {
    setConfirm(true);
    if (value === "delete") handleDelete();
  };

  useEffect(() => {
    setConfirm(false);
    setValue("");
  }, [mode]);

  return (
    <Dialog open={open}>
      <DialogContent style={modalStyle} ref={parentRef}>
        <Top>
          <Title>
            <p>{title}</p>
            <TopIcons>
              {!$hideIcons && mode === "edit" && <EditIcon width={20} onClick={handleDisable} />}
              {!$hideIcons && mode === "edit" && (
                <DeleteWrapper>
                  {confirm && (
                    <input
                      type="text"
                      placeholder="Type DELETE to confirm"
                      onChange={(e) => setValue(e.target.value.toLowerCase())}
                    />
                  )}
                  {deleteState?.isLoading ? (
                    <SpinningCircles stroke="#cb1b1b" fill="#cb1b1b" width={20} height={20} />
                  ) : (
                    <DeleteIcon
                      width={20}
                      color={value === "delete" || confirm === false ? "#cb1b1b" : "#c68181"}
                      onClick={handleDeleteSelected}
                    />
                  )}
                </DeleteWrapper>
              )}
              <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            </TopIcons>
          </Title>
          <ProgressWrapper>{ProgressBarComponent}</ProgressWrapper>
        </Top>
        <InputsWrapper>{children}</InputsWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default Modal2;

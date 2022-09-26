import React from "react";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import { Container, IconWrapper, SharesWrapper, Top } from "./styled";
import { updateLaunchShareHolder } from "redux/Slices";
import { store } from "redux/Store";
import { useSelector } from "react-redux";

const LaunchSummaryCard = ({
  number,
  name,
  shares,
  sharesPercentage,
  email,
  phone,
  editAction,
  deleteAction,
}) => {
  return (
    <Container>
      <Top>
        <p>{`${number}. ${name}`}</p>
        <SharesWrapper shares={shares}>
          <div>{`${shares} - ${sharesPercentage}`}</div>
          <IconWrapper>
            <EditIcon onClick={editAction} />
            <DeleteIcon onClick={deleteAction} />
          </IconWrapper>
        </SharesWrapper>
      </Top>
      <div>{email}</div>
      <div>{phone}</div>
    </Container>
  );
};

export default LaunchSummaryCard;

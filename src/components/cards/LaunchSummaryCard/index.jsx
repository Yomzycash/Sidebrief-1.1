import React from "react";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import { Container, IconWrapper, SharesWrapper, Top } from "./styled";
import { deleteLaunchShareHolder } from "redux/Slices";
import { store } from "redux/Store";

const LaunchSummaryCard = ({
  number,
  name,
  shares,
  sharesPercentage,
  email,
  phone,
}) => {
  const handleDelete = () => {
    store.dispatch(deleteLaunchShareHolder(email));
  };

  return (
    <Container>
      <Top>
        <p>{`${number}. ${name}`}</p>
        <SharesWrapper shares={shares}>
          <div>{`${shares} - ${sharesPercentage}`}</div>
          <IconWrapper>
            <EditIcon />
            <DeleteIcon onClick={handleDelete} />
          </IconWrapper>
        </SharesWrapper>
      </Top>
      <div>{email}</div>
      <div>{phone}</div>
    </Container>
  );
};

export default LaunchSummaryCard;

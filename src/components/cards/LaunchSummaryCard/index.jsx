import React from "react";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import {
  Container,
  Email,
  IconWrapper,
  InfoDesktop,
  InfoMobile,
  Phone,
  SharesWrapper,
  Top,
} from "./styled";
import { SpinningCircles } from "react-loading-icons";

const LaunchSummaryCard = ({
  number,
  name,
  shares,
  sharesPercentage,
  email,
  phone,
  editAction,
  deleteAction,
  idNumber,
  stake,
  occupation,
  isLoading,
  icon,
}) => {
  return (
    <Container>
      <Top>
        <p>{`${number}. ${name}`}</p>
        <SharesWrapper shares={shares}>
          {shares && (
            <InfoDesktop
              shares={shares}
            >{`${shares} - ${sharesPercentage}%`}</InfoDesktop>
          )}
          {idNumber && <InfoDesktop>{`Id Number - ${idNumber}`}</InfoDesktop>}
          {stake && (
            <InfoDesktop>{`Occupation: ${occupation} - Stake: ${stake}%`}</InfoDesktop>
          )}
          {!icon && (
            <IconWrapper>
              <div style={{ cursor: "pointer" }}>
                <EditIcon onClick={editAction} width={24} />
              </div>
              {isLoading ? (
                <SpinningCircles
                  stroke="#BD1C1C"
                  fill="#BD1C1C"
                  width={24}
                  height={24}
                />
              ) : (
                <div style={{ cursor: "pointer" }}>
                  <DeleteIcon onClick={deleteAction} width={24} />
                </div>
              )}
            </IconWrapper>
          )}
        </SharesWrapper>
      </Top>
      {shares && (
        <InfoMobile shares={shares}>
          {`${shares} - ${sharesPercentage}%`}
        </InfoMobile>
      )}
      {idNumber && <InfoMobile>{`Role - ${idNumber}`}</InfoMobile>}
      {stake && (
        <InfoMobile>{`Occupation: ${occupation} - Stake: ${stake}%`}</InfoMobile>
      )}
      <Email>{email}</Email>
      <Phone>+{phone}</Phone>
    </Container>
  );
};

export default LaunchSummaryCard;

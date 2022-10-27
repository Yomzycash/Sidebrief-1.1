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
  director_role,
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
          {director_role && (
            <InfoDesktop>{`Role - ${director_role}`}</InfoDesktop>
          )}
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
                  stroke="#00A2D4"
                  fill="#00A2D4"
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
      {director_role && <InfoMobile>{`Role - ${director_role}`}</InfoMobile>}
      {stake && (
        <InfoMobile>{`Occupation: ${occupation} - Stake: ${stake}%`}</InfoMobile>
      )}
      <Email>{email}</Email>
      <Phone>+{phone}</Phone>
    </Container>
  );
};

export default LaunchSummaryCard;

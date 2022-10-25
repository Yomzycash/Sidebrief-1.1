import React from "react";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import { Container, IconWrapper, SharesWrapper, Top } from "./styled";
import { SpinningCircles } from "react-loading-icons";
import styled from "styled-components";
import { imageTypeImage } from "utils/config";

const ReviewCard = ({
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
  government,
  proof,
  passport,
}) => {
  return (
    <Container>
      <Top>
        <p>{`${number}. ${name}`}</p>
        <SharesWrapper shares={shares}>
          {shares && <div>{`${shares} - ${sharesPercentage}%`}</div>}
          {director_role && <div>{`Role - ${director_role}`}</div>}
          {stake && <div>{`Occupation: ${occupation} - Stake: ${stake}%`}</div>}
          {!icon && (
            <IconWrapper>
              <div style={{ cursor: "pointer" }}>
                <EditIcon onClick={editAction} />
              </div>
              {isLoading ? (
                <SpinningCircles
                  stroke="#00A2D4"
                  fill="#00A2D4"
                  width={25}
                  height={25}
                />
              ) : (
                <div style={{ cursor: "pointer" }}>
                  <DeleteIcon onClick={deleteAction} />
                </div>
              )}
            </IconWrapper>
          )}
        </SharesWrapper>
      </Top>
      <div>{email}</div>
      <div>{phone}</div>

      <PdfContainer>
        <PdfWrapper>
          {imageTypeImage
            .filter((fil) => government.slice(-3) === fil.name)
            .map((m) => (
              <img
                src={m.image}
                alt=""
                style={{
                  margin: 0,
                  height: "25px",
                  width: "25px",
                  marginRight: "8px",
                }}
              />
            ))}
          <TextWrapper>{government}</TextWrapper>
        </PdfWrapper>
        <PdfWrapper>
          {imageTypeImage
            .filter((fil) => proof.slice(-3) === fil.name)
            .map((m) => (
              <img
                src={m.image}
                alt=""
                style={{
                  margin: 0,
                  height: "25px",
                  width: "25px",
                  marginRight: "8px",
                }}
              />
            ))}
          <TextWrapper>{proof}</TextWrapper>
        </PdfWrapper>
        <PdfWrapper>
          {imageTypeImage
            .filter((fil) => passport.slice(-3) === fil.name)
            .map((m) => (
              <img
                src={m.image}
                alt=""
                style={{
                  margin: 0,
                  height: "25px",
                  width: "25px",
                  marginRight: "8px",
                }}
              />
            ))}
          <TextWrapper>{passport}</TextWrapper>
        </PdfWrapper>
      </PdfContainer>
    </Container>
  );
};

export default ReviewCard;

const PdfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 16px;
`;
const PdfWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10.5px 16px;
  width: 100%;
  height: 48px;
  background: #fafafa;
  border: 1px dashed #edf1f7;
  border-radius: 8px;
  margin-left: 0px !important;
`;
const TextWrapper = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  text-decoration-line: underline;
  color: #4e5152;
`;
const Document = styled.div`
  border: 1px dashed #edf1f7;
  border-radius: 8px;
  padding: 10.5px 16px;
  background-color: #fafafa;
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  p {
    text-decoration: underline;
  }
`;

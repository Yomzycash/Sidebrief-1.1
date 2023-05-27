import React from "react";
import { Container, Left, PromoDate, PromoInfo, Right } from "./styled";

const PromoCodeCard = ({ promoInfo, handleActiveToggle, handleEdit }) => {
  const { promoCode, promoExpiry, promoDiscount, promoStatus } = promoInfo;

  return (
    <Container>
      <Left>
        <PromoInfo>
          <span>{promoCode}</span> - <span>{promoDiscount + "%"}</span>
        </PromoInfo>
        <PromoDate>Exp: {promoExpiry}</PromoDate>
      </Left>
      <Right>
        <button
          onClick={(e) => handleActiveToggle(e, promoInfo)}
          className="button__effect"
          style={{ color: !promoStatus && "#4D9738" }}
        >
          {promoStatus ? "Disable" : "Enable"}
        </button>
        <button onClick={(e) => handleEdit(e, promoInfo)} className="button__effect">
          Edit
        </button>
      </Right>
    </Container>
  );
};

export default PromoCodeCard;

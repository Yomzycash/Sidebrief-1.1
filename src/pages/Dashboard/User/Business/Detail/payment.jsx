import React from "react";
import PaymentDetailsCard from "../../../../../components/cards/PaymentCard";
import { Container, DetailContainer } from "./styles";

const Payment = () => {
  return (
    <DetailContainer>
      <PaymentDetailsCard
        amount={34}
        currency={"USD"}
        id={5243}
        provider={"Flutterwave"}
        status={"Successful"}
        code={1234234525}
      />
    </DetailContainer>
  );
};

export default Payment;

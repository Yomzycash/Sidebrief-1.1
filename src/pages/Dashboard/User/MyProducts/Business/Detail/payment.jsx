import React from "react";
import { useOutletContext } from "react-router-dom";
import { getCurrencyInfo } from "utils/globalFunctions";
import PaymentDetailsCard from "../../../../../../components/cards/PaymentCard";
import { DetailContainer } from "./styles";

const Payment = () => {
  const { data, isLoading } = useOutletContext();

  let paymentDetails = data?.businessPayment[0];

  let amount =
    getCurrencyInfo(paymentDetails?.paymentCurrency)?.symbol + paymentDetails?.paymentAmount;

  return (
    <DetailContainer>
      <PaymentDetailsCard
        amount={amount}
        currency={paymentDetails?.paymentCurrency}
        id={paymentDetails?.paymentTransactionId}
        email={data?.businessAddress?.addressEmail}
        provider={paymentDetails?.paymentProvider}
        status={paymentDetails?.paymentStatus}
        code={paymentDetails?.launchCode}
        date={data?.createdAt.slice(0, 10)}
        isLoading={isLoading}
      />
    </DetailContainer>
  );
};

export default Payment;

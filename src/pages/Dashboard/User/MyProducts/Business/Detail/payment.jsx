import { format } from "date-fns";
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

  let status = paymentDetails?.paymentStatus;

  let statusStyle = {
    backgroundColor: status === "successful" ? "#73d895" : "#F9C4BD",
    borderRadius: "10px",
    padding: "5px 10px",
  };

  let info = [
    {
      fieldName: "Amount",
      fieldValue: amount,
    },
    {
      fieldName: "Currency",
      fieldValue: paymentDetails?.paymentCurrency,
    },
    {
      fieldName: "Transaction Id",
      fieldValue: paymentDetails?.paymentTransactionId,
    },
    {
      fieldName: "Email",
      fieldValue: data?.businessAddress?.addressEmail,
    },
    {
      fieldName: "Provider",
      fieldValue: paymentDetails?.paymentProvider,
    },
    {
      fieldName: "Status",
      fieldValue: <span style={statusStyle}>{status}</span>,
    },
  ];

  return (
    <DetailContainer>
      <PaymentDetailsCard
        info={info}
        date={format(new Date(data?.createdAt), "dd MMMM, yyyy")}
        isLoading={isLoading}
      />
    </DetailContainer>
  );
};

export default Payment;

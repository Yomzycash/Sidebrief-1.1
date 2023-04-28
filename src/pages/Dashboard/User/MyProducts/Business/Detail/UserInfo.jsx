import PaymentDetailsCard from "components/cards/PaymentCard";
import { format } from "date-fns";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { DetailContainer } from "./styles";

const UserInfo = () => {
  const { userInfo } = useOutletContext();

  let data = userInfo.data?.data;

  let info = [
    {
      fieldName: "Name",
      fieldValue: data?.first_name + " " + data?.last_name,
    },
    {
      fieldName: "Email",
      fieldValue: data?.email,
    },
    {
      fieldName: "Phone Number",
      fieldValue: "+" + data?.phone,
    },
    {
      fieldName: "Username",
      fieldValue: data?.username,
    },
    {
      fieldName: "Referrer",
      fieldValue: data?.referral_code,
    },
  ];

  return (
    <DetailContainer>
      <PaymentDetailsCard
        info={info}
        isLoading={userInfo.isLoading}
        date={format(new Date(data?.createdAt), "dd MMMM, yyyy")}
      />
    </DetailContainer>
  );
};

export default UserInfo;

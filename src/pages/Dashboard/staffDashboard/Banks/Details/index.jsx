import StaffBankDetails from "components/staffBankDetails";
import React, { useEffect, useState } from "react";
import { useGetAllBanksQuery } from "services/staffService";
import { Body, Container, Loading } from "./style";
import { Puff } from "react-loading-icons";

const StaffBankDetailsPage = () => {
  const [selectedBank, setSelectedBank] = useState([]);
  const { data, isLoading } = useGetAllBanksQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    let localBankID = localStorage.getItem("bankCode");
    if( localBankID !== null) {
      let bankID = JSON.parse(localBankID);
      const bankData = data === undefined ? [] : [...data];
      const bankDetails = bankData.filter(
        (data) => data.bankCode === bankID
      )
      setSelectedBank(bankDetails)
    } else {
      console.log("Id not found")
    }
  }, [data]);
  return (
    <Container>
      <Body>
        {isLoading ? (
          <Loading height="300px">
            <Puff stroke="#00A2D4" fill="white" width={60} />
          </Loading>
        ) : (
            <StaffBankDetails selectedBank={selectedBank} /> 
            // <Container>
            //     <h1>Bank Details</h1>
            // </Container>
        )}
      </Body>
    </Container>
  );
};

export default StaffBankDetailsPage;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Protected from "routes/Protected";

const ProtectedReview = () => {
  const { launchResponse, launchPaid } = useSelector((store) => store.LaunchReducer);

  // Get launch information from local storage
  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  const entityLaunchCode = launchInfo?.launchCode;
  const selectedCountryISO = localStorage.getItem("countryISO");
  const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
  let paidStatus = paymentDetails?.paymentStatus === "successful" ? true : false;

  //
  const [launchCode, setLaunchCode] = useState(entityLaunchCode);
  const [countryISO, setCountryISO] = useState(selectedCountryISO);
  const [paid, setPaid] = useState(paidStatus);

  const allowLaunch = launchCode && countryISO;
  const [filledAddress, setFilledAddress] = useState(false);
  const [filledShareholders, setFilledShareholders] = useState(false);
  const [filledDirectors, setFilledDirectors] = useState(false);
  const [filledShareholdersKyc, setFilledShareholdersKyc] = useState(false);
  const [filledDirectorsKyc, setFilledDirectorsKyc] = useState(false);

  //
  useEffect(() => {
    setLaunchCode(entityLaunchCode);
    setCountryISO(selectedCountryISO);
    setPaid(paidStatus);
  }, [launchResponse, launchPaid]);

  return (
    <Protected isVerified={allowLaunch} redirect="/launch">
      <Protected isVerified={paid} redirect="/launch/payment">
        <Outlet />
      </Protected>
    </Protected>
  );
};

export default ProtectedReview;

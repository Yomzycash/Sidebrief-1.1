import Pagination from "components/Pagination";
import React from "react";
import Loader from "components/loader/loader";
import StaffDashboard from "./Dashboard/staffDashboard";
import { StepBar } from "components/Indicators";
import NotAvailable from "components/NotAvailable";
const Test = () => {
  const analytics = {
    title: "User analytics",
    status1: {
      text: "Total Users",
      total: 825,
      color: "rgba(255, 255, 255, 0.4)",
    },
    status2: {
      text: "Registrations",
      total: 450,
      color: "#ffffff",
    },
  };

  const tableMockData = [
    {
      name: "Slideshow Africa",
      country: "Nigeria",
      date: "12/12/2022",
    },
    {
      name: "Ayomide Africa",
      country: "Nigeria",
      date: "12/12/2022",
    },
    {
      name: "Image Deity Industries",
      country: "Kenya",
      date: "12/12/2022",
    },
  ];

  return (
    <>
      {/* <Pagination /> */}
      {/* <BusinessesChartCard staff analytics={analytics} />
      <BusinessHomeTable data={tableMockData} /> */}
      <StepBar mobile />
      <NotAvailable availableText={"No shareholder"} />
    </>
  );
};

export default Test;

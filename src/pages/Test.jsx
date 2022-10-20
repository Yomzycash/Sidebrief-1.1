import MobileNavbar from "components/navbar/MobileNavbar";
import Pagination from "components/Pagination";
import React from "react";
import { BusinessesChartCard } from "components/cards";
import { BusinessHomeTable } from "components/Staff/Tables";

const Test = () => {
  const analytics = {
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
      <BusinessesChartCard staff analytics={analytics} />
      <BusinessHomeTable data={tableMockData} />
    </>
  );
};

export default Test

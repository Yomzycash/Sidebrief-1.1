import React from "react";
import Accordion from "components/Accordion";
import HeaderSearch from "components/HeaderSearch";
import CustomDropdown from "components/input/CustomDropdown";
import { useState } from "react";
import StaffDocumentModal from "components/modal/StaffDocumentModal";
import StaffMobileStatusCard from "components/cards/StaffStatusCard/StaffMobileStatusCard";

const Test = () => {
  const accordions = [
    { title: "Accordion 1", type: "Content 1", country: "Nigeria", date: "28/08/2022" },
    { title: "Accordion 2", type: "Content 2", country: "Nigeria", date: "28/08/2022" },
    { title: "Accordion 3", type: "Content 3", country: "Nigeria", date: "28/08/2022" },
  ];

  const options = ["All Rewards", "My Rewards"];
  const [selected, setSelected] = useState("All Rewards");
  console.log(selected);

  return (
    <div>
      <StaffDocumentModal/>
    </div>
  );
};

export default Test;

import React from "react";
import Accordion from "components/Accordion";
import HeaderSearch from "components/HeaderSearch";
import CustomDropdown from "components/input/CustomDropdown";
import { useState } from "react";
import AllRewards from "./Dashboard/User/Rewards/AllRewards";
import MyRewards from "./Dashboard/User/Rewards/MyRewards";

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
    <div className="accordion-group">
      {accordions.map((accordion, index) => (
        <Accordion
          key={index}
          title={accordion.title}
          type={accordion?.type}
          country={accordion?.country}
          date={accordion?.date}
        ></Accordion>
      ))}

      <HeaderSearch title="Businesses" />
      <CustomDropdown
        options={options}
        selectedValue={setSelected}
        intialvalue={"All Rewards"}
      />
      {selected === "All Rewards" && <AllRewards />}
      {selected === "My Rewards" && <MyRewards />}
    </div>
  );
};

export default Test;

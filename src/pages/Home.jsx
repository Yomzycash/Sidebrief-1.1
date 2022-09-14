import React from "react";
import TagInputWithSearch from "components/input/TagInputWithSearch.jsx";

const Home = () => {
  const label = "Business Objectives";

  const list = [
    "Marketing",
    "Art and Designs",
    "Construction",
    "Information and Technology",
    "Marketing",
    "Art and Designs",
    "Construction",
    "Information and Technology",
    "Marketing",
    "Art and Designs",
    "Construction",
    "Information and Technology",
  ];

  const getValue = (value) => {
    console.log(value);
  };

  return (
    <div style={{ maxWidth: "70%", margin: "auto" }}>
      <p>Welcome to sidebrief</p>
      <TagInputWithSearch
        label={label}
        list={list}
        MultiSelect
        ExistsError="Tag has already been selected"
        MatchError="Please select objectives from the list"
        EmptyError="Please select at least one objective"
        getValue={getValue}
      />
    </div>
  );
};

export default Home;

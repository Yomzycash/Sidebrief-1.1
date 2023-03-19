import React from "react";
import Questionnaire from "components/input/Questionnaire";
import QuestionView from "components/input/Questionnaire/QuestionView";
import AddDocument from "containers/AddDocument";
import AddTemplate from "containers/AddTemplate";
import SimpleTabNavBar from "components/TabNavBar/SimpleTabNavBar";

const Test = () => {
  const tabs = [
    { label: "Requirement Document Details", content: <AddDocument /> },
    { label: "Template Information", content: <AddTemplate /> },
  ];

  return (
    <div style={{}}>
      {/* <QuestionnaireInput/> */}
      {/* <ToggleButton rightText="Compulsory" /> */}
      {/* <Questionnaire />
      <QuestionView /> */}
      <SimpleTabNavBar tabsInfo={tabs} />
      <AddDocument />
      <AddTemplate />
    </div>
  );
};

export default Test;

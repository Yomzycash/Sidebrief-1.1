import React from "react";
import { useState } from "react";
import QuestionReview from "./QuestionReview";
import QuestionEdit from "./QuestionEdit";

const Questionnaire = ({ editMode }) => {
  const [disabled, setDisabled] = useState(editMode);

  return <>{disabled ? <QuestionReview setDisabled={setDisabled} /> : <QuestionEdit />}</>;
};

export default Questionnaire;

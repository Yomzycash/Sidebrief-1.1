export const useActions = ({ state, dispatch }) => {
  const { question, required, selectedType, optionsArray, questionError, optionsError } = state;

  const applyActive = (type) => {
    if (type !== selectedType) return;
    return { backgroundColor: selectedType === type ? "#0082AA" : "", color: "#fff" };
  };

  let otherClicked = optionsArray.find((el) => el === "Other" || el === "Other (allowed to type)");

  // Runs on question change
  const handleQuestion = (e) => {
    let value = e.target.value;
    dispatch({ type: "setQuestion", payload: value });
    validateQuestion(value);
  };

  // Validates question input
  const validateQuestion = (value) => {
    if (value.length === 0) {
      dispatch({ type: "setQuestionError", payload: "Enter question" });
      return false;
    } else if (parseInt(value)) {
      dispatch({ type: "setQuestionError", payload: "Enter a valid question" });
      return false;
    } else {
      dispatch({ type: "setQuestionError", payload: "" });
      return true;
    }
  };

  // Validates the length of options array
  const validateOptions = () => {
    if ((selectedType === "checkbox" || selectedType === "radio") && optionsArray.length < 2) {
      dispatch({ type: "setOptionsError", payload: "Options should be 2 or more" });
      return false;
    } else {
      dispatch({ type: "setOptionsError", payload: "" });
      return true;
    }
  };

  // Validates the length of each option
  const validateEmptyOptions = () => {
    if (optionsArray.some((el) => el.trim() === "")) {
      dispatch({ type: "setOptionsError", payload: "Option cannot be empty" });
      return false;
    } else {
      dispatch({ type: "setOptionsError", payload: "" });
      return true;
    }
  };

  // Adds an option
  const handleOptionAdd = (e) => {
    e.preventDefault();
    if (otherClicked) return;
    let valid = validateEmptyOptions();
    if (!valid) return;
    let optionsCopy = [...optionsArray];
    optionsCopy.push("");
    dispatch({ type: "setOptionsArray", payload: optionsCopy });
  };

  // Adds "other" option
  const handleOtherAdd = (e) => {
    e.preventDefault();
    if (otherClicked) return;
    let valid = validateEmptyOptions();
    if (!valid) return;
    let optionsCopy = [...optionsArray];
    optionsCopy.push("Other");
    dispatch({ type: "setOptionsArray", payload: optionsCopy });
  };

  // Removes an existing option
  const handleOptionRemove = (index) => {
    let optionsArrayCopy = optionsArray.filter((el, elIndex) => elIndex !== index);
    dispatch({ type: "setOptionsArray", payload: optionsArrayCopy });
  };

  // Updates options valule when selected question type is checkbox or radio
  const updateOptionValue = (index, value) => {
    let optionsCopy = [...optionsArray];
    optionsCopy[index] = value;
    dispatch({ type: "setOptionsArray", payload: optionsCopy });
  };

  // Toggles compulsory
  const handleToggle = (e) => {
    dispatch({ type: "setRequired", payload: e.target.checked });
  };

  // Submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    let questionValid = validateQuestion(question);
    let optionsValid = validateOptions() && validateEmptyOptions();
    if (!questionValid || !optionsValid) return;
    console.log(state);
  };

  // Hides form
  const handleDone = () => {
    dispatch({ type: "setDone", payload: true });
  };

  return {
    otherClicked,
    applyActive,
    handleQuestion,
    handleOptionAdd,
    handleOtherAdd,
    handleOptionRemove,
    updateOptionValue,
    handleToggle,
    handleSubmit,
    handleDone,
  };
};

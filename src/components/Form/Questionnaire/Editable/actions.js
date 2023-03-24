import { handleError } from "utils/globalFunctions";

export const useActions = ({
  state,
  info,
  dispatch,
  setDisabled,
  handleQuestionSubmit,
  handleUpdateQuestion,
  review,
  optionsRef,
}) => {
  const { question, selectedType, optionsArray, done, doneClicked, updateClicked } = state;

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

  //

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

  //

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

  //

  // Validates the length of each option
  const validateEmptyOptions = () => {
    let optionsCopy = optionsArray?.map((el) => el?.toLowerCase()?.trim());
    let uniqueOptions = [...new Set(optionsCopy)];
    let duplicatesExist = optionsCopy?.length !== uniqueOptions?.length;

    if (selectedType === "checkbox" || selectedType === "radio") {
      if (optionsArray.some((el) => el.trim() === "")) {
        dispatch({ type: "setOptionsError", payload: "Option cannot be empty" });
        return false;
      } else if (duplicatesExist) {
        dispatch({ type: "setOptionsError", payload: "Duplicate option(s) exist" });
      } else {
        dispatch({ type: "setOptionsError", payload: "" });
        return true;
      }
    } else return true;
  };

  //

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

  //

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

  //

  const focusLastOption = () => {
    let lastIndex = optionsArray.length - 1;
    if (lastIndex < 0) return;
    if (selectedType === "checkbox" || selectedType === "radio")
      optionsRef.current?.childNodes[lastIndex]?.childNodes[1].focus();
  };

  //

  // Removes an existing option
  const handleOptionRemove = (index) => {
    let optionsArrayCopy = optionsArray.filter((el, elIndex) => elIndex !== index);
    dispatch({ type: "setOptionsArray", payload: optionsArrayCopy });
  };

  //

  // Updates options values when selected question type is checkbox or radio
  const updateOptionValue = (index, value) => {
    let optionsCopy = [...optionsArray];
    optionsCopy[index] = value;
    dispatch({ type: "setOptionsArray", payload: optionsCopy });
    if (value !== "") {
      // if (!validateOptions()) return;
      dispatch({ type: "setOptionsError", payload: "" });
    }
  };

  //

  // Toggles compulsory
  const handleToggle = (checkboxRef) => {
    checkboxRef.checked = !state.required;
    dispatch({ type: "setRequired", payload: checkboxRef.checked });
  };

  //

  // Submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (done) {
      dispatch({ type: "setDone", payload: false });
      dispatch({ type: "setDoneClicked", payload: false });
      resetFields();
      return;
    }
    if (doneClicked && !question) {
      dispatch({ type: "setDone", payload: true });
      return;
    }

    let questionValid = validateQuestion(question);
    let optionsValid = validateOptions() && validateEmptyOptions();
    if (!questionValid || !optionsValid) return;

    let response = review
      ? await handleUpdateQuestion({ ...state, fieldCode: info?.fieldCode })
      : await handleQuestionSubmit(state);
    if (response?.data) {
      if (doneClicked) dispatch({ type: "setDone", payload: true });
      else if (updateClicked) {
        setDisabled(true);
      }
      resetFields();
    } else {
      handleError(response?.error);
    }

    dispatch({ type: "setUpdateClicked", payload: false });
  };

  //

  // Resets all fields to default values
  const resetFields = () => {
    dispatch({ type: "setQuestion", payload: "" });
    dispatch({ type: "setOptionsArray", payload: [""] });
    dispatch({ type: "setSelectedType", payload: "input" });
    dispatch({ type: "setRequired", payload: true });
    dispatch({ type: "setQuestionError", payload: "" });
    dispatch({ type: "setOptionsError", payload: "" });
  };

  return {
    otherClicked,
    applyActive,
    handleQuestion,
    handleOptionAdd,
    handleOtherAdd,
    focusLastOption,
    handleOptionRemove,
    updateOptionValue,
    handleToggle,
    handleSubmit,
  };
};

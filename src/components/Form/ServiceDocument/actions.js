import { handleError } from "utils/globalFunctions";

export const useActions = ({
  state,
  info,
  dispatch,
  setDisabled,
  handleDocumentSubmit,
  handleUpdateDocument,
  review,
}) => {
  const { documentName, documentDescription, done, doneClicked, updateClicked } = state;

  // Runs on document name change
  const handleDocumentName = (e) => {
    let value = e.target.value;
    dispatch({ type: "setDocumentName", payload: value });
    validateName(value);
  };

  //

  // Runs on document description change
  const handleDocumentDescription = (e) => {
    let value = e.target.value;
    dispatch({ type: "setDocumentDescription", payload: value });
    validateDescription(value);
  };

  //

  // Validates document name input
  const validateName = (value) => {
    if (value.length === 0) {
      dispatch({ type: "setNameError", payload: "Enter document name" });
      return false;
    } else {
      dispatch({ type: "setNameError", payload: "" });
      return true;
    }
  };

  //

  // Validates document description input
  const validateDescription = (value) => {
    if (value.length === 0) {
      dispatch({ type: "setDescriptionError", payload: "Enter document description" });
      return false;
    } else {
      dispatch({ type: "setDescriptionError", payload: "" });
      return true;
    }
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
    if (doneClicked && !documentName && !documentDescription) {
      dispatch({ type: "setDone", payload: true });
      return;
    }

    let nameValid = validateName(documentName);
    let descriptionValid = validateDescription(documentDescription);
    if (!nameValid || !descriptionValid) return;

    let response = review
      ? await handleUpdateDocument({ ...state, requirementCode: info?.requirementCode })
      : await handleDocumentSubmit(state);
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
    dispatch({ type: "setDocumentName", payload: "" });
    dispatch({ type: "setDocumentDescription", payload: "" });
    dispatch({ type: "setNameError", payload: "" });
    dispatch({ type: "setDescriptionError", payload: "" });
  };

  //

  return {
    handleDocumentName,
    handleDocumentDescription,
    handleSubmit,
    resetFields,
  };
};

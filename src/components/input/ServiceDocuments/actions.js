import { handleError } from "utils/globalFunctions";

export const useActions = ({
  state,
  dispatch,
  handleDocumentSubmit,
  handleUpdateDocument,
  review,
}) => {
  const { documentName, documentDescription } = state;

  // Runs on document name change
  const handleDocumentName = (e) => {
    let value = e.target.value;
    dispatch({ type: "setDocumentName", payload: value });
    validateName(value);
  };

  // Runs on document description change
  const handleDocumentDescription = (e) => {
    let value = e.target.value;
    dispatch({ type: "setDocumentDescription", payload: value });
    validateDescription(value);
  };

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

  // Submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // let nameValid = validateName(documentName);
    // let descriptionValid = validateDescription(documentDescription);
    // if (!nameValid || !descriptionValid) return;
    // let response = review ? await handleUpdateDocument(state) : await handleDocumentSubmit(state);
    // if (response?.data) {
    //   resetFields();
    // } else {
    //   handleError(response?.error);
    // }
  };

  const resetFields = () => {
    dispatch({ type: "setDocumentName", payload: "" });
    dispatch({ type: "setDocumentDescription", payload: "" });
    dispatch({ type: "setNameError", payload: "" });
    dispatch({ type: "setDescriptionError", payload: "" });
  };

  // Hides form
  const handleDone = () => {
    dispatch({ type: "setDone", payload: true });
  };

  return {
    handleDocumentName,
    handleDocumentDescription,
    handleSubmit,
    handleDone,
    resetFields,
  };
};

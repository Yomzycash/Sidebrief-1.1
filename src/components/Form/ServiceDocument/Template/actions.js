import { handleError } from "utils/globalFunctions";

export const useActions = ({
  state,
  info,
  dispatch,
  setDisabled,
  handleTemplateSubmit,
  handleUpdateTemplate,
  review,
}) => {
  const { templateName, templateLink, done } = state;

  // Runs on template name change
  const handleTemplateName = (e) => {
    let value = e.target.value;
    dispatch({ type: "setTemplateName", payload: value });
    validateName(value);
  };

  //

  // Runs on template link change
  const handleTemplateLink = (e) => {
    let value = e.target.value;
    dispatch({ type: "setTemplateLink", payload: value });
    validateLink(value);
  };

  //

  // Validates template name input
  const validateName = (value) => {
    if (value.length === 0) {
      dispatch({ type: "setNameError", payload: "Enter template name" });
      return false;
    } else {
      dispatch({ type: "setNameError", payload: "" });
      return true;
    }
  };

  //

  // Validates template link input
  const validateLink = (value) => {
    if (value.length === 0) {
      dispatch({ type: "setLinkError", payload: "Enter template link" });
      return false;
    } else {
      dispatch({ type: "setLinkError", payload: "" });
      return true;
    }
  };

  //

  // Submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    let nameValid = validateName(templateName);
    let linkValid = validateLink(templateLink);
    if (!nameValid || !linkValid) return;

    let response = info?.templateLink
      ? await handleUpdateTemplate({ ...state, templateCode: info?.templateCode })
      : await handleTemplateSubmit(state);
    if (response?.data) {
      setDisabled(true);
    } else {
      handleError(response?.error);
    }
  };

  return {
    handleTemplateName,
    handleTemplateLink,
    handleSubmit,
  };
};
